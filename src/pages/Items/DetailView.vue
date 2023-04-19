<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <Form
      class="full-height"
      :validation-schema="validator"
      :initial-values="initialData"
      @submit="submit($event as ItemInRequest)"
    >
      <AdaptiveCard back-button padding style="max-width: 650px">
        <template #title-sticky>
          <div class="text-h6">Item Creation Form</div>
        </template>
        <div class="q-px-md">
          <DynamicForm :form-components="formComponents">
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
                    v-if="hiddenFormComponents.has('buycurrency')"
                    :is="getComponent(hiddenFormComponents.get('buycurrency')!)"
                    v-bind="getProps(hiddenFormComponents.get('buycurrency')!)"
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
                    v-if="formComponents"
                    :is="getComponent(hiddenFormComponents.get('sellcurrency')!)"
                    v-bind="getProps(hiddenFormComponents.get('sellcurrency')!)"
                    name="sellcurrency"
                    style="width: 160px"
                  ></component>
                </div>
              </div>
            </template>
          </DynamicForm>
        </div>
        <template #action-bottom>
          <div class="row full-width justify-end q-pa-sm">
            <q-btn-group>
              <q-btn
                color="negative"
                icon="clear"
                :label="$t('commons.cancel')"
                type="reset"
              />
              <q-btn
                color="primary"
                icon="save"
                :label="$t('commons.ok')"
                type="submit"
              />
            </q-btn-group>
          </div>
        </template>
      </AdaptiveCard>
    </Form>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { onBeforeMount, ref } from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import FullHeightPage from 'components/Page/FullHeightPage.vue';
import DynamicForm from 'components/VeeDynamicForm/DynamicForm.vue';
import { create_form } from 'src/composables/openapihelpers';

import { api } from '../../boot/axios';
import { ItemDetail, ItemInRequest } from '../../client';

const props = defineProps<{
  id?: string;
}>();

onBeforeMount(() => {
  if (props.id) {
    api.inventory.inventoryItemRetrieve({ id: +props.id }).then((result) => {
      initialData.value = result;
    });
  }
});

const initialData = ref<ItemDetail>();

const { formComponents, hiddenFormComponents, validator } = create_form(
  'ItemInRequest',
  ['buycurrency', 'sellcurrency']
);

function submit(event: ItemInRequest) {
  if (props.id) {
    api.inventory.inventoryItemUpdate({ id: +props.id, requestBody: event });
  } else {
    api.inventory.inventoryItemCreate({ requestBody: event });
  }
}
</script>

<style scoped></style>
