<template>
  <FullHeightPage hide-back-button padding>
    <DataTable
      v-model:pagination="pagination"
      :data="data || []"
      :columns="columns"
      @request="fetcher($event)"
    >
    </DataTable>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { MaybeRef } from '@vueuse/shared';
import { ref, onActivated, unref } from 'vue';
import { useI18n } from 'vue-i18n';

import { api } from 'boot/axios';
import DataTable from 'components/DataTable/DataTable.vue';
import { ColumnsGenerator } from 'components/DataTable/datatableutilities';
import FullHeightPage from 'components/Page/FullHeightPage.vue';

import type {
  BaseRow,
  BaseColumn,
  Pagination,
  ColumnsOverride,
} from 'components/DataTable/DataTable.vue';
import type { ItemOut } from 'src/client';

type Row = BaseRow & ItemOut;

type Column = BaseColumn<Row>;
function deleteIndex(index: number) {
  data.value?.splice(index, 1);
}

const { t: $t, n: $n, d: $d } = useI18n();

const co: ColumnsOverride<Column, Row> = {
  id: { label: () => $t('itemlabels.id') },
  name: { width: 400, label: () => $t('itemlabels.name') },
  buyprice: { label: () => $t('itemlabels.buyprice') },
  sellprice: { label: () => $t('itemlabels.sellprice') },
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
  stock_code: {},
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
  // barcode: { label: () => $t('itemlabels.barcode') },
  // buycurrency: { label: () => $t('itemlabels.buycurrency') },
  // description: { label: () => $t('itemlabels.description') },
  // sellcurrency: { label: () => $t('itemlabels.sellcurrency') },
};

const columns = ColumnsGenerator(co);

type Filters = Record<string, string>;

const data = ref<ItemOut[]>();

const pagination = ref<Pagination<Filters>>({
  count: 100,
  filters: {},
  limit: 25,
  offset: 0,
});

const fetcher = (requestPagination: MaybeRef<Pagination<Filters>>) => {
  const pg = unref(requestPagination);
  api.inventory
    .inventoryItemList({
      limit: pg.limit,
      offset: pg.offset,
    })
    .then((value) => {
      data.value = value.results;
      pagination.value.count = value.count || 0;
    });
};

onActivated(() => {
  fetcher(pagination);
});
</script>

<style scoped></style>
