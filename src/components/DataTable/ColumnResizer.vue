<template>
  <div
    ref="resizerRef"
    v-touch-pan.prevent.mouse="panHandler"
    class="resize"
    style="
      top: 0;
      width: 20px;
      right: -10px;
      position: absolute;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;
      cursor: col-resize;
    "
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
    <div class="panhover"></div>
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

const columnWidths = inject<Ref<FakeColumnWidths>>('columnWidths', ref({}));

function panHandler(evt: TouchPanEvent) {
  if (evt.isFirst) {
    columnWidths.value[props.column.id] =
      (resizerRef.value?.parentElement?.offsetWidth || 0) + evt.delta.x;
  } else {
    columnWidths.value[props.column.id] =
      evt.delta.x + columnWidths.value[props.column.id];
  }
}
</script>

<style scoped></style>
