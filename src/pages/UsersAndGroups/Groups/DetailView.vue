<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      create-path="/user/groups/"
      update-retrieve-destroy-path="/user/groups/{id}/"
      :query="id ? { id } : undefined"
      :create-redirect="{ name: 'group-list' }"
      :delete-redirect="{ name: 'group-list' }"
      :create-title="$t('forms.titles.create_user_group')"
      :update-title="$t('forms.titles.update_user_group')"
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
