<template>
  <q-card
    class="adaptive-card"
    :class="{
      'arrived-top': arrivedState.top,
      'arrived-right': arrivedState.right,
      'arrived-bottom': arrivedState.bottom,
      'arrived-left': arrivedState.left,
      'compact-scrollbar': noWidthScrollbar,
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
        v-if="scrollbarProperties.needsScrollbar"
        class="virtual-scrollbar vertical"
        :style="{
          transform: `translateY(${scrollbarProperties.scrollbarPosition}px)`,
          height: `${scrollbarProperties.scrollbarHeight}px`,
        }"
      />
      <div
        v-if="scrollbarProperties.needsHScrollbar"
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
import { useElementSize, useScroll, useThrottleFn } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { onActivated, ref, watch } from 'vue';

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

const { x, y, arrivedState } = useScroll(scroller);

const { height: scrollParentHeight, width: scrollParentWidth } =
  useElementSize(scrollParent);

const { height: scrolledContentHeight, width: scrolledContentWidth } =
  useElementSize(scrolledContent);

const scrollbarProperties = ref({
  scrollbarHeight: 0,
  scrollbarPosition: 0,
  needsScrollbar: false,
  hScrollbarWidth: 0,
  hScrollbarPosition: 0,
  needsHScrollbar: false,
});

const updateScrollbar = useThrottleFn(() => {
  if ($q.platform.is.desktop) {
    scrollbarProperties.value.needsScrollbar =
      scrollParentHeight.value < scrolledContentHeight.value;
    scrollbarProperties.value.scrollbarHeight =
      scrollParentHeight.value ** 2 / scrolledContentHeight.value;
    const availableTrack =
      scrolledContentHeight.value - scrollParentHeight.value;
    scrollbarProperties.value.scrollbarPosition =
      (y.value / availableTrack) *
      (scrollParentHeight.value - scrollbarProperties.value.scrollbarHeight);
    scrollbarProperties.value.needsHScrollbar =
      scrollParentWidth.value < scrolledContentWidth.value;
    scrollbarProperties.value.hScrollbarWidth =
      scrollParentWidth.value ** 2 / scrolledContentWidth.value;
    const availableHTrack =
      scrolledContentWidth.value - scrollParentWidth.value;
    scrollbarProperties.value.hScrollbarPosition =
      (x.value / availableHTrack) *
      (scrollParentWidth.value - scrollbarProperties.value.hScrollbarWidth);
  }
}, 50);

watch(
  () => [x.value, y.value],
  () => {
    updateScrollbar();
  }
);

const {} = useVPan({
  target: scroller,
  mouse: { touch: false },
  callback: ({ delta }) => {
    scroller.value?.scrollBy({
      left: -delta.x,
      top: -delta.y,
    });
  },
  throttle: 50,
});

const $q = useQuasar();

const setScroll = ({ x, y }: { x: number; y: number }): void => {
  if (scroller.value !== undefined) {
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
