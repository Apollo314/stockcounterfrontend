<template>
  <q-card class="adaptive-card">
    <q-card-actions
      v-if="$slots['action-top']"
      class="q-pa-none actions-container"
    >
      <div class="row actions-row top full-width">
        <slot name="action-top" />
      </div>
    </q-card-actions>
    <div class="relative"></div>
    <q-card-section
      ref="scrollElement"
      class="col relative scroll-section q-pa-none"
      :class="{
        'no-width-scrollbar': noWidthScrollbar,
        'compact-scrollbar': compactScrollbar,
      }"
    >
      <div
        v-if="scrollbarProperties?.needsScrollbar"
        class="virtual-scrollbar"
        :class="{
          'is-scrolling': isScrolling,
        }"
        :style="{
          top: `${scrollbarProperties.scrollbarPosition}px`,
          height: `${scrollbarProperties.scrollbarHeight}px`,
        }"
      />
      <slot />
    </q-card-section>
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
import { QCardSection, useQuasar } from 'quasar';
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

const scrollElement = ref<InstanceType<typeof QCardSection>>();
const scrollHtmlElement = computed(() => {
  return scrollElement?.value?.$el;
});

const { x, y, isScrolling } = useScroll(scrollHtmlElement);
const $q = useQuasar();

onActivated(() => {
  // this is not a mistake.
  // this returns the scroll position to where it was before.
  y.value = y.value;
  x.value = x.value;
});

const scrollbarProperties = computed(() => {
  if ($q.platform.is.desktop) {
    const scrollHeight = scrollHtmlElement.value?.scrollHeight;
    const offsetHeight = scrollHtmlElement.value?.offsetHeight;
    const needsScrollbar = offsetHeight < scrollHeight;
    const scrollbarHeight = offsetHeight ** 2 / scrollHeight;
    const availableTrack = scrollHeight - offsetHeight;
    const scrollbarPosition =
      y.value + (y.value / availableTrack) * (offsetHeight - scrollbarHeight);

    return {
      scrollHeight,
      offsetHeight,
      scrollbarHeight,
      scrollbarPosition,
      needsScrollbar,
    };
  } else {
    return undefined;
  }
});
</script>
<style lang="scss">
.virtual-scrollbar {
  position: absolute;
  width: 0px;
  right: 0px;
  background: $primary;
  border-radius: 2px;
  z-index: 10000;
  transition: width 0.1s ease-in;
  &.is-scrolling {
    width: 4px;
  }
}
</style>
