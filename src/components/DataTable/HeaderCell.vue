<template>
  <th
    class="table-header-cell"
    v-show="!column.hidden"
    :key="column.id"
    :class="getAlignClass(column.align)"
    style="position: relative; min-width: max-content"
    :style="getTHStyle(column)"
  >
    <span>
      <b class="column-label col">
        {{ callOrGet(column.label) }}
      </b>
    </span>
    <q-menu
      v-if="filterable(column) || sortable(column)"
      touch-position
      class="bg-blue-8"
      self="top middle"
    >
      <div class="row justify-center text-bold q-pa-xs">
        {{ callOrGet(column.label) }}
      </div>
      <q-btn-group spread push class="bg-red">
        <q-btn push icon="arrow_upward" v-if="sortable(column)">
          <q-tooltip>{{
            $t('data_table.ordering.buttons.increasing')
          }}</q-tooltip>
        </q-btn>
        <q-btn push icon="arrow_downward" v-if="sortable(column)">
          <q-tooltip>{{
            $t('data_table.ordering.buttons.decreasing')
          }}</q-tooltip>
        </q-btn>
        <q-btn push icon="filter_list" v-if="filterable(column)">
          <q-tooltip>{{ $t('data_table.filter') }}</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-menu>
    <slot></slot>
    <ColumnResizer :column="column"></ColumnResizer>
  </th>
</template>

<script setup lang="ts" generic="Row extends BaseRow">
import { PropType, provide, ref } from 'vue';

import { callOrGet } from 'src/composables/utilities';

import ColumnResizer from './ColumnResizer.vue';
import { BaseColumn, BaseRow } from './DataTable.vue';
import { getAlignClass } from './datatableutilities';

defineProps({
  column: {
    type: Object as PropType<BaseColumn<BaseRow>>,
    required: true,
  },
});

type ColumnWidths = {
  [key in keyof Row]?: number;
};

const columnWidths = ref<ColumnWidths>({});

const getTHStyle = (column: BaseColumn<BaseRow>) => {
  if (columnWidths.value[column.id] || column.width) {
    const width = columnWidths.value[column.id];
    return {
      width: width !== undefined ? `${width}px` : `${column.width}px`,
      minWidth: width !== undefined ? `${width}px` : `${column.width}px`,
    };
  }
};

// TODO Implement filterable and sortable based on openapi schema
const filterable = (column: BaseColumn<BaseRow>) => {
  console.log(column);
  return true;
};
const sortable = (column: BaseColumn<BaseRow>) => {
  console.log(column);
  return true;
};

provide('columnWidths', columnWidths);
</script>
