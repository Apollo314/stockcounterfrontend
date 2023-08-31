<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <AutoCrud
      ref="autoCrudRef"
      style="max-width: 650px"
      create-path="/inventory/item/"
      update-retrieve-destroy-path="/inventory/item/{id}/"
      :query="id ? { id } : undefined"
      :hidden-fields="['buycurrency', 'sellcurrency']"
      :create-redirect="{ name: 'items-list' }"
      :delete-redirect="{ name: 'items-list' }"
    >
      <template #buyprice="{ getComponent, formComponent, getProps }">
        <div class="row">
          <div class="col">
            <component
              :is="getComponent(formComponent)"
              v-bind="getProps(formComponent)"
              name="buyprice"
            ></component>
          </div>
          <div class="col-shrink q-pl-sm">
            <component
              :is="getComponent(autoCrudRef?.hiddenFormComponents.get('buycurrency')!)"
              v-if="autoCrudRef?.hiddenFormComponents?.has('buycurrency')"
              v-bind="getProps(autoCrudRef?.hiddenFormComponents.get('buycurrency')!)"
              name="buycurrency"
              style="width: 160px"
            ></component>
          </div>
        </div>
      </template>
      <template #sellprice="{ getComponent, formComponent, getProps }">
        <div class="row">
          <div class="col">
            <component
              :is="getComponent(formComponent)"
              v-bind="getProps(formComponent)"
              name="sellprice"
            ></component>
          </div>
          <div class="q-pl-sm" style="flex-grow: 0; flex-shrink: 0">
            <component
              :is="getComponent(autoCrudRef?.hiddenFormComponents?.get('sellcurrency')!)"
              v-if="autoCrudRef?.hiddenFormComponents?.has('sellcurrency')"
              v-bind="getProps(autoCrudRef?.hiddenFormComponents?.get('sellcurrency')!)"
              name="sellcurrency"
              style="width: 160px"
            ></component>
          </div>
        </div>
      </template>
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
