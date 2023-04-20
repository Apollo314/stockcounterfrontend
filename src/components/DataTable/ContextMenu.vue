<template>
  <q-popup-proxy
    ref="popupRef"
    class="unselectable"
    :context-menu="contextMenu"
    :model-value="modelValue"
    transition-show="jump-down"
    transition-hide="jump-up"
    @before-show="handleShow"
    @update:model-value="emit('update:model-value', $event)"
  >
    <q-card bordered>
      <q-list class="listpadding" separator style="min-width: 250px">
        <template v-for="(actionGroup, i) in actions" :key="i">
          <template v-for="(action, j) in actionGroup" :key="j">
            <q-item
              v-if="
                action.hide !== true &&
                (((selectedRows?.size || 0) > 1 &&
                  action.can_handle_multiple) ||
                  (selectedRows?.size === 1 &&
                    action.can_handle_single !== false))
              "
              v-ripple
              v-close-popup
              clickable
              @click="
                selectedRows &&
                  action.callback(selectedRows, (deselect) => {
                    if (deselect) {
                      selectedRows.clear();
                    }
                  })
              "
            >
              <div class="row full-width items-center">
                <q-icon
                  :color="action.color"
                  size="24px"
                  class="q-mr-md"
                  :name="action.icon"
                />
                <div>{{ action.label }}</div>
              </div>
            </q-item>
          </template>
        </template>
      </q-list>
    </q-card>
  </q-popup-proxy>
</template>

<script setup lang="ts" generic="Row extends BaseRow">
import { PropType } from 'vue';

import { ContextMenuGroup } from './DataTable.vue';

export type BaseRow = {
  id: number | string;
};

defineProps({
  selectedRows: {
    type: Map as PropType<Map<number | string, Row>>,
    required: false,
    default: new Map(),
  },
  actions: {
    type: Array as PropType<ContextMenuGroup<Row>[]>,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  contextMenu: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits<{
  (e: 'contextRequest'): void;
  (e: 'update:model-value', value: boolean): void;
}>();

const handleShow = () => {
  emit('contextRequest');
};
</script>

<style scoped></style>
