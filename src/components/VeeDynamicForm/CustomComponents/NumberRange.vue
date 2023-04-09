<template>
  <div>
    <div class="text-bold text-center q-pt-xs">{{ label }}</div>
    <div class="row q-gutter-sm hide-number-spin-buttons">
      <div class="col">
        <NumberInput
          @blur="lowerRangeBlur"
          ref="lowerRangeRef"
          :label="leftLabel"
          name="rangeLow"
          :standout="standout"
          :highlight="highlight"
          focus-on-highlight
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
import { onMounted, ref, toRef, watch } from 'vue';

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
    inputFunc?: (range: unknown) => [string | undefined, string | undefined];
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
    inputFunc: (range: unknown) => {
      if (range !== undefined) {
        let low: string | undefined;
        let high: string | undefined;
        [low, high] = (range as string).split(',');
        if (low.trim() === '0') {
          low = undefined;
        }
        if (high.trim() === '2147483647') {
          high = undefined;
        }
        return [low, high] as [string | undefined, string | undefined];
      } else {
        return [undefined, undefined] as [undefined, undefined];
      }
    },
  }
);

const { setValue, value } = useField(toRef(props, 'name'));

function valueToRanges(value: unknown) {
  const [low, high] = props.inputFunc(value);
  rangeLow.value = low;
  rangeHigh.value = high;
}

onMounted(() => {
  valueToRanges(value.value);
});

watch(
  value,
  () => {
    valueToRanges(value.value);
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

watch(
  () => [rangeLow.value, rangeHigh.value],
  (newrange) => {
    if (newrange[0] !== undefined && newrange[1] === undefined) {
      setValue(props.outputFunc(newrange[0], newrange[1]));
    } else if (newrange[0] === undefined && newrange[1] !== undefined) {
      setValue(props.outputFunc(newrange[0], newrange[1]));
    } else if (newrange[0] !== undefined && newrange[1] !== undefined) {
      setValue(props.outputFunc(newrange[0], newrange[1]));
    } else {
      setValue(props.outputFunc(newrange[0], newrange[1]));
    }
  }
);

// watchEffect(() => {
//   if (rangeLow.value !== undefined && rangeHigh.value === undefined) {
//     setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
//   } else if (rangeLow.value === undefined && rangeHigh.value !== undefined) {
//     setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
//   } else if (rangeLow.value !== undefined && rangeHigh.value !== undefined) {
//     setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
//   } else {
//     setValue(props.outputFunc(rangeLow.value, rangeHigh.value));
//   }
// });
</script>

<style scoped></style>
