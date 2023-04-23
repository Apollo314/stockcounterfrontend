<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      create-path="/inventory/stock_unit/"
      update-retrieve-destroy-path="/inventory/stock_unit/{name}/"
      :query="name ? { name } : undefined"
      :create-redirect="{ name: 'stockunit-list' }"
      :delete-redirect="{ name: 'stockunit-list' }"
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
