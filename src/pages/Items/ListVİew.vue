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
import type { ItemOut } from 'src/client';

type Row = BaseRow & ItemOut;

type Column = BaseColumn<Row>;

const operation = get_operation('/inventory/item/', 'get');
const formComponents = create_filters(operation);
type Filters = Record<keyof typeof formComponents, string>;

const { t: $t, n: $n, d: $d } = useI18n();
const card = ref(false);

const co: ColumnsOverride<Column, Row> = {
  id: { label: () => $t('itemlabels.id'), hidden: true },
  name: { width: 400, label: () => $t('itemlabels.name') },
  buyprice: {
    label: () => $t('itemlabels.buyprice'),
    field: (row) =>
      `${$n(parseFloat(row.buyprice), {
        style: 'currency',
        currency: row.buycurrency,
      })}`,
  },
  sellprice: {
    label: () => $t('itemlabels.sellprice'),
    field: (row) =>
      `${$n(parseFloat(row.sellprice), {
        style: 'currency',
        currency: row.sellcurrency,
      })}`,
  },
  stocks: {
    field: (row) =>
      `${row.stocks.reduce(
        (sum, stock) => sum + parseFloat(stock.amount),
        0
      )} ${row.stock_unit.name}`,
    label: () => $t('itemlabels.stocks'),
  },
  updated_at: {
    field: (row) => $d(row.updated_at || ''),
    label: () => $t('itemlabels.updated_at'),
    align: 'right',
  },
  updated_by: {
    field: (row) => row.updated_by.username,
    label: () => $t('itemlabels.updated_by'),
  },
  stock_code: { label: () => $t('itemlabels.stock_code') },
  created_at: {
    field: (row) => $d(row.created_at || ''),
    label: () => $t('itemlabels.created_at'),
  },
  created_by: {
    field: (row) => row.created_by.username,
    label: () => $t('itemlabels.created_by'),
  },
  kdv: {
    label: () => $t('itemlabels.kdv'),
    // field: (row) => JSON.stringify(row.created_by),
    field: (row) => $n(row.kdv / 100, { style: 'percent' }),
    align: 'right',
  },
  category: {
    label: () => $t('itemlabels.category'),
    field: (row) => row.category?.name,
  },
  barcode: { label: () => $t('itemlabels.barcode'), hidden: true },
  description: { label: () => $t('itemlabels.description'), hidden: true },
};

const columns = ColumnsGenerator<Column, Row>(co, operation);
const router = useRouter();
const $q = useQuasar();

const contextmenuactions: ContextMenuGroup<Row>[] = [
  [
    {
      callback: (rows, done) => {
        router.push({
          name: 'items-update',
          params: { id: Array.from(rows)[0][1].id },
        });
        done(true);
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
          api.inventory
            .inventoryBulkItemDestroy({
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

const data = ref<ItemOut[]>();

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
  api.inventory
    .inventoryItemList(queryMaker(requestPagination))
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
