<template>
  <div>
    <div class="text-bold text-center q-pt-xs">{{ title }}</div>
    <div class="row q-gutter-sm hide-number-spin-buttons">
      <div class="col">
        <NumberInput
          @blur="lowerRangeBlur"
          :label="leftLabel"
          name="rangeLow"
        />
      </div>
      <div
        class="col-shrink self-center"
        style="
          border-bottom: 1px solid currentColor;
          padding-top: 8px;
          width: 5px;
          height: 0;
        "
      ></div>
      <div class="col">
        <NumberInput
          @blur="higherRangeBlur"
          :label="rightLabel"
          name="rangeHigh"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { watchEffect } from 'vue';

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
    title?: string;
    leftLabel: string;
    rightLabel: string;
    dense?: boolean;
    outputFunc?: (lowerValue?: string, higherValue?: string) => unknown;
  }>(),
  {
    outputFunc: (lowerValue, higherValue) =>
      `${lowerValue || 0},${higherValue || 2147483647}`,
  }
);

const { setValue } = useField(props.name);

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
