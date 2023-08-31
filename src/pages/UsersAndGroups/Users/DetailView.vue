<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      style="max-width: 650px"
      create-path="/user/accounts/"
      update-retrieve-destroy-path="/user/accounts/{id}/"
      :query="id ? { id } : undefined"
      :create-redirect="{ name: 'user-account-list' }"
      :delete-redirect="{ name: 'user-account-list' }"
      :create-title="$t('forms.titles.create_user_account')"
      :update-title="$t('forms.titles.update_user_account')"
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
