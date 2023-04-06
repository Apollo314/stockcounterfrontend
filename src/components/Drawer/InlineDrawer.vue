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
        v-touch-swipe:8e-2:10:50.mouse.right="closeIfOverlay"
        ref="drawerCardRef"
        :bordered="bordered"
      >
        <template #action-top>
          <slot name="action-top"></slot>
        </template>
        <template #action-bottom>
          <slot name="action-bottom"></slot>
        </template>
        <slot></slot>
      </adaptive-card>
    </div>
  </q-dialog>
  <div
    v-else
    :style="{
      width: `${(modelValue ? 1 : 0) * width}px`,
    }"
    class="full-height inline-drawer-parent"
  >
    <div
      :style="{
        width: `${width}px`,
      }"
      class="full-height inline-drawer-slider"
    >
      <adaptive-card class="full-height" :bordered="bordered">
        <template v-if="$slots['action-bottom']" #action-top>
          <slot name="action-top"></slot>
        </template>
        <template v-if="$slots['action-bottom']" #action-bottom>
          <slot name="action-bottom"></slot>
        </template>
        <slot></slot>
      </adaptive-card>
    </div>
  </div>
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

<style lang="scss">
.inline-drawer-parent {
  transition: width 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: width;
  overflow: clip;
}
</style>
