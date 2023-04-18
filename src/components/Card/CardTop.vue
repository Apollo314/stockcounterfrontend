<template>
  <div class="grid full-width q-pa-sm">
    <div v-if="backButton" class="backbutton">
      <BackButton class="q-mr-sm"></BackButton>
    </div>
    <div class="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from '../Commons/BackButton.vue';

defineProps<{
  backButton?: boolean;
}>();
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  .backbutton {
    width: max-content;
    grid-column: 1/1;
  }
  .title {
    grid-column: 2 / span 1;
  }
}
</style>
