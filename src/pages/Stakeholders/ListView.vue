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
import { useRoute, useRouter } from 'vue-router';

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
import type { RoleEnum, Stakeholder } from 'src/client';

type Row = BaseRow & Stakeholder;

type Column = BaseColumn<Row>;

const operation = get_operation('/stakeholder/stakeholders/', 'get');
const formComponents = create_filters(operation);

type Filters = Record<keyof typeof formComponents, string>;

const { t: $t } = useI18n();
const card = ref(false);

const co: ColumnsOverride<Column, Row> = {
  id: { hidden: true },
  name: { width: 400 },
  address: {},
  phone: {},
  email: {},
  employees: {},
  vkntckn: {},
};

const columns = ColumnsGenerator<Column, Row>(co, operation);
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const contextmenuactions: ContextMenuGroup<Row>[] = [
  [
    {
      callback: (rows, done) => {
        router.push({
          name:
            route.meta.role === 'customer'
              ? 'customer-update'
              : 'supplier-update',
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
          api.stakeholder
            .stakeholderBulkStakeholderDestroy({
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

const data = ref<Stakeholder[]>();

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
  const query = queryMaker(requestPagination);
  const customer_roles: RoleEnum[] = ['Müşteri', 'Müşteri ve Satıcı'];
  const supplier_roles: RoleEnum[] = ['Satıcı', 'Müşteri ve Satıcı'];
  query['roleIn'] =
    route.meta.role === 'customer' ? customer_roles : supplier_roles;
  api.stakeholder
    .stakeholderStakeholdersList(query)
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
