<template>
  <FullHeightPage padding :fit="$q.screen.gt.sm">
    <div class="fit" style="display: flex; flex-direction: column">
      <div class="q-pb-sm">
        <BackButton></BackButton>
      </div>
      <form
        class="full-height"
        @submit.prevent="handleSubmit(submissionHandler)()"
      >
        <q-stepper
          ref="stepper"
          v-model="step"
          class="compact-scrollbar"
          keep-alive
          color="primary"
          animated
          header-nav
          alternative-labels
        >
          <q-step
            name="general-information"
            :title="$t('invoice_labels.tabs.general-information')"
            icon="person"
            :error="stepErros.GeneralInformationStep"
          >
            <GeneralInformationStep
              :form-components="formComponents"
            ></GeneralInformationStep>
          </q-step>
          <q-step
            name="items"
            :title="$t('invoice_labels.tabs.items')"
            icon="create_new_folder"
            :error="shownSteps.InvoiceItemsStep && stepErros.InvoiceItemsStep"
          >
            <InvoiceItemsStep
              v-model:shown="shownSteps.InvoiceItemsStep"
              :form-components="formComponents"
            >
            </InvoiceItemsStep>
          </q-step>
          <q-step
            v-if="id"
            name="payments"
            :title="$t('invoice_labels.tabs.payments')"
            icon="attach_money"
            :error="shownSteps.InvoiceItemsStep && stepErros.InvoiceItemsStep"
          >
            <AddPaymentsStep
              v-if="id"
              :invoice="initialValues as InvoiceDetailOut"
            />
          </q-step>
          <q-step
            name="conditions"
            :title="$t('invoice_labels.tabs.conditions')"
            class="full-height-step"
            icon="rule"
            :error="stepErros.InvoiceConditionsStep"
          >
            <InvoiceConditionsStep
              class="fit"
              :form-components="formComponents"
            ></InvoiceConditionsStep>
          </q-step>
          <template #navigation>
            <q-stepper-navigation>
              <div class="row full-width justify-around">
                <div class="col-shrink" style="width: 100px">
                  <q-btn
                    v-if="step !== 'general-information'"
                    flat
                    no-caps
                    color="primary"
                    :label="$t('buttons.back')"
                    style="width: 100px"
                    class="q-ml-sm"
                    @click="stepper.previous()"
                  />
                </div>
                <div class="col-shrink" style="width: 100px">
                  <q-btn
                    v-if="step === 'conditions'"
                    no-caps
                    color="positive"
                    type="submit"
                    style="width: 100px"
                    :label="$t('commons.ok')"
                  />
                  <q-btn
                    v-else
                    no-caps
                    color="primary"
                    style="width: 100px"
                    label=">"
                    @click="stepper.next()"
                  />
                </div>
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <Field type="hidden" name="invoice_type" />
      </form>
    </div>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { Field, useField, useForm } from 'vee-validate';
import { provide, ref, toRef, reactive, onActivated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import FullHeightPage from 'components/Page/FullHeightPage.vue';
import { api } from 'src/boot/axios';
import { InvoiceDetailInRequest, InvoiceDetailOut } from 'src/client';
import { parseDRFErrors } from 'src/components/VeeDynamicForm/drfErrorToYup';
import { create_form } from 'src/composables/openapihelpers';

import BackButton from '../../components/Commons/BackButton.vue';

import AddPaymentsStep from './AddPaymentsStep.vue';
import GeneralInformationStep from './GeneralInformationStep.vue';
import InvoiceConditionsStep from './InvoiceConditionsStep.vue';
import InvoiceItemsStep from './InvoiceItemsStep.vue';

const { formComponents, validator } = create_form(
  'InvoiceDetailInRequest',
  ['invoice_type'],
  true
);

export type FormComponents = typeof formComponents;

const initialValues = ref<Partial<InvoiceDetailInRequest | InvoiceDetailOut>>(
  {}
);

const props = defineProps<{
  id?: string | number;
  invoiceType?: 'sale' | 'purchase' | 'refund-purchase' | 'refund-sale';
}>();

const stepErros = reactive({
  GeneralInformationStep: false,
  InvoiceItemsStep: false,
  InvoiceConditionsStep: false,
});

const shownSteps = ref({
  GeneralInformationStep: false,
  InvoiceItemsStep: false,
  InvoiceConditionsStep: false,
  PaymentsStep: false,
});

const {
  values,
  errors,
  setFieldValue,
  setErrors,
  validate: validateForm,
  validateField,
  handleSubmit,
  useFieldModel,
  resetForm,
} = useForm<InvoiceDetailInRequest | InvoiceDetailOut>({
  validationSchema: validator,
  initialValues: initialValues,
});

export type UseFieldModel = typeof useFieldModel;
export type ValidateField = typeof validateField;
export type SetFieldValue = typeof setFieldValue;

// otherwise they remain empty
useField('items');
useField('invoice_conditions');

const step = ref('general-information');
const stepper = ref();
const invoiceType = toRef(props, 'invoiceType');
export type TypeOfInvoiceType = typeof invoiceType;

initialValues.value.invoice_type = invoiceType.value;

const stepFieldMap = {
  GeneralInformationStep: [
    'name',
    'description',
    'last_payment_date',
    'currency',
    'currency_exchange_rate',
    'stakeholder',
    'warehouse',
  ],
  InvoiceItemsStep: ['items'],
  InvoiceConditionsStep: ['invoice_conditions'],
};

const getBase = (str: string) => {
  if (str.includes('[')) {
    str = str.slice(0, str.indexOf('['));
  }
  if (str.includes('.')) {
    str = str.slice(0, str.indexOf('.'));
  }
  return str;
};

const checkStepErrors = (
  step: 'GeneralInformationStep' | 'InvoiceItemsStep' | 'InvoiceConditionsStep'
) => {
  const errorKeys = Object.keys(errors.value).map(getBase);
  stepErros[step] = false;
  const fields = stepFieldMap[step];
  for (const error of errorKeys) {
    if (fields.includes(error)) {
      stepErros[step] = true;
    }
  }
};
export type CheckStepErrors = typeof checkStepErrors;

const loading = ref(false);

onActivated(() => {
  if (props.id) {
    api.invoice
      .invoiceInvoiceRetrieve({
        id: +props.id,
      })
      .then((value) => {
        initialValues.value = value;
        loading.value = false;
      });
  }
});

const $q = useQuasar();
const { t: $t } = useI18n();
const router = useRouter();

const getListRouteName = () => {
  switch (props.invoiceType || values.invoice_type) {
    case 'purchase':
      return 'purchase-invoice-list';
    case 'sale':
      return 'sale-invoice-list';
    case 'refund-purchase':
      return 'refund-purchase-invoice-list';
    case 'refund-sale':
      return 'refund-sale-invoice-list';
    default:
      return undefined;
  }
};

const submit = (payload: InvoiceDetailInRequest, done: () => void) => {
  if (!props.id) {
    api.invoice
      .invoiceInvoiceCreate({ requestBody: payload as InvoiceDetailInRequest })
      .then((value) => {
        $q.notify({
          message: $t('notifications.created_successfully'),
          caption: value.name,
          actions: [{ label: $t('commons.cancel') }],
          position: 'bottom-right',
        });
        const list_route_name = getListRouteName();
        if (list_route_name) {
          router.push({ name: list_route_name });
        }
      })
      .catch((reason) => {
        const errors = parseDRFErrors(reason);
        if (errors) {
          setErrors(errors);
        } else {
          $q.notify({
            message: reason.message || $t('notifications.request_failed'),
            caption: JSON.stringify(reason.body) || '',
            color: 'negative',
            actions: [{ label: $t('commons.cancel'), color: 'white' }],
            position: 'bottom-right',
          });
        }
      })
      .finally(() => {
        resetForm();
        done();
      });
  } else {
    api.invoice
      .invoiceInvoiceUpdate({
        id: +props.id,
        requestBody: payload as InvoiceDetailInRequest,
      })
      .then((value) => {
        $q.notify({
          message: $t('notifications.updated_successfully'),
          caption: value.name,
          actions: [{ label: $t('commons.cancel') }],
          position: 'bottom-right',
        });
        const list_route_name = getListRouteName();
        if (list_route_name) {
          router.push({ name: list_route_name });
        }
      })
      .catch((reason) => {
        const errors = parseDRFErrors(reason);
        if (errors) {
          setErrors(errors);
        } else {
          $q.notify({
            message: reason.message || $t('notifications.request_failed'),
            caption: JSON.stringify(reason.body) || '',
            color: 'negative',
            actions: [{ label: $t('commons.cancel'), color: 'white' }],
            position: 'bottom-right',
          });
        }
      })
      .finally(() => {
        done();
      });
  }
};

const submissionHandler = async (
  payload: InvoiceDetailInRequest | InvoiceDetailOut
) => {
  await new Promise((resolve) => {
    const done = () => {
      resolve(null);
    };
    submit(payload as InvoiceDetailInRequest, done);
  });
};

provide('values', values);
provide('validateForm', validateForm);
provide('validateField', validateField);
provide('checkStepErrors', checkStepErrors);
provide('errors', errors);
provide('invoiceType', invoiceType);
provide('setFieldValue', setFieldValue);
provide('useFieldModel', useFieldModel);
</script>

<style lang="scss">
.full-height-step {
  .q-stepper__step-content {
    height: 100%;

    .q-stepper__step-inner {
      height: 100%;
    }
  }
}
</style>
