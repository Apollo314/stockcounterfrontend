<template>
  <q-checkbox
    :toggle-indeterminate="toggleIndeterminate"
    :left-label="leftLabel"
    :label="label"
    v-model="value"
    :name="name"
    :error="!!errorMessage"
    :error-message="errorMessage"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    toggleIndeterminate?: boolean;
    leftLabel?: boolean;
    dense?: boolean;
    default?: boolean | undefined;
  }>(),
  { toggleIndeterminate: false, default: undefined }
);

const { value, errorMessage } = useField(toRef(props, 'name'), undefined, {
  initialValue: toRef(props, 'default'),
});
</script>

<style scoped></style>
