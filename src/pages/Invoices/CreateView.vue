<template>
  <FullHeightPage hide-back-button padding>
    <DynamicForm
      v-if="formComponents"
      :form-components="formComponents"
      :ignored-fields="['buycurrency', 'sellcurrency']"
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
              :is="getComponent(formComponents['buycurrency'])"
              v-bind="getProps(formComponents['buycurrency'])"
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
              :is="getComponent(formComponents['sellcurrency'])"
              v-bind="getProps(formComponents['sellcurrency'])"
              name="sellcurrency"
              style="width: 160px"
            ></component>
          </div>
        </div>
      </template>
    </DynamicForm>
  </FullHeightPage>
</template>

<script setup lang="ts">
import FullHeightPage from '../../components/Page/FullHeightPage.vue';
import DynamicForm from '../../components/VeeDynamicForm/DynamicForm.vue';
import { get_form } from '../../composables/openapihelpers';

const formComponents = get_form('ItemInRequest');
</script>

<style scoped></style>
