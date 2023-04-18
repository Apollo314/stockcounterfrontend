<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <Form class="full-height" :validation-schema="validator">
      <AdaptiveCard class="q-pa-md" style="max-width: 650px">
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
        <template #action-bottom>
          <div class="row q-pt-md full-width justify-end">
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

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import FullHeightPage from 'components/Page/FullHeightPage.vue';
import DynamicForm from 'components/VeeDynamicForm/DynamicForm.vue';
import { create_form } from 'src/composables/openapihelpers';

const { formComponents, hiddenFormComponents, validator } = create_form(
  'ItemInRequest',
  ['buycurrency', 'sellcurrency']
);
</script>

<style scoped></style>
