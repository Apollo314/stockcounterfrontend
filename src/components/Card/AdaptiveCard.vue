<template>
  <q-card
    class="adaptive-card"
    :class="{
      'arrived-top': arrivedState.top,
      'arrived-right': arrivedState.right,
      'arrived-bottom': arrivedState.bottom,
      'arrived-left': arrivedState.left,
      'no-width-scrollbar': noWidthScrollbar,
    }"
  >
    <q-card-actions
      v-if="$slots['action-top']"
      class="q-pa-none actions-container"
    >
      <div class="row actions-row top full-width">
        <slot name="action-top" />
      </div>
    </q-card-actions>
    <div class="scrollparent">
      <div
        v-if="scrollbarProperties?.needsScrollbar"
        class="virtual-scrollbar vertical"
        :style="{
          transform: `translateY(${scrollbarProperties.scrollbarPosition}px)`,
          height: `${scrollbarProperties.scrollbarHeight}px`,
        }"
      />
      <div
        v-if="scrollbarProperties?.needsHScrollbar"
        class="virtual-scrollbar horizontal"
        :style="{
          transform: `translateX(${scrollbarProperties.hScrollbarPosition}px)`,
          width: `${scrollbarProperties.hScrollbarWidth}px`,
        }"
      />
      <div
        ref="scrollElement"
        class="scroll-section"
        v-touch-pan.mouse="handlePan"
      >
        <slot />
      </div>
    </div>
    <q-card-actions
      v-if="$slots['action-bottom']"
      class="q-pa-none actions-container"
    >
      <div class="row actions-row bottom full-width">
        <slot name="action-bottom" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { computed, onActivated, ref } from 'vue';

withDefaults(
  defineProps<{
    noWidthScrollbar?: boolean;
  }>(),
  {
    noWidthScrollbar: true,
  }
);

const scrollElement = ref<HTMLElement>();

const { x, y, arrivedState, directions } = useScroll(scrollElement);
const $q = useQuasar();

onActivated(() => {
  scrollElement.value?.scrollTo({
    left: x.value,
    top: y.value,
  });
});

const scrollbarProperties = computed(() => {
  if ($q.platform.is.desktop) {
    const scrollHeight = scrollElement.value?.scrollHeight || 0;
    const offsetHeight = scrollElement.value?.offsetHeight || 0;
    const scrollWidth = scrollElement.value?.scrollWidth || 0;
    const offsetWidth = scrollElement.value?.offsetWidth || 0;

    const needsScrollbar = offsetHeight < scrollHeight;
    const scrollbarHeight = offsetHeight ** 2 / scrollHeight;
    const availableTrack = scrollHeight - offsetHeight;
    const scrollbarPosition =
      (y.value / availableTrack) * (offsetHeight - scrollbarHeight);

    const needsHScrollbar = offsetWidth < scrollWidth;
    const hScrollbarWidth = offsetWidth ** 2 / scrollWidth;
    const availableHTrack = scrollWidth - offsetWidth;
    const hScrollbarPosition =
      (x.value / availableHTrack) * (offsetWidth - hScrollbarWidth);

    return {
      scrollbarHeight,
      scrollbarPosition,
      needsScrollbar,
      hScrollbarWidth,
      hScrollbarPosition,
      needsHScrollbar,
    };
  } else {
    return undefined;
  }
});

const lastPan = ref<{ x: number; y: number }>({ x: x.value, y: y.value });

type TouchPanEvent = {
  // couldn't find it in quasar's types.
  // They have an empty Interface where this should be.
  evt: Event;
  touch: boolean;
  mouse: boolean;
  position: {
    top: number;
    left: number;
  };
  direction: 'up' | 'right' | 'down' | 'top';
  isFirst: boolean;
  isFinal: boolean;
  duration: number;
  distance: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
};

function handlePan({ isFirst, offset }: TouchPanEvent) {
  if (isFirst) {
    lastPan.value = { x: x.value, y: y.value };
  }
  scrollElement.value?.scrollTo({
    left: lastPan.value.x - offset.x,
    top: lastPan.value.y - offset.y,
  });
}

defineExpose({
  scroller: {
    x,
    y,
    arrivedState,
    directions,
  },
});
</script>
<style lang="scss">
.virtual-scrollbar {
  position: absolute;
  &.vertical {
    width: 0px;
    right: 0px;
  }
  &.horizontal {
    height: 0px;
    bottom: 0px;
  }
  .adaptive-card:hover & {
    &.vertical {
      width: 4px;
    }
    &.horizontal {
      height: 4px;
    }
  }
  background: $primary;
  border-radius: 2px;
  z-index: 10000;
  transition-property: width, height;
  transition-duration: 0.1s;
  transition-timing-function: ease;
}
.scroll-section {
  transition: box-shadow 0.2s ease;
}
.scrollparent {
  flex-grow: 1;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style>
