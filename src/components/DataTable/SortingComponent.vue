<template>
  <q-popup-proxy anchor="bottom start" self="top start">
    <q-card bordered class="q-card-mobile-full-width">
      <div class="row justify-between q-pa-sm text-center">
        <div class="text-h6">{{ $t('titles.ordering') }}</div>
        <q-btn
          color="negative"
          icon="clear"
          no-caps
          :label="$t('commons.reset')"
          @click="
            orderedColumns?.clear();
            request?.({ offset: 0 });
          "
        />
      </div>
      <q-separator />
      <q-list class="listpadding" separator>
        <template v-for="column in columns" :key="column.id">
          <q-item v-if="column.orderable">
            <q-item-section class="text-bold">
              {{ callOrGet(column.label) }}
            </q-item-section>
            <q-item-section>
              <q-btn-group spread flat>
                <q-btn
                  v-if="column.orderable"
                  flat
                  :class="{
                    'active-button':
                      orderedColumns?.get(column.id)?.order === 'ascending',
                  }"
                  @click="order?.(column, 'ascending')"
                >
                  <div
                    class="row"
                    style="width: max-content; flex-wrap: nowrap"
                  >
                    <q-icon name="arrow_upward" />
                    <sup
                      v-if="
                        orderedColumns?.get(column.id)?.order === 'ascending'
                      "
                      style="font-weight: bolder"
                      >({{ orderIndex(column) }})</sup
                    >
                  </div>
                  <q-tooltip>{{
                    $t('data_table.ordering.buttons.increasing')
                  }}</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="column.orderable"
                  flat
                  :class="{
                    'active-button':
                      orderedColumns?.get(column.id)?.order === 'descending',
                  }"
                  @click="order?.(column, 'descending')"
                >
                  <div
                    class="row"
                    style="width: max-content; flex-wrap: nowrap"
                  >
                    <q-icon name="arrow_downward" />
                    <sup
                      v-if="
                        orderedColumns?.get(column.id)?.order === 'descending'
                      "
                      style="font-weight: bolder"
                      >({{ orderIndex(column) }})</sup
                    >
                  </div>
                  <q-tooltip>{{
                    $t('data_table.ordering.buttons.decreasing')
                  }}</q-tooltip>
                </q-btn>
              </q-btn-group>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card>
  </q-popup-proxy>
</template>

<script
  setup
  lang="ts"
  generic="Row extends BaseRow, Column extends BaseColumn<Row>"
>
import { inject, Ref } from 'vue';

import { callOrGet } from 'src/composables/utilities';

// this, I believe will be sorted out in next versions of vue and the lint disable below won't be necessary.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseColumn, BaseRow } from './DataTable.vue';

defineEmits<{
  (
    e: 'requestOrdering',
    value: { column: Column; order: 'ascending' | 'descending' }
  ): void;
}>();

const columns = inject<Ref<Column[]>>('columns');
const orderedColumns =
  inject<
    Ref<Map<string, { column: Column; order: 'ascending' | 'descending' }>>
  >('orderedColumns');

const order =
  inject<(column: Column, order: 'ascending' | 'descending') => void>('order');

const request = inject<(pagination: { offset: number }) => void>('request');

const orderIndex = (column: Column) => {
  let index = 1;
  if (orderedColumns?.value) {
    for (const [, value] of orderedColumns?.value) {
      if (value.column.id === column.id) {
        return index;
      }
      index++;
    }
  }
  return -1;
};
</script>

<style scoped lang="scss">
.active-button {
  background: $primary;
}
</style>
