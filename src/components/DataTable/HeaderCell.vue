<template>
  <th
    class="table-header-cell"
    v-show="!column.hidden"
    :key="column.id"
    :class="getAlignClass(column.align)"
    style="position: relative; min-width: max-content"
    :style="thStyle"
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
        <q-btn
          push
          icon="filter_list"
          @click="$emit('requestFocusOnFilter', column.id)"
          v-if="filterable(column)"
        >
          <q-tooltip>{{ $t('data_table.filter') }}</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-menu>
    <slot></slot>
    <ColumnResizer :column="column"></ColumnResizer>
  </th>
</template>

<script setup lang="ts" generic="Row extends BaseRow">
import { PropType, computed, provide, ref } from 'vue';

import { callOrGet } from 'src/composables/utilities';

import ColumnResizer from './ColumnResizer.vue';
import { BaseColumn, BaseRow } from './DataTable.vue';
import { getAlignClass } from './datatableutilities';

const props = defineProps({
  column: {
    type: Object as PropType<BaseColumn<Row>>,
    required: true,
  },
});

defineEmits<{
  (e: 'requestFocusOnFilter', value: string): void;
}>();

const columnWidth = ref<number | undefined>(props.column.width);

const thStyle = computed(() => {
  if (columnWidth.value || props.column.width) {
    const width = columnWidth.value;
    return {
      width: width !== undefined ? `${width}px` : `${props.column.width}px`,
      minWidth: width !== undefined ? `${width}px` : `${props.column.width}px`,
    };
  } else {
    return {};
  }
});

// TODO: Implement filterable and sortable based on openapi schema
const filterable = (column: BaseColumn<Row>) => {
  return true;
};
const sortable = (column: BaseColumn<Row>) => {
  return true;
};

provide('columnWidth', columnWidth);
</script>
