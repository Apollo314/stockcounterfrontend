<template>
  <q-card
    :bordered="bordered"
    class="adaptive-card"
    :class="{
      'arrived-top': arrivedState.top,
      'arrived-right': arrivedState.right,
      'arrived-bottom': arrivedState.bottom,
      'arrived-left': arrivedState.left,
      'compact-scrollbar': compactScrollbar,
    }"
  >
    <div v-if="$slots['action-top'] || $slots['title-sticky']">
      <slot name="action-top"></slot>
      <card-top
        v-if="!$slots['action-top'] && (backButton || $slots['title-sticky'])"
        :back-button="backButton"
      >
        <template #title><slot name="title-sticky" /></template>
      </card-top>
    </div>
    <div ref="scrollParent" class="scrollparent">
      <div ref="scroller" class="scroll-section flex no-user-select">
        <div ref="scrolledContent" style="flex-grow: 1">
          <card-top
            v-if="
              !($slots['action-top'] || $slots['title-sticky']) &&
              (backButton || $slots['title'])
            "
            :back-button="backButton"
          >
            <template #title><slot name="title" /></template>
          </card-top>
          <slot />
        </div>
      </div>
    </div>
    <div v-if="$slots['action-bottom']">
      <div class="row actions-row bottom full-width">
        <slot name="action-bottom" />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { onActivated, ref } from 'vue';

import CardTop from './CardTop.vue';

withDefaults(
  defineProps<{
    backButton?: boolean;
    bordered?: boolean;
    compactScrollbar?: boolean;
  }>(),
  {
    compactScrollbar: true,
  }
);

const scrollParent = ref<HTMLElement>();
const scrolledContent = ref<HTMLElement>();
const scroller = ref<HTMLElement>();

const { x, y, arrivedState } = useScroll(scroller);

const scrollTo = ({ x, y }: { x: number; y: number }): void => {
  window.scrollTo({ top: y, left: x });
  if (scroller.value !== undefined) {
    scroller.value.scrollTo({
      left: x,
      top: y,
    });
  } else {
    setTimeout(() => {
      scrollTo({ x, y });
    }, 100);
  }
};

onActivated(() => {
  scrollTo({ x: x.value, y: y.value });
});

defineExpose({
  scrollTo,
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
