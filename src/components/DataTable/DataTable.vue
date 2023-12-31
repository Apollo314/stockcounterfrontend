<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div ref="tableParentRef" class="row data-table fit">
    <adaptive-card
      ref="tableCardRef"
      :class="{
        'sticky-header': stickyHeader,
        'sticky-caption': stickyCaption,
        'bg-transparent': card && !$q.screen.gt.xs && !isFullscreen,
        cards: card,
      }"
      class="full-height col"
      :bordered="$q.screen.gt.xs"
    >
      <template #action-top>
        <Teleport
          v-if="subHeader"
          :to="subHeader"
          :disabled="
            !card || $q.screen.gt.sm || isFullscreen || !mountedToDataTable
          "
        >
          <q-toolbar>
            <ActiveColumns></ActiveColumns>
            <TableTop></TableTop>
          </q-toolbar>
        </Teleport>
      </template>
      <div class="table-parent">
        <table v-if="!card" class="coolshadow data-table">
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
              <template v-for="column in computedcolumns" :key="column.id">
                <HeaderCell
                  v-if="activeColumns.get(column.id)"
                  :column="column"
                  @request-focus-on-filter="requestFocusOnFilter($event)"
                  @request-ordering="
                    order($event.column as unknown as Column, $event.order)
                  "
                >
                  <!-- TODO: Fix the hack above as unknown as Column when vue supports generics better -->
                  <slot
                    :name="`th-inner-sibling-${column.id}`"
                    v-bind="{ column }"
                  />
                </HeaderCell>
              </template>
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
              :key="row.id"
              :class="{ 'selected-row': selectedMap.has(row.id) }"
              @dblclick.stop="toggleSelection(row)"
            >
              <context-menu
                :actions="contextmenuactions"
                :selectedRows="selectedMap"
                @context-request="
                  () => {
                    if (!selectedMap.has(row.id)) {
                      selectedMap.clear();
                      toggleSelection(row, true);
                    }
                  }
                "
              />
              <td @click="toggleSelection(row, undefined, $event)">
                <q-checkbox
                  dense
                  class="checkbox"
                  :model-value="selectedMap.has(row.id)"
                  @click="toggleSelection(row, undefined, $event)"
                />
              </td>
              <template v-for="column in computedcolumns" :key="column.id">
                <td
                  v-if="activeColumns.get(column.id)"
                  :class="getAlignClass(column.align)"
                >
                  <span v-if="!$slots[`td-replace-${column.id}`]">
                    <div class="cell">
                      {{ getColValue(column, row) }}
                    </div>
                    <slot
                      :name="`td-inner-sibling-${column.id}`"
                      v-bind="{ row: row, column: column }"
                    />
                  </span>
                  <span v-else>
                    <slot
                      :name="`td-replace-${column.id}`"
                      v-bind="{ row: row, column: column }"
                    />
                  </span>
                  <q-tooltip v-if="column.hint !== undefined">
                    <div
                      style="
                         {
                          max-width: 400px;
                        }
                      "
                    >
                      {{ getColHint(column, row) }}
                    </div>
                  </q-tooltip>
                </td>
              </template>
              <slot name="body-tr-inner" v-bind="{ row }" />
            </tr>
          </tbody>
        </table>
        <div v-else class="row">
          <div
            v-for="row in data"
            :key="row.id"
            :class="{ selected: selectedMap.has(row.id) }"
            class="data-card-container q-pa-sm col-xs-12 col-md-6 col-xl-3"
            @dblclick="toggleSelection(row)"
          >
            <div class="data-card-parent" style="width: 100%; height: 100%">
              <context-menu
                v-model="contextMenus[row.id]"
                :actions="contextmenuactions"
                :selectedRows="selectedMap"
                @context-request="
                  () => {
                    if (!selectedMap.has(row.id)) {
                      selectedMap.clear();
                      toggleSelection(row, true);
                    }
                  }
                "
              />
              <q-card class="data-card" style="width: 100%">
                <q-card-section horizontal class="q-pa-md">
                  <q-checkbox
                    dense
                    class="checkbox"
                    :model-value="selectedMap.has(row.id)"
                    @update:model-value="toggleSelection(row, $event)"
                  />
                  <q-space />
                  <slot name="card-buttons" v-bind="{ row: row }"></slot>
                  <q-btn
                    flat
                    dense
                    icon="more_vert"
                    @click="contextMenus[row.id] = true"
                  />
                </q-card-section>
                <q-list dense separator>
                  <template v-for="column in computedcolumns" :key="column.id">
                    <q-item v-if="activeColumns.get(column.id)">
                      <q-item-section side>
                        <q-item-label>{{
                          callOrGet(column.label, [column])
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section
                        style="
                          color: inherit !important;
                          font-weight: 900;
                          word-break: break-all;
                        "
                      >
                        <span
                          v-if="!$slots[`card-replace-${column.id}`]"
                          class="row justify-end"
                        >
                          <div>
                            {{ getColValue(column, row) }}
                          </div>
                        </span>
                        <span v-else class="row justify-end">
                          <slot
                            :name="`card-replace-${column.id}`"
                            v-bind="{ row: row, column: column }"
                          />
                        </span>
                        <q-tooltip v-if="column.hint !== undefined">
                          {{ getColHint(column, row) }}
                        </q-tooltip>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <template #action-bottom>
        <div class="row full-width q-pa-sm justify-end">
          <div
            v-if="selectedMap.size > 0"
            style="margin-top: auto; margin-bottom: auto; flex-grow: 1"
          >
            {{ $t('data_table.xitems_selected', [selectedMap.size]) }}
          </div>
          <OffsetLimitPaginator
            style="align-self: flex-end"
            :model-value="pagination.offset"
            :count="pagination.count"
            :limit="pagination.limit"
            :max-length="7"
            direction-links
            @update:model-value="request({ offset: $event })"
          ></OffsetLimitPaginator>
        </div>
      </template>
    </adaptive-card>
    <Form
      ref="filterFormRef"
      v-slot="{ handleSubmit, handleReset, values }"
      class="full-height"
      :keep-values="true"
    >
      <InlineDrawer
        v-if="filterComponents && mountedToDataTable"
        v-model="showFilter"
        style="max-height: 100%"
        :width="300"
        :overlay="width < 700"
        bordered
        :class="{ 'q-ml-md': showFilter && !(width < 700) }"
      >
        <form
          class="full-height"
          @submit="
            handleSubmit($event as Event, () =>
              request({ offset: -1, filters: values as Filters })
            )
          "
          @reset="handleReset"
        >
          <AdaptiveCard class="bg-transparent shadow-0 full-height">
            <div class="q-pa-sm">
              <div class="text-h6">{{ $t('titles.filter') }}</div>
              <TableFilter
                ref="tableFilterRef"
                :formComponents="filterComponents"
              ></TableFilter>
            </div>
            <template #action-bottom>
              <div class="row full-width justify-between q-pa-sm">
                <q-btn
                  color="primary"
                  icon="search"
                  :label="$t('commons.dofilter')"
                  type="submit"
                />
                <q-btn
                  color="negative"
                  icon="clear"
                  :label="$t('commons.reset')"
                  type="reset"
                />
              </div>
            </template>
          </AdaptiveCard>
        </form>
      </InlineDrawer>
    </Form>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>, Filters extends Record<string, string | undefined>"
>
import { useElementSize, useFullscreen } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { Form } from 'vee-validate';
import {
  Ref,
  computed,
  inject,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRef,
} from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import InlineDrawer from 'components/Drawer/InlineDrawer.vue';
import OffsetLimitPaginator from 'components/Paginator/OffsetLimitPaginator.vue';
import { FormComponent } from 'src/composables/openapihelpers';
import { callOrGet } from 'src/composables/utilities';

import ActiveColumns from './ActiveColumns.vue';
import ContextMenu from './ContextMenu.vue';
import { getAlignClass } from './datatableutilities';
import HeaderCell from './HeaderCell.vue';
import TableFilter from './TableFilter.vue';
import TableTop from './TableTop.vue';

export type BaseRow = {
  id: number | string;
};

export type BaseColumn<Row> = {
  id: keyof Row & string;
  field: keyof Row | ((row: Row) => string | number | undefined | null);
  hint?: keyof Row | ((row: Row) => string);
  label: string | ((column: BaseColumn<Row>) => string);
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
  orderable?: boolean;
  filterable?: boolean;
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
  [key in keyof Row]?: Partial<Column>;
};

export type ColumnsWidthGenerator<
  Column extends BaseColumn<Row>,
  Row extends BaseRow
> = {
  [key in keyof ColumnsOverride<Column, Row>]?: number;
};

export type RequestFunction<Filters> = (
  partialPagination: Partial<Pagination<Filters>>
) => void;

export type ContextMenuAction<Row> = {
  label: string;
  color?: string;
  icon?: string;
  can_handle_multiple?: boolean;
  can_handle_single?: boolean;
  callback: (
    rows: Map<number | string, Row>,
    done: (deselect: boolean) => void
  ) => void;
  hide?: boolean;
};

export type ContextMenuGroup<Row> = ContextMenuAction<Row>[];

const props = withDefaults(
  defineProps<{
    columns: Column[] | (() => Column[]);
    data: Row[];
    pagination: Pagination<Filters>;
    filterComponents?: Record<string, FormComponent>;
    stickyCaption?: boolean;
    stickyHeader?: boolean;
    captionClasses?: string;
    theadClasses?: string;
    tbodyClasses?: string;
    /**
     * whether or not to show the data as cards.
     */
    card: boolean;
    contextmenuactions: ContextMenuGroup<Row>[];
  }>(),
  {
    stickyHeader: true,
  }
);

const subHeader = inject<Ref<HTMLElement>>('subHeader');
const $q = useQuasar();
const tableParentRef = ref<HTMLElement>();
const tableCardRef = ref<InstanceType<typeof AdaptiveCard>>();
const mountedToDataTable = ref(false);
const { width } = useElementSize(tableParentRef);

// can't use InstanceType<typeof TableFilter<Filters>>
// maybe they don't support for genericly typed components as of now.
// eitherway, the function signature I'm trying to get is simple.
const tableFilterRef = ref<{
  highlightComponentsByField: (field: string) => void;
}>();

const requestFocusOnFilter = (field: string, retryCount = 0) => {
  if (retryCount < 10) {
    showFilter.value = true;

    if (tableFilterRef.value) {
      tableFilterRef.value?.highlightComponentsByField(field);
    } else {
      // so when tableFilterRef is in a dialog component, it's not yet mounted,
      // wait till it gets mounted
      nextTick(() => {
        requestFocusOnFilter(field, retryCount++);
      });
    }
  }
};

const orderedColumns = ref(
  new Map<string, { column: Column; order: 'ascending' | 'descending' }>()
);

function order(column: Column, order: 'ascending' | 'descending') {
  if (orderedColumns.value.has(column.id)) {
    if (orderedColumns.value.get(column.id)?.order === order) {
      orderedColumns.value.delete(column.id);
    } else {
      orderedColumns.value.set(column.id, { column, order });
    }
  } else {
    orderedColumns.value.set(column.id, { column, order });
  }
  request({ offset: 0 });
}

const orderingValue = computed(() => {
  return Array.from(orderedColumns.value, ([, value]) => {
    return (value.order === 'descending' ? '-' : '') + value.column.id;
  }).join(',');
});

const toggleCardView = (val?: boolean) => {
  // it doesn't work any other way than setTimeout
  // nextTick doesn't work.
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  if (val !== undefined) {
    emit('update:card', val);
  } else {
    emit('update:card', !props.card);
  }
};

onActivated(() => {
  mountedToDataTable.value = true;
});
onMounted(() => {
  mountedToDataTable.value = true;
});
onUnmounted(() => {
  mountedToDataTable.value = false;
});
onDeactivated(() => {
  mountedToDataTable.value = false;
});

const { isFullscreen, toggle } = useFullscreen(tableParentRef);

const filterFormRef = ref();

const emit = defineEmits<{
  (
    e: 'request',
    value: { pagination: Pagination<Filters>; done: () => void }
  ): void;
  (e: 'update:pagination', pagination: Pagination<Filters>): void;
  (e: 'update:card', value: boolean): void;
}>();

const selectedMap = ref(new Map<number | string, Row>());
const contextMenus = ref<Record<string | number, boolean>>({});
const lastSelectedRow = ref<Row>();

function getColValue(col: Column, row: Row) {
  return col.field instanceof Function ? col.field(row) : row[col.field];
}

function getColHint(col: Column, row: Row) {
  if (col.hint) {
    return col.hint instanceof Function ? col.hint(row) : row[col.hint];
  }
}

function toggleSelection(row: Row, value?: boolean, event?: MouseEvent) {
  if (event?.shiftKey) {
    if (lastSelectedRow.value !== undefined) {
      const index_one = props.data.findIndex(
        (row) => row.id === lastSelectedRow.value?.id
      );
      const index_two = props.data.findIndex((r) => r.id === row.id);
      const index_lower = index_two > index_one ? index_one + 1 : index_two + 1;
      const index_higher = index_two > index_one ? index_two : index_one;
      for (const r of props.data.slice(index_lower, index_higher)) {
        toggleSelection(r);
      }
    }
    toggleSelection(row, value);
  } else if (value === undefined) {
    if (!selectedMap.value.has(row.id)) {
      selectedMap.value.set(row.id, row);
    } else {
      selectedMap.value.delete(row.id);
    }
  } else if (value === false) {
    selectedMap.value.delete(row.id);
  } else {
    selectedMap.value.set(row.id, row);
  }
  if (event !== undefined) {
    lastSelectedRow.value = row;
  }
}

function toggleSelectionAll() {
  // if completely unselected, select all
  if (selectedMap.value.size === 0) {
    for (const row of props.data) {
      selectedMap.value.set(row.id, row);
    }
  }
  // if any selected, deselect
  else if (selectedMap.value.size > 0) {
    selectedMap.value.clear();
  }
}

function deselectAll() {
  selectedMap.value.clear();
}

const selectAllButtonStatus = computed(() => {
  if (selectedMap.value.size === 0) {
    return false;
  } else if (selectedMap.value.size < props.data.length) {
    return undefined;
  } else {
    return true;
  }
});

const computedcolumns = computed(() => {
  if (typeof props.columns === 'function') {
    return props.columns();
  } else {
    return props.columns;
  }
});

const activeColumns = ref(new Map<BaseColumn<Row>['id'], boolean>());
for (const col of computedcolumns.value) {
  activeColumns.value.set(col.id, !col.hidden);
}

const requestDone = ref(true);

const request: RequestFunction<Filters> = (partialPagination) => {
  const done = () => {
    requestDone.value = true;
    deselectAll();
    if (tableCardRef.value) {
      tableCardRef.value.scrollTo({ y: 0 });
    }
  };
  if (requestDone.value) {
    requestDone.value = false;
    const filters: Record<string, string> = {
      ...partialPagination.filters,
      ordering: orderingValue.value,
    };
    delete partialPagination.filters;
    const newPagination = {
      ...props.pagination,
      filters: filters as Filters,
      ...partialPagination,
    };
    emit('update:pagination', newPagination);
    nextTick(() => {
      emit('request', { pagination: props.pagination, done });
    });
  }
};

const showFilter = ref($q.screen.gt.sm);

provide('order', order);
provide('showFilter', showFilter);
provide('toggle', toggle);
provide('isFullscreen', isFullscreen);
provide('card', toRef(props, 'card'));
provide('toggleCardView', toggleCardView);
provide('request', request);
provide('requestDone', requestDone);
provide('columns', toRef(props, 'columns'));
provide('activeColumns', activeColumns);
provide('orderedColumns', orderedColumns);
</script>

<style lang="scss">
.hide-filter {
  max-width: 0 !important;
  margin-left: 0 !important;
  transition: all 0.3s ease;
}
</style>
