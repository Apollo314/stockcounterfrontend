<template>
  <div>
    <q-input
      v-model="value"
      :standout="standout"
      :outlined="outlined"
      :type="type"
      :label="label"
      :clearable="clearable"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-bottom-space="!errorMessage"
      clear-icon="clear"
      :dense="dense"
      autocomplete="new-password"
      :bg-color="highlight ? 'primary' : undefined"
      @blur="validate()"
    >
      <template v-if="icon" #prepend>
        <q-icon :name="icon"></q-icon>
      </template>
    </q-input>
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
    icon?: string;
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
