<template>
  <FullHeightPage padding>
    <DataTable :data="data" :columns="typedColumns">
      <template v-slot:td-inner-sibling-test="{ row, column }">
        <q-tooltip> {{ column.somethingelse?.(row) }} </q-tooltip>
      </template>
      <template v-slot:body-tr-inner="{ row }">
        <q-tooltip>
          {{ row.test }}
        </q-tooltip>
      </template>
    </DataTable>
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
];
</script>

<style scoped></style>
