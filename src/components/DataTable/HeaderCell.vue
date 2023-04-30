<template>
  <th
    :key="column.id"
    class="table-header-cell"
    :class="{
      ...getAlignClass(column.align),
      'cursor-pointer': column.orderable || column.filterable,
    }"
    style="position: relative; min-width: max-content"
    :style="thStyle"
  >
    <span>
      <b class="column-label col">
        {{ callOrGet(column.label, [column]) }}
        <span
          v-if="orderIndex > -1"
          class="bg-primary q-pa-xs"
          style="border-radius: 5px"
          >({{ orderIndex }})</span
        >
      </b>
    </span>
    <q-menu
      v-if="column.filterable || column.orderable"
      touch-position
      self="top middle"
    >
      <q-card bordered class="my-card">
        <div class="row justify-center text-bold q-pa-sm">
          {{ callOrGet(column.label, [column]) }}
        </div>
        <q-btn-group spread flat>
          <q-btn
            v-if="column.orderable"
            v-close-popup
            flat
            icon="arrow_upward"
            :class="{
              'active-button':
                orderedColumns?.get(column.id)?.order === 'ascending',
            }"
            @click="
              $emit('requestOrdering', { order: 'ascending', column: column })
            "
          >
            <q-tooltip>{{
              $t('data_table.ordering.buttons.increasing')
            }}</q-tooltip>
          </q-btn>
          <q-btn
            v-if="column.orderable"
            v-close-popup
            flat
            icon="arrow_downward"
            :class="{
              'active-button':
                orderedColumns?.get(column.id)?.order === 'descending',
            }"
            @click="
              $emit('requestOrdering', {
                order: 'descending',
                column: column,
              })
            "
          >
            <q-tooltip>{{
              $t('data_table.ordering.buttons.decreasing')
            }}</q-tooltip>
          </q-btn>
          <q-btn
            v-if="column.filterable"
            v-close-popup
            flat
            icon="filter_list"
            @click="$emit('requestFocusOnFilter', column.id)"
          >
            <q-tooltip>{{ $t('data_table.filter') }}</q-tooltip>
          </q-btn>
        </q-btn-group>
      </q-card>
    </q-menu>
    <slot></slot>
    <ColumnResizer :column="column"></ColumnResizer>
  </th>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>"
>
import { PropType, Ref, computed, inject, provide, ref } from 'vue';

import { callOrGet } from 'src/composables/utilities';

import ColumnResizer from './ColumnResizer.vue';
// this, I believe will be sorted out in next versions of vue and the lint disable below won't be necessary.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  (
    e: 'requestOrdering',
    value: { column: Column; order: 'ascending' | 'descending' }
  ): void;
}>();

const columnWidth = ref<number | undefined>(props.column.width);
const orderedColumns =
  inject<
    Ref<Map<string, { column: Column; order: 'ascending' | 'descending' }>>
  >('orderedColumns');

const orderIndex = computed(() => {
  let index = 1;
  if (orderedColumns?.value) {
    for (const [, value] of orderedColumns?.value) {
      if (value.column.id === props.column.id) {
        return index;
      }
      index++;
    }
  }
  return -1;
});

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

provide('columnWidth', columnWidth);
</script>

<style lang="scss" scoped>
.active-button {
  background: $primary;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
