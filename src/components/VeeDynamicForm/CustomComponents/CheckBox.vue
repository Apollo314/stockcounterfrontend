<template>
  <q-checkbox
    :toggle-indeterminate="toggleIndeterminate"
    :left-label="leftLabel"
    v-model="value"
    :name="name"
    :error="!!errorMessage"
    :error-message="errorMessage"
  >
    <template #default>
      <div
        class="text-bold q-pa-xs"
        style="border-radius: 5px"
        :class="{ 'bg-primary': highlight }"
      >
        {{ label }}
      </div>
    </template>
  </q-checkbox>
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
    highlight?: boolean;
  }>(),
  { toggleIndeterminate: false, default: undefined }
);

const { value, errorMessage } = useField(toRef(props, 'name'), undefined, {
  initialValue: toRef(props, 'default'),
});
</script>

<style scoped></style>
