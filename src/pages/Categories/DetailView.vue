<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      style="max-width: 650px"
      create-path="/inventory/category/"
      update-retrieve-destroy-path="/inventory/category/{name}/"
      :query="name ? { name } : undefined"
      :create-redirect="{ name: 'category-list' }"
      :delete-redirect="{ name: 'category-list' }"
    >
    </AutoCrud>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FullHeightPage from 'components/Page/FullHeightPage.vue';
import AutoCrud from 'components/VeeDynamicForm/AutoCrud/AutoCrud.vue';

defineProps<{
  name?: string;
}>();

const autoCrudRef = ref<InstanceType<typeof AutoCrud>>();
</script>

<style scoped></style>
