<template>
  <adaptive-card
    ref="adaptiveCardRef"
    :class="{
      'sticky-header': stickyHeader,
      'sticky-caption': stickyCaption,
      'bg-transparent': $q.screen.lt.sm,
    }"
    class="full-height"
    flushmobile
    :bordered="$q.screen.gt.xs"
    no-width-scrollbar
    :compact-scrollbar="false"
  >
    <div class="table-parent">
      <Teleport
        :to="uiStore.replacementHeaderRef"
        :disabled="
          !uiStore.replacementHeaderRef ||
          !uiStore.replaceHeader ||
          $q.screen.gt.xs
        "
      >
        <div class="row q-pa-xs items-center full-width">
          <ActiveColumns></ActiveColumns>
          <q-btn flat round dense icon="assignment_ind" />
          <q-toolbar-title> Toolbar </q-toolbar-title>
          <q-btn flat round dense icon="apps" class="q-mr-xs" />
          <q-btn flat round dense icon="more_vert" />
        </div>
      </Teleport>
      <table v-if="!card" flat class="coolshadow data-table">
        <thead class="table-head" :class="theadClasses">
          <ActiveColumns></ActiveColumns>
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
      <div v-else>
        <div
          v-for="row in data"
          :class="{ selected: selected.indexOf(row) > -1 }"
          :key="row.id"
          class="data-card-container q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3"
          @dblclick="toggleSelection(row, !(selected.indexOf(row) > -1))"
        >
          <div
            class="data-card-parent"
            :style="selected.indexOf(row) > -1 ? 'transform: scale(0.95);' : ''"
            style="width: 100%; height: 100%"
          >
            <q-card class="data-card" style="width: 100%; overflow: hidden">
              <q-card-section horizontal class="q-pa-md">
                <q-checkbox
                  dense
                  class="checkbox"
                  :model-value="selected.indexOf(row) > -1"
                  @update:model-value="toggleSelection(row, $event)"
                />
                <q-space />
                <slot name="card-buttons" v-bind="{ row: row }"></slot>
              </q-card-section>
              <q-list dense separator style="z-index: 1">
                <q-item
                  v-for="column in computedcolumns"
                  v-show="!column.hidden"
                  :key="column.id"
                >
                  <q-item-section style="min-width: unset !important">
                    <q-item-label>{{ callOrGet(column.label) }}</q-item-label>
                  </q-item-section>
                  <q-item-section
                    side
                    style="color: inherit !important; font-weight: 900"
                  >
                    <slot
                      v-if="$slots[`row-slot-${column.id}`]"
                      v-bind="{ row, column }"
                      :name="`row-slot-${column.id}`"
                    ></slot>
                    <div v-else>
                      {{ getColValue(column, row) }}
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
    <template #action-bottom>
      <Teleport
        :to="uiStore.replacementFooterRef"
        :disabled="
          !uiStore.replaceHeader ||
          !uiStore.replacementFooterRef ||
          $q.screen.gt.xs
        "
      >
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
      </Teleport>
    </template>
  </adaptive-card>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>, Filters extends Object"
>
import { useQuasar } from 'quasar';
import {
  onUnmounted,
  onMounted,
  onActivated,
  onDeactivated,
  computed,
  watch,
  ref,
  Ref,
  nextTick,
  provide,
} from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import OffsetLimitPaginator from 'components/Paginator/OffsetLimitPaginator.vue';
import { callOrGet } from 'src/composables/utilities';
import { useUIStore } from 'stores/ui-store';

import ActiveColumns from '../DataTable/ActiveColumns.vue';

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
    /**
     * whether or not to show the data as cards.
     */
    card?: boolean;
  }>(),
  {
    stickyHeader: true,
  }
);

const $q = useQuasar();
const uiStore = useUIStore();
const adaptiveCardRef = ref();

onActivated(() => {
  uiStore.replaceHeader = !$q.screen.gt.xs;
});
onMounted(() => {
  uiStore.replaceHeader = !$q.screen.gt.xs;
});
onUnmounted(() => {
  uiStore.replaceHeader = false;
});
onDeactivated(() => {
  uiStore.replaceHeader = false;
});

watch(
  () => $q.screen.gt.xs,
  () => {
    if (!!uiStore.replacementHeaderRef) {
      uiStore.replaceHeader = !$q.screen.gt.xs;
    }
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
  }).then(() => {
    adaptiveCardRef.value.scrollTo({ x: 0, y: 0 });
  });
}

provide('columnWidths', columnWidths);
provide('columns', props.columns);
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
  border-radius: 0 0 $generic-border-radius $generic-border-radius;
  overflow: clip;
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
      // overflow: clip;
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
}

// card styles
.data-card-container {
  &:hover .background-image {
    filter: blur(0);
  }
}

.data-card-parent {
  transition: all 0.2s ease;
}

.data-card {
  .body--dark & {
    border: 1px solid $separator-dark-color;
  }
  .body--light & {
    border: 1px solid $separator-color;
  }
  border-bottom: 0 !important;

  .q-item {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  box-shadow: $coolshadow,
    0px -10px 0px -5px rgba(darken($primary, 20%), 1) inset !important;
}

.data-card-container.selected .data-card {
  background: $table-light-selected-background;
  &.q-dark {
    background: rgba($table-dark-selected-background, 0.5);
  }
}

.image-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 7) 60%,
    rgba(0, 0, 0, 0) 100%
  );
}

.background-image {
  bottom: 0;
  position: absolute !important;
  left: 50%;
  transform: translate(-50%);
  max-width: 200%;
  width: auto;
  height: auto;
  opacity: 0.2;
  transition: all 0.15s ease;
  filter: blur(20px);
  background-repeat: no-repeat;
  background-size: contain !important;
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 20%,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
}
</style>
