<template>
  <q-popup-proxy
    class="unselectable"
    ref="popupRef"
    @before-show="handleShow"
    context-menu
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <q-card bordered>
      <q-list class="listpadding" separator style="min-width: 250px">
        <template v-for="(actionGroup, i) in actions" :key="i">
          <template v-for="(action, j) in actionGroup" :key="j">
            <q-item
              v-if="
                action.hide !== true &&
                (((selectedRows?.length || 0) > 1 &&
                  action.can_handle_multiple) ||
                  (selectedRows?.length === 1 &&
                    action.can_handle_single !== false))
              "
              clickable
              v-ripple
              @click="
                selectedRows &&
                  action.callback(selectedRows, (deselect: boolean) => {
                    if (deselect) {
                      $emit('update:selectedRows', []);
                    }
                  })
              "
              v-close-popup
            >
              <q-item-section avatar v-if="action.icon">
                <q-icon :color="action.color" :name="action.icon" />
              </q-item-section>
              <q-item-section>{{ action.label }}</q-item-section>
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
    type: Array as PropType<Row[]>,
    required: false,
  },
  actions: {
    type: Array as PropType<ContextMenuGroup<Row>[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'contextRequest'): void;
}>();

const handleShow = () => {
  emit('contextRequest');
};
</script>

<style scoped></style>
