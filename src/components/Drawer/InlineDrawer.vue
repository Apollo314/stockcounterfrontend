<template>
  <q-dialog
    v-if="overlay"
    maximized
    position="right"
    :model-value="modelValue && overlay"
    @update:model-value="closeIfOverlay()"
  >
    <div
      :style="{
        width: `${width}px`,
      }"
    >
      <adaptive-card
        ref="drawerCardRef"
        v-touch-swipe.mouse.right="closeIfOverlay"
        class="full-height"
        :bordered="bordered"
      >
        <slot></slot>
      </adaptive-card>
    </div>
  </q-dialog>
  <q-card
    v-else
    v-show="width > 0"
    :style="{
      width: `${(modelValue ? 1 : 0) * width}px`,
    }"
    :bordered="bordered && modelValue"
    class="full-height inline-drawer-parent"
  >
    <div
      :style="{
        width: `${width}px`,
      }"
      class="full-height inline-drawer-slider"
    >
      <slot></slot>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    bordered?: boolean;
    width?: number;
    overlay?: boolean;
  }>(),
  {
    width: 300,
  }
);

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

const drawerCardRef = ref();

const closeIfOverlay = () => {
  if (props.overlay) {
    emit('update:model-value', false);
  }
};
</script>

<style scoped lang="scss">
.inline-drawer-parent {
  transition: width 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: width;
  overflow: clip;
}
</style>
