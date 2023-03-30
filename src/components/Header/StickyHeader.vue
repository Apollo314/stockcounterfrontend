<template>
  <Teleport v-if="visible" to="body">
    <div class="sticky-header-container" :style="style">
      <div
        ref="innerRef"
        class="header-parent"
        style="position: sticky; z-index: 1000; top: 0"
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useScroll, useElementSize } from '@vueuse/core';
import {
  inject,
  computed,
  ref,
  watch,
  reactive,
  onMounted,
  onDeactivated,
  onActivated,
} from 'vue';

const layoutKey = '_q_l_';
const { y, directions } = useScroll(window);
const headerContainerHeight = ref(0);

type Layout = {
  left: { offset: number; size: number; space: boolean };
  header: { size: number; offset: number; space: boolean };
  update: (
    part: 'header' | 'left',
    prop: 'size' | 'offset' | 'space',
    value: number | boolean
  ) => void;
};

const defaultLayout: Layout = {
  header: reactive({ size: 0, offset: 0, space: false }),
  left: reactive({ size: 300, offset: 0, space: false }),
  update: () => {
    return;
  },
};

const $layout = inject<Layout>(layoutKey, defaultLayout);
const innerRef = ref<HTMLElement>();
const visible = ref(false);

onActivated(() => {
  visible.value = true;
});
onMounted(() => {
  visible.value = true;
});
onDeactivated(() => {
  visible.value = false;
});

const { height: headerHeight } = useElementSize(innerRef);

watch(
  () => headerHeight.value,
  () => {
    $layout.update('header', 'offset', headerHeight.value);
    $layout.update('header', 'size', headerHeight.value);
    $layout.update('header', 'space', true);
  }
);

watch(
  () => [directions.bottom, directions.top],
  () => {
    if (directions.top && headerContainerHeight.value < y.value) {
      headerContainerHeight.value = y.value;
    } else if (
      directions.bottom &&
      headerContainerHeight.value > y.value + headerHeight.value
    ) {
      headerContainerHeight.value = y.value + headerHeight.value;
    }
  }
);

const style = computed(() => {
  return {
    left: `${$layout.left.offset}px`,
    height: `${headerContainerHeight.value}px !important`,
  };
});
</script>

<style scoped lang="scss">
.sticky-header-container {
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  transition: left 0.1s ease-out;
  .header-parent {
    pointer-events: initial;
  }
}
</style>
