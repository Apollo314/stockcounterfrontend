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
import { useScroll } from '@vueuse/core';
import { onActivated, ref } from 'vue';

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
