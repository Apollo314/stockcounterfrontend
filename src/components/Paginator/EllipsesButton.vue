<template>
  <div style="display: inline-block">
    <q-btn
      v-if="!showInput"
      flat
      dense
      style="padding: 3px 2px; min-width: 2em; min-height: 0px"
      :color="color"
      label="..."
      @click="showInput = true"
    />
    <q-input
      v-else
      style="min-width: 2em"
      :style="{ width: `${page.toString().length / 1.5}em` }"
      class="inline pagination-ellipses"
      input-style="padding: 0px;"
      ref="inputRef"
      borderless
      dense
      type="number"
      v-model="localPage"
      autofocus
      :placeholder="initialPage"
      @blur="(evt: any) => {updatePage()}"
      @keydown.enter="updatePage"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref, watch } from 'vue';

const props = defineProps<{
  page: number;
  initialPage: number;
}>();

const emit = defineEmits<{
  (e: 'update:page', value: number): void;
}>();

const color = inject<string>('color');

const localPage: Ref<string | number> = ref('');
const inputRef = ref();

watch(
  () => props.page,
  (val) => {
    localPage.value = val;
  }
);

const showInput = ref(false);

const updatePage = () => {
  emit('update:page', +localPage.value || props.initialPage);
  showInput.value = false;
};
</script>

<style lang="scss">
.pagination-ellipses {
  .q-field__control {
    height: initial !important;
  }
  input[type='number'] {
    align-self: center;
    text-align: center;
    appearance: textfield;
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
