<template>
  <adaptive-card
    :class="{
      'sticky-header': stickyHeader,
      'sticky-caption': stickyCaption,
    }"
    bordered
    no-width-scrollbar
    :compact-scrollbar="false"
  >
    <div class="table-parent">
      <table flat class="fit coolshadow data-table">
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
              :key="column.id"
              :class="getAlignClass(column.align)"
            >
              <b>
                {{ column.label }}
              </b>
              <slot
                :name="`th-inner-sibling-${column.id}`"
                v-bind="{ column }"
              />
            </th>
            <slot name="head-tr-inner" />
          </tr>
        </thead>
        <tbody class="table-body" :class="tbodyClasses">
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
      </table>
    </div>
    <template #action-bottom>
      <div class="row full-width q-pa-sm">
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
import { computed, ref, Ref, nextTick } from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import OffsetLimitPaginator from 'components/Paginator/OffsetLimitPaginator.vue';

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

const emit = defineEmits<{
  (e: 'update:request', pagination: Pagination<Filters>): void;
  (e: 'update:pagination', pagination: Pagination<Filters>): void;
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

function request(partialPagination: Partial<Pagination<Filters>>) {
  const newPagination = { ...props.pagination, ...partialPagination };
  emit('update:pagination', newPagination);
  nextTick(() => {
    emit('update:request', props.pagination);
  });
}
</script>

<style lang="scss">
$cellpadding: 12px;
$captionheight: 50px;

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
  contain: paint;
}
.data-table {
  position: relative;
  border-collapse: collapse;
  position: relative;
  .checkbox {
    padding: 4px;
  }
  thead.table-head {
    // transition: box-shadow 0.2s ease;
    // .q-card__section:not(.arrived-top) & {
    //   box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2);
    // }
    .sticky-header & {
      position: sticky;
      top: 0;
      z-index: 100;
    }
    background-color: $secondary;
    th.table-header-cell {
      border-collapse: collapse;
      border: none;
      .sticky-caption & {
        top: $captionheight;
      }
    }
  }
  th,
  td {
    padding: $cellpadding;
    .body--dark & {
      border: 1px solid $separator-dark-color;
    }
    .body--light & {
      border: 1px solid $separator-color;
    }
    &:first-of-type {
      width: 1px;
      border-left: none;
    }
    &:last-of-type {
      border-right: none;
    }
  }

  .body--dark & {
    tr:nth-of-type(2n) {
      background: $secondcolor-dark;
    }
    tr.selected-row {
      td {
        background: $table-dark-selected-background;
      }
      // &::after {
      //   content: '';
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   height: 100%;
      //   width: 100%;
      //   background: $table-dark-selected-background;
      //   pointer-events: none;
      // }
      // background: rgba($accent, 0.2);
    }
  }

  .body--light & {
    tr:nth-of-type(2n) {
      background: $secondcolor-light;
    }
    tr.selected-row {
      position: relative;
      background: $table-light-selected-background;
    }
  }

  tr:last-of-type td {
    border-bottom: none;
  }

  .table-caption {
    .body--dark & {
      background: $dark;
    }
    .body--light & {
      background: $almost-white;
    }
    height: $captionheight;
    .sticky-caption & {
      position: sticky;
      top: 0;
      z-index: 101;
    }
  }

  .table-body {
    height: 100%;
    overflow: auto;
  }
}
</style>
