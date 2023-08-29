<template>
  <ItemsList
    class="bg-orange-7"
    :data="data"
    :title="$t('dashboard.last-items')"
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
