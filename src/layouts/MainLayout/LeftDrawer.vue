<template>
  <q-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    show-if-above
    bordered
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();
</script>

<style scoped></style>
