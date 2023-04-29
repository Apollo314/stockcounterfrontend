<template>
  <q-btn
    class="editor-menu-item"
    :class="{ 'is-active': isActive ? isActive() : undefined }"
    :title="title"
    :icon="icon"
    :label="label"
    no-caps
    flat
    @click="action()"
  >
  </q-btn>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}>();
</script>

<style lang="scss">
.editor-menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;

  &.is-active,
  &:hover {
    color: #fff;
    background-color: #0d0d0d;
  }
}
</style>
