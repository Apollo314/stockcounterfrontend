<template>
  <div>
    <div class="text-bold text-center q-pt-xs">{{ label }}</div>
    <div class="row q-gutter-sm hide-number-spin-buttons">
      <div class="col">
        <NumberInput
          @blur="lowerRangeBlur"
          :label="leftLabel"
          name="rangeLow"
          :standout="standout"
          :highlight="highlight"
        />
      </div>
      <q-icon
        name="vertical_align_center"
        size="20px"
        class="self-center rotate-90"
      />
      <div class="col">
        <NumberInput
          @blur="higherRangeBlur"
          :label="rightLabel"
          name="rangeHigh"
          :standout="standout"
          :highlight="highlight"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { watch, watchEffect } from 'vue';

import NumberInput from './NumberInput.vue';

const props = withDefaults(
  defineProps<{
    /**
     * name parameter for useField
     */
    name: string;
    /**
     * string shown on top of the range
     */
    standout?: boolean;
    label?: string;
    leftLabel: string;
    rightLabel: string;
    dense?: boolean;
    /**
     * watch change in value deeply
     */
    watchDeep?: boolean;
    outputFunc?: (lowerValue?: string, higherValue?: string) => unknown;
    highlight?: boolean;
  }>(),
  {
    standout: true,
    outputFunc: (lowerValue, higherValue) => {
      if (lowerValue === undefined && higherValue === undefined) {
        return undefined;
      }
      return `${lowerValue || 0},${higherValue || 2147483647}`;
    },
  }
);

const { setValue, value } = useField(props.name);

watch(
  () => value.value,
  () => {
    if (value.value === undefined) {
      rangeLow.value = undefined;
      rangeHigh.value = undefined;
    }
  },
  { deep: props.watchDeep }
);

const { useFieldModel } = useForm();

const [rangeLow, rangeHigh] = useFieldModel(['rangeLow', 'rangeHigh']);

const lowerRangeBlur = () => {
  if (
    rangeLow.value !== undefined &&
    rangeHigh.value !== undefined &&
    parseFloat(rangeHigh.value) < parseFloat(rangeLow.value)
  ) {
    rangeHigh.value = rangeLow.value;
  }
};

const higherRangeBlur = () => {
  if (
    rangeLow.value !== undefined &&
    rangeHigh.value !== undefined &&
    parseFloat(rangeHigh.value) < parseFloat(rangeLow.value)
  ) {
    rangeLow.value = rangeHigh.value;
  }
};

watchEffect(() => {
  if (rangeLow.value !== undefined && rangeHigh.value === undefined) {
    setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
  } else if (rangeLow.value === undefined && rangeHigh.value !== undefined) {
    setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
  } else if (rangeLow.value !== undefined && rangeHigh.value !== undefined) {
    setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
  } else {
    setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
  }
});
</script>

<style scoped></style>
