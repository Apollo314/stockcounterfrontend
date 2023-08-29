<template>
  <ItemsList
    style="background: #59cdf2"
    :data="data"
    :title="$t('dashboard.leftover-items')"
  />
</template>

<script setup lang="ts">
import { ItemWidget } from 'src/client';

import ItemsList from './ItemsList.vue';

defineProps<{
  data?: ItemWidget[];
}>();
</script>

<style scoped></style>
