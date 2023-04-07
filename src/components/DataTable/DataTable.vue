<template>
  <div ref="tableParentRef" class="row fit">
    <adaptive-card
      :class="{
        'sticky-header': stickyHeader,
        'sticky-caption': stickyCaption,
        'bg-transparent': card && !$q.screen.gt.xs && !isFullscreen,
        cards: card,
      }"
      ref="tableCardRef"
      class="full-height col"
      :bordered="$q.screen.gt.xs"
    >
      <template #action-top>
        <Teleport
          :to="subHeader"
          v-if="subHeader"
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
              <template v-for="column in computedcolumns" :key="column.id">
                <HeaderCell
                  @requestFocusOnFilter="requestFocusOnFilter($event)"
                  :column="column"
                >
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
              :class="{ 'selected-row': selected.indexOf(row) > -1 }"
              :key="row.id"
            >
              <td
                @click.stop="
                  toggleSelection(row, !(selected.indexOf(row) > -1))
                "
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
        <div v-else class="row">
          <div
            v-for="row in data"
            :class="{ selected: selected.indexOf(row) > -1 }"
            :key="row.id"
            class="data-card-container q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3"
            @dblclick="toggleSelection(row, !(selected.indexOf(row) > -1))"
          >
            <div
              class="data-card-parent"
              :style="
                selected.indexOf(row) > -1 ? 'transform: scale(0.95);' : ''
              "
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
          </div>
        </div>
      </div>
      <template #action-bottom>
        <div class="row full-width q-pa-sm" style="position: sticky; bottom: 0">
          <div style="margin: auto" v-if="selected.length">
            {{ $t('data_table.xitems_selected', [selected.length]) }}
          </div>
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
    <Form
      class="full-height"
      :keep-values="true"
      ref="filterFormRef"
      v-slot="{ handleSubmit, handleReset, values }"
    >
      <InlineDrawer
        v-model="showFilter"
        style="max-height: 100%"
        :width="300"
        :overlay="width < 700"
        bordered
        v-if="filterComponents && mountedToDataTable"
        :class="{ 'q-ml-md': showFilter && !(width < 700) }"
      >
        <form
          @submit="
            handleSubmit($event, () =>
              request({ offset: -1, filters: values as Filters })
            )
          "
          @reset="handleReset"
          class="full-height"
        >
          <AdaptiveCard class="bg-transparent shadow-0 full-height">
            <div class="q-pa-sm">
              <div class="text-h6">{{ $t('titles.filter') }}</div>
              <TableFilter
                ref="tableFilterRef"
                :form-components="filterComponents"
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
  generic="Row extends BaseRow, Column extends BaseColumn<Row>, Filters extends Record<string, string>"
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
import { paths } from 'src/client/schema.json';
import {
  create_filters,
  FormComponent,
  get_operation,
} from 'src/composables/openapihelpers';
import { callOrGet } from 'src/composables/utilities';

import ActiveColumns from './ActiveColumns.vue';
import { getAlignClass } from './datatableutilities';
import HeaderCell from './HeaderCell.vue';
import TableFilter from './TableFilter.vue';
import TableTop from './TableTop.vue';

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
  }>(),
  {
    stickyHeader: true,
  }
);

const log = console.log;
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

const requestFocusOnFilter = (field: string) => {
  tableFilterRef.value?.highlightComponentsByField(field);
};

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

function deselectAll() {
  selected.value = [];
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

const computedcolumns = computed(() => {
  if (typeof props.columns === 'function') {
    return props.columns();
  } else {
    return props.columns;
  }
});

const requestDone = ref(true);

const request: RequestFunction<Filters> = (partialPagination) => {
  const done = () => {
    requestDone.value = true;
    deselectAll();
    if (tableCardRef.value) {
      tableCardRef.value.scrollTo({ x: 0, y: 0 });
    }
  };
  if (requestDone.value) {
    requestDone.value = false;
    const newPagination = { ...props.pagination, ...partialPagination };
    emit('update:pagination', newPagination);
    nextTick(() => {
      emit('request', { pagination: props.pagination, done });
    });
  }
};

const showFilter = ref($q.screen.gt.sm);

provide('showFilter', showFilter);
provide('toggle', toggle);
provide('isFullscreen', isFullscreen);
provide('card', toRef(props, 'card'));
provide('toggleCardView', toggleCardView);
provide('request', request);
provide('requestDone', requestDone);
provide('columns', props.columns);
</script>

<style lang="scss">
.hide-filter {
  max-width: 0 !important;
  margin-left: 0 !important;
  transition: all 0.3s ease;
}
</style>
