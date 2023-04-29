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
import { useRouter } from 'vue-router';

import { api } from 'boot/axios';
import DataTable from 'components/DataTable/DataTable.vue';
import { ColumnsGenerator } from 'components/DataTable/datatableutilities';
import RepeatTextConfirmation from 'components/Dialogs/RepeatTextConfirmation.vue';
import FullHeightPage from 'components/Page/FullHeightPage.vue';
import { create_filters, get_operation } from 'src/composables/openapihelpers';
import { queryMaker } from 'src/composables/utilities';

import type {
  BaseColumn,
  BaseRow,
  ColumnsOverride,
  ContextMenuGroup,
  Pagination,
} from 'components/DataTable/DataTable.vue';
import type { InvoiceList } from 'src/client';

type Row = BaseRow & InvoiceList;

type Column = BaseColumn<Row>;

const props = defineProps<{
  invoiceType?: 'sale' | 'purchase' | 'refund-purchase' | 'refund-sale';
}>();

const operation = get_operation('/invoice/invoice/', 'get');
const formComponents = create_filters(operation, ['invoice_type']);

type Filters = Record<keyof typeof formComponents, string | undefined>;

const { t: $t, n: $n, d: $d } = useI18n();
const card = ref(false);

const co: ColumnsOverride<Column, Row> = {
  id: { hidden: true },
  name: { width: 250 },
  last_payment_date: { field: (row) => $d(row.last_payment_date || '') },
  total: {
    hidden: true,
    field: (row) =>
      `${$n(parseFloat(row.total || '0'), {
        style: 'currency',
        currency: 'TRY',
      })}`,
  },
  total_with_tax: {
    field: (row) =>
      `${$n(parseFloat(row.total_with_tax || '0'), {
        style: 'currency',
        currency: 'TRY',
      })}`,
  },
  currency_exchange_rate: {
    field: (row) =>
      row.currency_exchange_rate
        ? `${$n(1, { style: 'currency', currency: row.currency })} = ${$n(
            parseFloat(row.currency_exchange_rate),
            {
              style: 'currency',
              currency: 'TRY',
            }
          )}`
        : undefined,
  },
  stakeholder: { field: (row) => row.stakeholder.shortname },
  created_by: { field: (row) => row.created_by },
  updated_by: { hidden: true, field: (row) => row.updated_by },
  warehouse: { hidden: true, field: (row) => row.warehouse.name },
  description: { hidden: true },
  created_at: { field: (row) => $d(row.created_at || '') },
  updated_at: {
    hidden: true,
    field: (row) => $d(row.updated_at || ''),
  },
};

const columns = ColumnsGenerator<Column, Row>(co, operation);
const router = useRouter();
const $q = useQuasar();

const contextmenuactions: ContextMenuGroup<Row>[] = [
  [
    {
      callback: (rows, done) => {
        router.push({
          name: 'invoice-detail',
          params: { id: Array.from(rows)[0][1].id },
        });
        done(false);
      },
      label: $t('commons.editoropen'),
      can_handle_single: true,
      color: 'primary',
      icon: 'edit',
    },
    {
      callback: (rows, done) => {
        const names = Array.from(rows, ([, row]) => row.name).join(', ');
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
          api.invoice
            .invoiceBulkInvoiceDestroy({
              pk: Array.from(rows, ([, value]) => value.id.toString()),
            })
            .then(() => {
              done(true);
              fetcher({ pagination: pagination.value });
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

const data = ref<InvoiceList[]>();

const pagination = ref<Pagination<Filters>>({
  count: 100,
  filters: { invoiceType: props.invoiceType },
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
  api.invoice
    .invoiceInvoiceList(queryMaker(requestPagination))
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
