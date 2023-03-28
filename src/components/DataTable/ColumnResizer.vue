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
import { inject, Ref, ref } from 'vue';

import { TouchPanEvent } from 'src/types/quasarmissingtypes';

type FakeColumn = {
  id: number | string;
};

type FakeColumnWidths = {
  [key: string | number]: number;
};

const props = defineProps<{
  column: FakeColumn;
}>();

const resizerRef = ref<HTMLElement>();
const panning = ref<boolean>(false);

const columnWidths = inject<Ref<FakeColumnWidths>>('columnWidths', ref({}));

function panHandler(evt: TouchPanEvent) {
  if (evt.isFirst) {
    panning.value = true;
    columnWidths.value[props.column.id] =
      (resizerRef.value?.parentElement?.offsetWidth || 0) + evt.delta.x;
  } else {
    columnWidths.value[props.column.id] =
      evt.delta.x + columnWidths.value[props.column.id];
  }
  if (evt.isFinal) {
    panning.value = false;
  }
}
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
