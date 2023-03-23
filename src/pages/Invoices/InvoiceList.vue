<template>
  <FullHeightPage hide-back-button padding>
    <DataTable :data="data" :columns="typedColumns"> </DataTable>
  </FullHeightPage>
</template>

<script setup lang="ts">
import DataTable from 'components/DataTable/DataTable.vue';
import FullHeightPage from 'components/Page/FullHeightPage.vue';

import type { BaseRow, BaseColumn } from 'components/DataTable/DataTable.vue';

type Row = BaseRow & {
  test: string;
  test2: string;
  info3: number;
};

type Column = BaseColumn<Row> & {
  somethingelse?: (row: Row) => string;
};

const typedColumns = (): Column[] => [
  {
    id: 'test',
    label: 'test 1',
    field: (row) => row.test,
    align: 'left',
    somethingelse: (row: Row) => row.test + ' ' + row.test2,
  },
  {
    id: 'test2',
    label: 'Test 2',
    field: (row) => row.test2,
    align: 'center',
  },
  {
    id: 'info3',
    field: (row) => `${row.info3}`,
    label: 'Info 3',
    align: 'right',
  },
];

const data: Row[] = [
  {
    id: 0,
    test: 'hello',
    test2: 'there',
    info3: 5,
  },
  {
    id: 1,
    test: 'how you',
    test2: 'doin',
    info3: 10,
  },
  {
    id: 2,
    test: 'good',
    test2: 'I hope',
    info3: 10,
  },
  {
    id: 3,
    test: 'I am',
    test2: 'fine',
    info3: 10,
  },
  {
    id: 4,
    test: 'hello',
    test2: 'there',
    info3: 5,
  },
  {
    id: 5,
    test: 'how you',
    test2: 'doin',
    info3: 10,
  },
  {
    id: 6,
    test: 'good',
    test2: 'I hope',
    info3: 10,
  },
  {
    id: 7,
    test: 'I am',
    test2: 'fine',
    info3: 10,
  },
  {
    id: 8,
    test: 'hello',
    test2: 'there',
    info3: 5,
  },
  {
    id: 9,
    test: 'how you',
    test2: 'doin',
    info3: 10,
  },
  {
    id: 10,
    test: 'good',
    test2: 'I hope',
    info3: 10,
  },
  {
    id: 11,
    test: 'I am',
    test2: 'fine',
    info3: 10,
  },
  {
    id: 11,
    test: 'hello',
    test2: 'there',
    info3: 5,
  },
  {
    id: 12,
    test: 'how you',
    test2: 'doin',
    info3: 10,
  },
  {
    id: 13,
    test: 'good',
    test2: 'I hope',
    info3: 10,
  },
  {
    id: 14,
    test: 'I am',
    test2: 'fine',
    info3: 10,
  },
  {
    id: 15,
    test: 'hello',
    test2: 'there',
    info3: 5,
  },
  {
    id: 16,
    test: 'how you',
    test2: 'doin',
    info3: 10,
  },
  {
    id: 17,
    test: 'good',
    test2: 'I hope',
    info3: 10,
  },
  {
    id: 18,
    test: 'I am',
    test2: 'fine',
    info3: 10,
  },
];
</script>

<style scoped></style>
