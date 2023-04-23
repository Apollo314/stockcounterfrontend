<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      create-path="/stakeholder/customers/"
      update-retrieve-destroy-path="/stakeholder/customers/{id}/"
      :query="id ? { id } : undefined"
      :create-redirect="{ name: 'customer-list' }"
      :delete-redirect="{ name: 'customer-list' }"
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
