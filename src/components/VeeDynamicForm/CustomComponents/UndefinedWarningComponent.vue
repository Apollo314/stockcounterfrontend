<template>
  <div>
    <div class="bg-negative">I am undefined, please, define me.</div>
    <div class="bg-negative">{{ props }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  name: string;
}>();
</script>

<style scoped></style>
