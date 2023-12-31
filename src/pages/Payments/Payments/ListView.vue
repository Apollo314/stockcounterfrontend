<template>
  <FullHeightPage hide-back-button padding :fit="!card || $q.screen.gt.sm">
    <DataTable
      v-model:pagination="pagination"
      v-model:card="card"
      :data="data || []"
      :columns="columns"
      :contextmenuactions="contextmenuactions"
      :filter-components="formComponents"
      @request="fetcher"
    >
    </DataTable>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { MaybeRef } from '@vueuse/shared';
import { useQuasar } from 'quasar';
import { onActivated, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { api } from 'boot/axios';
import DataTable from 'components/DataTable/DataTable.vue';
import { ColumnsGenerator } from 'components/DataTable/datatableutilities';
import RepeatTextConfirmation from 'components/Dialogs/RepeatTextConfirmation.vue';
import FullHeightPage from 'components/Page/FullHeightPage.vue';
import { notifyErrors } from 'src/composables/errorhandlers';
import { create_filters, get_operation } from 'src/composables/openapihelpers';
import { queryMaker } from 'src/composables/utilities';

import type {
  BaseColumn,
  BaseRow,
  ColumnsOverride,
  ContextMenuGroup,
  Pagination,
} from 'components/DataTable/DataTable.vue';
import type { PaymentOut } from 'src/client';

type Row = BaseRow & PaymentOut;

type Column = BaseColumn<Row>;

const operation = get_operation('/payments/payments/', 'get');
const formComponents = create_filters(operation);

type Filters = Record<keyof typeof formComponents, string>;

const { t: $t, d: $d, n: $n } = useI18n();
const card = ref(false);

const co: ColumnsOverride<Column, Row> = {
  id: { hidden: true },
  amount: {
    field: (row) =>
      `${$n(parseFloat(row.amount), {
        style: 'currency',
        currency: row.currency,
      })}`,
  },
  payer: {
    field(row) {
      return row.payer.name;
    },
  },
  receiver: {
    field(row) {
      return row.receiver.name;
    },
  },
  payment_type: {},
  due_date: {},
  additional_info: {
    field(row) {
      return row.additional_info;
    },
  },
  created_at: {
    field: (row) => $d(row.created_at || ''),
  },
  updated_at: {
    hidden: true,
    field: (row) => $d(row.updated_at || ''),
  },
};

const columns = ColumnsGenerator<Column, Row>(co, operation);
const $q = useQuasar();

const contextmenuactions: ContextMenuGroup<Row>[] = [
  [
    {
      callback: (rows, done) => {
        const names = Array.from(
          rows,
          ([, row]) =>
            `${row.payer.name} > ${row.receiver.name} (${$n(
              parseFloat(row.amount),
              {
                style: 'currency',
                currency: row.currency,
              }
            )})`
        ).join(', ');
        $q.dialog({
          component: RepeatTextConfirmation,
          componentProps: {
            explanation: $t('confirmations.will-be-deleted', {
              objects: `[${names}]`,
            }),
            icon: 'delete',
            color: 'negative',
          },
        }).onOk(() => {
          api.payments
            .paymentsBulkPaymentsDestroy({
              pk: Array.from(rows, ([, value]) => value.id.toString()),
            })
            .then(() => {
              done(true);
              fetcher({ pagination: pagination.value });
            })
            .catch((reason) => {
              notifyErrors(reason);
            });
        });
      },
      label: $t('commons.delete'),
      can_handle_single: true,
      can_handle_multiple: true,
      color: 'negative',
      icon: 'delete',
    },
  ],
];

const data = ref<PaymentOut[]>();

const pagination = ref<Pagination<Filters>>({
  count: 100,
  filters: {},
  limit: 20,
  offset: 0,
});

function fetcher({
  pagination: requestPagination,
  done,
}: {
  pagination: MaybeRef<Pagination<Filters>>;
  done?: () => void;
}) {
  api.payments
    .paymentsPaymentsList(queryMaker(requestPagination))
    .then((value) => {
      data.value = value.results;
      pagination.value.count = value.count || 0;
    })
    .finally(() => {
      if (done !== undefined) {
        done();
      }
    });
}

onActivated(() => {
  fetcher({ pagination });
});
</script>

<style scoped></style>
