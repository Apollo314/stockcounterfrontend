<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      create-path="/payments/payment-accounts/"
      update-retrieve-destroy-path="/payments/payment-accounts/{id}/"
      :query="id ? { id } : undefined"
      :create-redirect="{ name: 'payment-accounts-list' }"
      :delete-redirect="{ name: 'payment-accounts-list' }"
    >
      <template #stakeholder="{ getComponent, formComponent, getProps }">
        <component
          :is="getComponent(formComponent)"
          v-bind="getProps(formComponent)"
          name="stakeholder"
        ></component>
      </template>
    </AutoCrud>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue';

import FullHeightPage from 'components/Page/FullHeightPage.vue';
import AutoCrud from 'components/VeeDynamicForm/AutoCrud/AutoCrud.vue';

import { api } from '../../../boot/axios';
import { NestedRecord } from '../../../composables/openapihelpers';

const props = defineProps<{
  id?: string;
  stakeholderId?: string;
}>();

const autoCrudRef = ref<InstanceType<typeof AutoCrud>>();

onActivated(() => {
  if (props.stakeholderId) {
    api.stakeholder
      .stakeholderStakeholdersRetrieve({
        id: +props.stakeholderId,
      })
      .then((response) => {
        autoCrudRef.value?.setFieldValue(
          'stakeholder',
          response as NestedRecord
        );
      });
  }
});
</script>

<style scoped></style>
