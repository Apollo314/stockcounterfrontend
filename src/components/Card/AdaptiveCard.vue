<template>
  <q-card
    class="adaptive-card"
    :class="{
      'arrived-top': arrivedState.top,
      'arrived-right': arrivedState.right,
      'arrived-bottom': arrivedState.bottom,
      'arrived-left': arrivedState.left,
      'no-width-scrollbar': noWidthScrollbar,
      'is-scrolling': isScrolling,
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
    <div ref="scrollParent" class="scrollparent">
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
      <div ref="scroller" class="scroll-section flex no-user-select">
        <div ref="scrolledContent" style="flex-grow: 1">
          <slot />
        </div>
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
import { useElementSize, useScroll } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { computed, onActivated, ref } from 'vue';

import { useVPan } from 'src/composables/useVPan';

withDefaults(
  defineProps<{
    noWidthScrollbar?: boolean;
  }>(),
  {
    noWidthScrollbar: true,
  }
);

const scrollParent = ref<HTMLElement>();
const scrolledContent = ref<HTMLElement>();
const scroller = ref<HTMLElement>();

const { x, y, arrivedState, isScrolling, directions } = useScroll(scroller);

const { height: scrollParentHeight, width: scrollParentWidth } =
  useElementSize(scrollParent);

const { height: scrolledContentHeight, width: scrolledContentWidth } =
  useElementSize(scrolledContent);

const {} = useVPan({
  target: scroller,
  mouse: { touch: false },
  callback: ({ isFirst, offset }) => {
    if (isFirst) {
      lastPan.value = { x: x.value, y: y.value };
    }
    scroller.value?.scrollTo({
      left: lastPan.value.x - offset.x,
      top: lastPan.value.y - offset.y,
    });
  },
  throttle: 20,
});

const $q = useQuasar();

const setScroll = ({ x, y }: { x: number; y: number }): void => {
  if (scroller.value !== undefined) {
    console.log('settin scroll');
    scroller.value.scrollTo({
      left: x,
      top: y,
    });
  } else {
    setTimeout(() => {
      setScroll({ x, y });
    }, 100);
  }
};

onActivated(() => {
  setScroll({ x: x.value, y: y.value });
});

const scrollbarProperties = computed(() => {
  if ($q.platform.is.desktop && scroller.value) {
    const needsScrollbar =
      scrollParentHeight.value < scrolledContentHeight.value;
    const scrollbarHeight =
      scrollParentHeight.value ** 2 / scrolledContentHeight.value;
    const availableTrack =
      scrolledContentHeight.value - scrollParentHeight.value;
    const scrollbarPosition =
      (y.value / availableTrack) * (scrollParentHeight.value - scrollbarHeight);

    const needsHScrollbar =
      scrollParentWidth.value < scrolledContentWidth.value;
    const hScrollbarWidth =
      scrollParentWidth.value ** 2 / scrolledContentWidth.value;
    const availableHTrack =
      scrolledContentWidth.value - scrollParentWidth.value;
    const hScrollbarPosition =
      (x.value / availableHTrack) * (scrollParentWidth.value - hScrollbarWidth);

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
  .adaptive-card:hover &,
  .adaptive-card.is-scrolling & {
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
