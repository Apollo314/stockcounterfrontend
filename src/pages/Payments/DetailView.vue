<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      style="max-width: 650px"
      create-path="/inventory/warehouse/"
      update-retrieve-destroy-path="/inventory/warehouse/{id}/"
      :query="id ? { id } : undefined"
      :create-redirect="{ name: 'warehouse-list' }"
      :delete-redirect="{ name: 'warehouse-list' }"
    >
    </AutoCrud>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FullHeightPage from 'components/Page/FullHeightPage.vue';
import AutoCrud from 'components/VeeDynamicForm/AutoCrud/AutoCrud.vue';

defineProps<{
  id?: string;
}>();

const autoCrudRef = ref<InstanceType<typeof AutoCrud>>();
</script>

<style scoped></style>
