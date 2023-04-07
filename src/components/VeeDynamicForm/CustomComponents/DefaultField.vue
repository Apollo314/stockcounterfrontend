<template>
  <div>
    <q-input
      :standout="standout"
      :outlined="outlined"
      v-model="value"
      :type="type"
      :label="label"
      @blur="validate()"
      :clearable="clearable"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-bottom-space="!errorMessage"
      clear-icon="clear"
      :dense="dense"
      autocomplete="new-password"
      :bg-color="highlight ? 'primary' : undefined"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    standout?: string | boolean;
    outlined?: boolean;
    clearable?: boolean;
    dense?: boolean;
    highlight?: boolean;
    type?:
      | 'number'
      | 'text'
      | 'search'
      | 'password'
      | 'textarea'
      | 'email'
      | 'tel'
      | 'file'
      | 'url'
      | 'time'
      | 'date';
  }>(),
  {
    type: 'text',
    standout: true,
    clearable: true,
  }
);

const { value, validate, errorMessage } = useField<string>(
  toRef(props, 'name')
);
</script>

<style scoped></style>
