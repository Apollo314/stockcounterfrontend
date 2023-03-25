<template>
  <FullHeightPage hide-back-button :padding="!$q.platform.is.mobile">
    <DataTable
      v-model:pagination="pagination"
      :data="data || []"
      :columns="columns"
      @request="log($event)"
    >
    </DataTable>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue';
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

const { t: $t } = useI18n();

const co: ColumnsOverride<Column, Row> = {
  id: { label: () => $t('itemlabels.id') },
  name: { label: () => $t('itemlabels.name') },
  category: { label: () => $t('itemlabels.category') },
  buyprice: { label: () => $t('itemlabels.buyprice') },
  sellprice: { label: () => $t('itemlabels.sellprice') },
  stock_unit: { label: () => $t('itemlabels.stock_unit') },
  stocks: { label: () => $t('itemlabels.stocks') },
  updated_at: { label: () => $t('itemlabels.updated_at') },
  updated_by: { label: () => $t('itemlabels.updated_by') },
  stock_code: { label: () => $t('itemlabels.stock_code') },
  thumbnail: { label: () => $t('itemlabels.thumbnail') },
  created_at: { label: () => $t('itemlabels.created_at') },
  created_by: { label: () => $t('itemlabels.created_by') },
  kdv: { label: () => $t('itemlabels.kdv') },
  barcode: { label: () => $t('itemlabels.barcode') },
  buycurrency: { label: () => $t('itemlabels.buycurrency') },
  description: { label: () => $t('itemlabels.description') },
  sellcurrency: { label: () => $t('itemlabels.sellcurrency') },
};

const columns = ColumnsGenerator(co);

type Filters = Record<string, string>;

const data = ref<ItemOut[]>();

const log = console.log;

const pagination = ref<Pagination<Filters>>({
  count: 100,
  filters: {},
  limit: 10,
  offset: 0,
});

onActivated(() => {
  api.inventory
    .inventoryItemList({})
    .then((value) => (data.value = value.results));
});
</script>

<style scoped></style>
