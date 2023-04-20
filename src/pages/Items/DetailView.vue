<template>
  <FullHeightPage hide-back-button padding :fit="$q.screen.gt.sm">
    <Form
      ref="formRef"
      class="full-height"
      :validation-schema="validator"
      :initial-values="initialData"
      @submit="submit($event as ItemInRequest)"
    >
      <AdaptiveCard back-button padding style="max-width: 650px">
        <template #title-sticky>
          <div class="text-h6" :class="{ 'text-positive': props.id }">
            {{
              props.id
                ? $t('forms.titles.item_update')
                : $t('forms.titles.item_creation')
            }}
          </div>
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
                    :is="getComponent(hiddenFormComponents.get('buycurrency')!)"
                    v-if="hiddenFormComponents.has('buycurrency')"
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
                    :is="getComponent(hiddenFormComponents.get('sellcurrency')!)"
                    v-if="formComponents"
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
import { useQuasar } from 'quasar';
import { Form } from 'vee-validate';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { api } from 'boot/axios';
import { $t } from 'boot/i18n';
import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import FullHeightPage from 'components/Page/FullHeightPage.vue';
import DynamicForm from 'components/VeeDynamicForm/DynamicForm.vue';
import { ItemDetail, ItemInRequest } from 'src/client';
import { create_form } from 'src/composables/openapihelpers';
import { RouteLocationNormalizedLoadedExtended } from 'src/router/routes';

import { parseDRFErrors } from '../../components/VeeDynamicForm/drfErrorToYup';

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

const $q = useQuasar();
const route = useRoute() as RouteLocationNormalizedLoadedExtended;
const router = useRouter();
const formRef = ref<InstanceType<typeof Form>>();

function submit(event: ItemInRequest) {
  if (props.id) {
    api.inventory
      .inventoryItemUpdate({ id: +props.id, requestBody: event })
      .then(() => {
        $q.notify({
          icon: 'conveyor_belt',
          message: $t('notifications.updated_successfully'),
          color: 'positive',
        });
      })
      .catch((reason) => {
        const errors = parseDRFErrors(reason);
        if (errors) {
          formRef.value?.setErrors(errors);
        }
        $q.notify({
          position: 'bottom-right',
          closeBtn: 'Kapat',
          icon: 'error',
          message: $t('notifications.request_failed'),
          color: 'negative',
          caption: JSON.stringify(reason),
        });
      });
  } else {
    api.inventory
      .inventoryItemCreate({ requestBody: event })
      .then(() => {
        $q.notify({
          icon: 'conveyor_belt',
          message: $t('notifications.created_successfully'),
          color: 'positive',
        });
        if (route.meta.createdSuccessRedirect) {
          router.push(route.meta.createdSuccessRedirect);
        }
      })
      .catch((reason) => {
        const errors = parseDRFErrors(reason);
        if (errors) {
          formRef.value?.setErrors(errors);
        }
        $q.notify({
          position: 'bottom-right',
          closeBtn: true,
          icon: 'error',
          message: $t('notifications.request_failed'),
          color: 'negative',
          caption: JSON.stringify(reason, undefined, 4),
        });
      });
  }
}
</script>

<style scoped></style>
