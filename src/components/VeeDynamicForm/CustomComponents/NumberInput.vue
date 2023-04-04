<template>
  <q-input
    ref="inputRef"
    :label="label"
    :standout="standout"
    :model-value="formattedModel"
    @update:model-value="update($event as string | null)"
    type="text"
    inputmode="numeric"
    :error="!!errorMessage"
    :error-message="errorMessage"
    :hide-bottom-space="!errorMessage"
    clearable
    clear-icon="clear"
    :dense="dense"
    :prefix="prefix"
    :suffix="suffix"
    @blur="
      validate();
      $emit('blur');
    "
  >
    <template #after><slot name="after"></slot></template>
    <template #before><slot name="before"></slot></template>
    <template #append><slot name="append"></slot></template>
    <template #prepend><slot name="prepend"></slot></template>
    <template #hint><slot name="hint"></slot></template>
    <template #loading><slot name="loading"></slot></template>
    <template #counter><slot name="counter"></slot></template>
  </q-input>
</template>

<script setup lang="ts">
import { QInput } from 'quasar';
import { useField } from 'vee-validate';
import { computed, nextTick, ref, toRef } from 'vue';
import { useI18n } from 'vue-i18n';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    standout?: string | boolean;
    bordered?: boolean;
    class?: string;
    nullable?: boolean;
    dense?: boolean;
    prefix?: string;
    suffix?: string;
  }>(),
  {
    prefix: undefined,
    suffix: undefined,
    class: '',
    standout: 'bg-teal text-white',
  }
);

defineEmits<{
  (e: 'blur'): void;
}>();

const inputRef = ref<QInput>();

const { n: $n, locale } = useI18n();

const { value, errorMessage, validate } = useField<string | undefined>(
  toRef(props, 'name')
);

const countSeparator = (strnumber: string | undefined, seperator: string) => {
  if (strnumber === undefined) {
    return 0;
  }
  let sum = 0;
  for (const digit of strnumber) {
    if (digit == seperator) {
      sum++;
    }
  }
  return sum;
};

const get_seperators = () => {
  if (locale.value === 'tr') {
    return {
      thousandsSep: '.',
      decimalSep: ',',
    };
  } else {
    return {
      thousandsSep: ',',
      decimalSep: '.',
    };
  }
};

const parseNumber = (strnumber: string) => {
  if (strnumber.length === 0) return NaN;
  const { thousandsSep, decimalSep } = get_seperators();
  let cleaned_number = strnumber.replaceAll(thousandsSep, '');
  cleaned_number = cleaned_number.replace(decimalSep, '.');
  const decimalSepCount = cleaned_number.match(/\./g)?.length || 0;
  if (decimalSepCount > 1) {
    console.log('wopsie daisy');
  } else {
    return parseFloat(cleaned_number);
  }
  return 0;
};

const formattedModel = computed(() => {
  const realnumber = parseFloat(value.value || '');
  if (!Number.isNaN(realnumber)) {
    return $n(realnumber, {
      maximumFractionDigits: 4,
      locale: locale.value === 'tr' ? 'tr' : 'en',
    });
  } else {
    return undefined;
  }
});

const update = (val: string | null) => {
  const { thousandsSep } = get_seperators();
  const inputEl = inputRef.value?.getNativeElement();
  const prevSelectionStart = inputEl?.selectionStart || 0;
  const prevSepCount = countSeparator(formattedModel.value, thousandsSep);
  const realnumber = parseNumber(val || '');
  if (!Number.isNaN(realnumber))
    value.value = $n(realnumber, {
      minimumFractionDigits: 4,
      locale: 'en',
      useGrouping: false,
    });
  else {
    value.value = undefined;
  }
  nextTick(() => {
    const currentSepCount = countSeparator(formattedModel.value, thousandsSep);
    const newSelection = Math.max(
      prevSelectionStart + currentSepCount - prevSepCount,
      1
    );
    inputEl?.setSelectionRange(newSelection, newSelection);
  });
};
</script>
