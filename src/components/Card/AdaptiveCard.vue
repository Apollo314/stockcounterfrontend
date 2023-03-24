<template>
  <q-card
    class="adaptive-card"
    :class="{
      'arrived-top': arrivedState.top,
      'arrived-right': arrivedState.right,
      'arrived-bottom': arrivedState.bottom,
      'arrived-left': arrivedState.left,
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
        :class="{
          'is-scrolling': isScrolling,
        }"
        :style="{
          transform: `translateY(${scrollbarProperties.scrollbarPosition}px)`,
          height: `${scrollbarProperties.scrollbarHeight}px`,
        }"
      />
      <div
        v-if="scrollbarProperties?.needsHScrollbar"
        class="virtual-scrollbar horizontal"
        :class="{
          'is-scrolling': isScrolling,
        }"
        :style="{
          transform: `translateX(${scrollbarProperties.hScrollbarPosition}px)`,
          width: `${scrollbarProperties.hScrollbarWidth}px`,
        }"
      />
      <div
        ref="scrollElement"
        class="scroll-section"
        :class="{
          'no-width-scrollbar': noWidthScrollbar,
          'compact-scrollbar': compactScrollbar,
        }"
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
import { ref, computed, onActivated } from 'vue';

withDefaults(
  defineProps<{
    noWidthScrollbar?: boolean;
    compactScrollbar?: boolean;
  }>(),
  {
    noWidthScrollbar: true,
  }
);

const scrollElement = ref<HTMLElement>();

const { x, y, isScrolling, arrivedState } = useScroll(scrollElement);
const $q = useQuasar();

onActivated(() => {
  // this is not a mistake.
  // this returns the scroll position to where it was before.
  y.value = y.value;
  x.value = x.value;
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
</script>
<style lang="scss">
.virtual-scrollbar {
  position: absolute;
  &.vertical {
    width: 0px;
    right: 0px;
    &.is-scrolling {
      width: 4px;
    }
  }
  &.horizontal {
    height: 0px;
    bottom: 0px;
    &.is-scrolling {
      height: 4px;
    }
  }
  background: $primary;
  border-radius: 2px;
  z-index: 10000;
  transition: width 0.1s ease-in;
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
