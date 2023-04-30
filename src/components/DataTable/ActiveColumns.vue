<template>
  <q-popup-proxy
    anchor="top end"
    self="top start"
    :context-menu="contextMenu"
    :breakpoint="600"
  >
    <AdaptiveCard
      bordered
      style="max-height: min(500px, 90vh); max-width: 400px"
    >
      <template #action-top>
        <div class="text-h6 q-pa-sm text-center full-width">
          <div class="text-h6">{{ $t('titles.activeColumns') }}</div>
        </div>
      </template>
      <template #default>
        <q-separator />
        <q-list v-if="columns" class="listpadding" separator>
          <q-item v-for="col in columns" :key="col.id" v-ripple tag="label">
            <q-item-section>
              <q-item-label>{{ callOrGet(col.label) }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                color="secondary"
                :model-value="activeColumns.get(col.id)"
                @update:model-value="activeColumns.set(col.id, $event)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </AdaptiveCard>
  </q-popup-proxy>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from 'vue';

import { callOrGet } from 'src/composables/utilities';

import AdaptiveCard from '../Card/AdaptiveCard.vue';

import { BaseColumn, BaseRow } from './DataTable.vue';

withDefaults(
  defineProps<{
    contextMenu?: boolean;
  }>(),
  {
    contextMenu: true,
  }
);

const columns = inject<Ref<BaseColumn<BaseRow>[]>>('columns');
const activeColumns = inject<Ref<Map<string, boolean>>>(
  'activeColumns',
  ref(new Map<string, boolean>())
);
</script>

<style scoped></style>
