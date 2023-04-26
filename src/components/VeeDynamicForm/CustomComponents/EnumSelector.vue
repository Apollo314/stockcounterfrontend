<template>
  <q-select
    v-model="value"
    :standout="standout"
    tabindex="0"
    :options="options"
    :label="label"
    :label-color="labelColor"
    :error="!!errorMessage"
    :error-message="errorMessage"
    :hide-bottom-space="!errorMessage"
    :clearable="clearable"
    clear-icon="clear"
    :dense="dense"
    :bg-color="highlight ? 'primary' : undefined"
    @input-value="validate()"
    @blur="validate()"
  >
  </q-select>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    options?: string[] | { label: string; value: unknown }[];
    nullable?: boolean;
    default?: unknown;
    label?: string;
    labelColor?: string;
    name: string;
    standout?: string | boolean;
    clearable?: boolean;
    dense?: boolean;
    highlight?: boolean;
    allOf?: Array<{ enum: string[] }>;
  }>(),
  { standout: true }
);

const { value, errorMessage, validate } = useField(
  toRef(props, 'name'),
  undefined,
  {
    initialValue: toRef(props, 'default'),
  }
);

const options = computed(() => {
  if (props.options) {
    return props.options;
  }
  let options: unknown[] = [];
  if (props.allOf) {
    for (const opts of props.allOf) {
      options.push(...opts.enum);
    }
  }
  return options;
});
</script>

<style scoped></style>
