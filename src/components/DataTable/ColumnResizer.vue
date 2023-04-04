<template>
  <div
    ref="resizerRef"
    v-touch-pan.prevent.mouse="panHandler"
    class="resize"
    :class="{ panning: panning }"
  >
    <q-icon
      name="chevron_left"
      size="sm"
      style="position: absolute; right: 8px"
    />
    <q-icon
      name="chevron_right"
      size="sm"
      style="position: absolute; left: 8px"
    />
    <div class="middle-line"></div>
  </div>
</template>

<script setup lang="ts">
import { useThrottleFn } from '@vueuse/shared';
import { inject, Ref, ref } from 'vue';

import { TouchPanEvent } from 'src/types/quasarmissingtypes';

type FakeColumn = {
  id: number | string;
};

const props = defineProps<{
  column: FakeColumn;
}>();

const resizerRef = ref<HTMLElement>();
const panning = ref<boolean>(false);
const startpos = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const columnWidth = inject('columnWidth', ref(0));

const panHandler = useThrottleFn(async (evt: TouchPanEvent) => {
  if (evt.isFirst) {
    startpos.value.x = evt.offset.x;
    startpos.value.y = evt.offset.y;
    panning.value = true;
    columnWidth.value =
      (resizerRef.value?.parentElement?.offsetWidth || 0) + evt.delta.x;
  } else {
    const delta = {
      x: evt.offset.x - startpos.value.x,
      y: evt.offset.y - startpos.value.y,
    };
    columnWidth.value = delta.x + columnWidth.value;
    startpos.value.x = evt.offset.x;
    startpos.value.y = evt.offset.y;
  }
  if (evt.isFinal) {
    panning.value = false;
  }
}, 20);
</script>

<style scoped lang="scss">
$col-resize-width: 20px;

@keyframes backandforthleft {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-4px);
  }
}

@keyframes backandforthright {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(4px);
  }
}
.resize {
  top: 0;
  width: $col-resize-width;
  right: -$col-resize-width / 2;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  cursor: col-resize;
  .middle-line {
    transition: all 0.3s ease;
    scale: 0;
  }
  i {
    opacity: 0.2;
    transition: all 0.3s ease;
  }
  &:hover,
  &.panning {
    i {
      opacity: 1;
      text-shadow: 3px 3px 8px #00000080;
      &:first-of-type {
        animation: backandforthleft 0.5s ease infinite alternate;
      }
      &:nth-of-type(2) {
        animation: backandforthright 0.5s ease infinite alternate;
      }
    }
    .middle-line {
      margin-left: auto;
      margin-right: auto;
      height: 100%;
      width: 2px;
      background: currentColor;
      border-radius: 1px;
      scale: 1;
    }
  }
}
</style>
