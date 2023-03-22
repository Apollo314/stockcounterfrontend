<template>
  <q-markup-table separator="cell" flat class="coolshadow" bordered>
    <thead class="bg-teal-8 text-white">
      <tr>
        <th
          v-for="column in computedcolumns"
          :key="column.id"
          :class="getAlignClass(column.align)"
        >
          <b>
            {{ column.label }}
          </b>
          <slot :name="`th-inner-sibling-${column.id}`" v-bind="{ column }" />
        </th>
        <slot name="head-tr-inner" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td
          :class="getAlignClass(column.align)"
          v-for="column in computedcolumns"
          :key="column.id"
        >
          {{ column.field(row) }}
          <slot
            :name="`td-inner-sibling-${column.id}`"
            v-bind="{ row: row, column: column }"
          />
        </td>
        <slot name="body-tr-inner" v-bind="{ row }" />
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>, Filters extends Object"
>
import { QMarkupTable } from 'quasar';
import { computed } from 'vue';

export type BaseRow = {
  id: number | string;
};

export type BaseColumn<Row> = {
  id: string | number;
  label: string | (() => string);
  field: (row: Row) => string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
};

export type Pagination<Filters> = {
  offset: number;
  limit: number;
  count: number;
  filters: Filters;
};

const props = defineProps<{
  columns: Column[] | (() => Column[]);
  data: Row[];
  pagination?: Pagination<Filters>;
}>();

function getAlignClass(align?: 'left' | 'center' | 'right') {
  return {
    'text-left': align === 'left',
    'text-right': align === 'right',
    'text-center': align === 'center',
  };
}

const computedcolumns = computed(() => {
  if (typeof props.columns === 'function') {
    return props.columns();
  } else {
    return props.columns;
  }
});
</script>

<style scoped></style>
