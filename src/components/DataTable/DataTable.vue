<template>
  <q-markup-table separator="cell" flat class="coolshadow" bordered>
    <thead class="bg-teal-8 text-white">
      <tr>
        <th style="width: 0px" @click.stop="toggleSelectionAll()">
          <q-checkbox
            dense
            :model-value="selectAllButtonStatus"
            @click="toggleSelectionAll()"
          />
        </th>
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
      <tr
        v-for="row in data"
        :class="{ 'selected-row': selected.indexOf(row) > -1 }"
        :key="row.id"
      >
        <td
          style="width: 0px"
          @click.stop="toggleSelection(row, !(selected.indexOf(row) > -1))"
        >
          <q-checkbox
            dense
            :model-value="selected.indexOf(row) > -1"
            @update:model-value="toggleSelection(row, $event)"
          />
        </td>
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
  <pre>{{ selected }}</pre>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>, Filters extends Object"
>
import { QMarkupTable } from 'quasar';
import { computed, ref, Ref } from 'vue';

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

const selected: Ref<Row[]> = ref([]);

function toggleSelection(row: Row, value: boolean) {
  if (value) {
    if (!selected.value?.includes(row)) {
      selected.value?.push(row);
    }
  } else {
    const index = selected.value.indexOf(row);
    if (index > -1) {
      selected.value?.splice(index, 1);
    }
  }
}

function toggleSelectionAll() {
  // if completely unselected, select all
  if (selected.value.length === 0) {
    selected.value = props.data;
  }
  // if any selected, deselect
  else if (selected.value.length > 0) {
    selected.value = [];
  }
}

const selectAllButtonStatus = computed(() => {
  if (selected.value.length === 0) {
    return false;
  } else if (selected.value.length < props.data.length) {
    return undefined;
  } else {
    return true;
  }
});

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

<style scoped lang="scss">
tr.selected-row {
  background: rgba($primary, 0.2);
}
</style>
