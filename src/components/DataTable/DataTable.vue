<template>
  <adaptive-card
    :class="{
      'sticky-header': stickyHeader,
      'sticky-caption': stickyCaption,
    }"
    class="full-height"
    flushmobile
    bordered
    no-width-scrollbar
    :compact-scrollbar="false"
  >
    <div class="table-parent">
      <table flat class="coolshadow data-table">
        <caption class="table-caption" :class="captionClasses">
          <slot name="caption" v-bind="{ selected, pagination }"></slot>
        </caption>
        <thead class="table-head" :class="theadClasses">
          <tr>
            <th class="table-header-cell" @click.stop="toggleSelectionAll()">
              <q-checkbox
                dense
                color="primary"
                class="checkbox"
                :model-value="selectAllButtonStatus"
                @click="toggleSelectionAll()"
              />
            </th>
            <th
              class="table-header-cell"
              v-for="column in computedcolumns"
              v-show="!column.hidden"
              :key="column.id"
              :class="getAlignClass(column.align)"
              style="position: relative"
              :style="getTHStyle(column)"
            >
              <b class="column-label">
                {{ callOrGet(column.label) }}
              </b>
              <slot
                :name="`th-inner-sibling-${column.id}`"
                v-bind="{ column }"
              />
              <ColumnResizer :column="column"></ColumnResizer>
            </th>
            <slot name="head-tr-inner" />
          </tr>
        </thead>
        <tbody
          class="table-body"
          :class="tbodyClasses"
          style="position: relative"
        >
          <tr
            v-for="row in data"
            :class="{ 'selected-row': selected.indexOf(row) > -1 }"
            :key="row.id"
          >
            <td
              @click.stop="toggleSelection(row, !(selected.indexOf(row) > -1))"
            >
              <q-checkbox
                dense
                class="checkbox"
                :model-value="selected.indexOf(row) > -1"
                @update:model-value="toggleSelection(row, $event)"
              />
            </td>
            <td
              :class="getAlignClass(column.align)"
              v-for="column in computedcolumns"
              v-show="!column.hidden"
              :key="column.id"
            >
              <div class="cell">
                {{ getColValue(column, row) }}
              </div>
              <slot
                :name="`td-inner-sibling-${column.id}`"
                v-bind="{ row: row, column: column }"
              />
            </td>
            <slot name="body-tr-inner" v-bind="{ row }" />
          </tr>
        </tbody>
      </table>
    </div>
    <template #action-bottom>
      <div class="row full-width q-pa-sm" style="position: sticky; bottom: 0">
        <q-space />
        <OffsetLimitPaginator
          :model-value="pagination.offset"
          :count="pagination.count"
          :limit="pagination.limit"
          @update:model-value="request({ offset: $event })"
          :max-length="7"
          direction-links
        ></OffsetLimitPaginator>
      </div>
    </template>
  </adaptive-card>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>, Filters extends Object"
>
import { computed, ref, Ref, nextTick, provide } from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import OffsetLimitPaginator from 'components/Paginator/OffsetLimitPaginator.vue';
import { callOrGet } from 'src/composables/utilities';

import ColumnResizer from './ColumnResizer.vue';

export type BaseRow = {
  id: number | string;
};

export type BaseColumn<Row> = {
  id: keyof Row & (string | number);
  field: keyof Row | ((row: Row) => string | number | undefined | null);
  label: string | (() => string);
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  /**
   * width of the column in pixel
   */
  width?: number;
  /**
   * whether or not column is hidden.
   * they can still be unhidden by the end user.
   */
  hidden?: boolean;
};

export type Pagination<Filters> = {
  offset: number;
  limit: number;
  count: number;
  filters: Filters;
};

export type ColumnsOverride<
  Column extends BaseColumn<Row>,
  Row extends BaseRow
> = {
  [key in keyof Partial<Row>]: Partial<Column>;
};

export type ColumnsWidthGenerator<
  Column extends BaseColumn<Row>,
  Row extends BaseRow
> = {
  [key in keyof ColumnsOverride<Column, Row>]?: number;
};

const props = withDefaults(
  defineProps<{
    columns: Column[] | (() => Column[]);
    data: Row[];
    pagination: Pagination<Filters>;
    stickyCaption?: boolean;
    stickyHeader?: boolean;
    captionClasses?: string;
    theadClasses?: string;
    tbodyClasses?: string;
  }>(),
  {
    stickyHeader: true,
  }
);

type ColumnWidths = {
  [key in keyof Row]?: number;
};
const columnWidths = ref<ColumnWidths>({});

const getTHStyle = (column: Column) => {
  if (columnWidths.value[column.id] || column.width) {
    const width = columnWidths.value[column.id];
    return {
      width: width !== undefined ? `${width}px` : `${column.width}px`,
      minWidth: width !== undefined ? `${width}px` : `${column.width}px`,
    };
  }
};

const emit = defineEmits<{
  (e: 'request', pagination: Pagination<Filters>): void;
  (e: 'update:pagination', pagination: Pagination<Filters>): void;
}>();

const selected: Ref<Row[]> = ref([]);

function getColValue(col: Column, row: Row) {
  return col.field instanceof Function ? col.field(row) : row[col.field];
}

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
    selected.value = [...props.data];
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
    'text-left': align === 'left' || align === undefined,
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

function request(partialPagination: Partial<Pagination<Filters>>) {
  const newPagination = { ...props.pagination, ...partialPagination };
  emit('update:pagination', newPagination);
  nextTick(() => {
    emit('request', props.pagination);
  });
}

provide('columnWidths', columnWidths);
</script>

<style lang="scss">
$cellpadding-vertical: 8px;
$cellpadding-horizontal: 15px;
$cellpadding: $cellpadding-vertical $cellpadding-horizontal;
$captionheight: 50px;
$rowheight: calc(2em + #{$cellpadding-vertical * 2});
$lineheight: 1em;

$secondcolor-dark: #162429;

$secondcolor-light: #e1eff4;

$separator-color: rgba(0, 0, 0, 0.14) !default;
$separator-dark-color: rgba(255, 255, 255, 0.14) !default;

// table
$table-light-background: $almost-white; // custom
$table-border-color: $separator-color !default;
$table-hover-background: hsla(197, 60%, 50%, 0.3);
$table-light-selected-background: lighten($warning, 20%);

$table-dark-border-color: $separator-dark-color !default;
$table-dark-hover-background: hsla(197, 60%, 50%, 0.3);
$table-dark-selected-background: darken($warning, 40%);

.table-parent {
  border-radius: $generic-border-radius;
  contain: paint;
  .body--dark & {
    border-bottom: 3px solid $separator-dark-color;
  }
  .body--light & {
    border-bottom: 3px solid $separator-color;
  }
  min-width: 100%;
  // width: fit-content !important;
}

.data-table {
  min-width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  position: relative;
  .checkbox {
    padding: 4px;
  }
  .column-label {
    position: sticky;
    .desktop & {
      left: 60px;
    }
    left: 10px;
    right: 10px;
    min-width: max-content;
    white-space: nowrap;
    padding-left: 10px;
    padding-right: 10px;
  }
  thead.table-head {
    .sticky-header & {
      position: sticky;
      top: 0;
      z-index: 10;
    }
    th.table-header-cell {
      .body--dark & {
        background-color: #073a44;
      }
      .body--light & {
        background-color: lighten($secondary, 20%);
      }
      .sticky-caption & {
        top: $captionheight;
      }
    }
  }
  th,
  td {
    div.cell {
      white-space: normal;
      display: -webkit-box;
      overflow: hidden;
      max-height: 2 * $lineheight;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      line-height: $lineheight;
    }
    width: max-content;
    padding: $cellpadding;
    .body--dark & {
      border-right: 1px solid $separator-dark-color;
      border-top: 1px solid $separator-dark-color;
    }
    .body--light & {
      border-right: 1px solid $separator-color;
      border-top: 1px solid $separator-color;
    }
    &:first-of-type {
      .desktop .adaptive-card:not(.arrived-left) & {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
        }
      }
      .desktop & {
        &.table-header-cell {
          z-index: 10;
        }
        position: sticky;
        left: 0;
      }
      .body--dark & {
        background-color: $dark;
        &::before {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
      .body--light & {
        &::before {
          background-color: rgba($secondary, 0.5);
        }
        background-color: $almost-white;
      }
      width: 1px;
      border-left: none;
    }
    &:last-of-type {
      border-right: none;
    }
  }

  .body--dark & {
    tr:nth-of-type(2n) {
      background-color: $secondcolor-dark;
      td:first-of-type {
        background-color: $secondcolor-dark;
      }
    }
    tr.selected-row {
      td,
      td:first-of-type {
        background-color: $table-dark-selected-background;
      }
    }
  }

  .body--light & {
    tr:nth-of-type(2n) {
      background-color: $secondcolor-light;
      td:first-of-type {
        background-color: $secondcolor-light;
      }
    }
    tr.selected-row {
      position: relative;
      td,
      td:first-of-type {
        background-color: $table-light-selected-background;
      }
    }
  }

  tr:last-of-type td {
    border-bottom: none;
  }
  th {
    border-top: none !important;
  }
  tr {
    height: $rowheight;
  }

  .table-caption {
    .body--dark & {
      background-color: $dark;
    }
    .body--light & {
      background-color: $almost-white;
    }
    height: $captionheight;
    .sticky-caption & {
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }

  .table-body {
    height: 100%;
    overflow: auto;
  }
}
</style>
