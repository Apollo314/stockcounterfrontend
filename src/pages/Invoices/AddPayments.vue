<template>
  <Form ref="formRef" :validation-schema="validator" @submit="onSubmit($event)">
    <DynamicForm :form-components="formComponents">
      <template #payer>
        <SearchSelector
          name="payer"
          :query-service="queryService"
          :option-label="optionLabel"
          :extra-params="payerParams"
          :label="getProps(formComponents?.get('payer')).label"
        />
      </template>
      <template #receiver>
        <SearchSelector
          name="receiver"
          :query-service="queryService"
          :option-label="optionLabel"
          :extra-params="receiverParams"
          :label="getProps(formComponents?.get('receiver')).label"
        />
      </template>
      <template #due_date>
        <DateField
          v-bind="getProps(formComponents?.get('due_date'))"
          name="due_date"
        ></DateField>
      </template>
    </DynamicForm>
    <div class="row justify-end q-gutter-sm">
      <q-btn
        v-close-popup
        class="q-mt-md"
        push
        color="negative"
        type="reset"
        icon="close"
        no-caps
        :label="$t('commons.cancel')"
      />
      <q-btn
        class="q-mt-md"
        push
        color="positive"
        icon="add"
        type="submit"
        no-caps
        :label="$t('commons.ok')"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { Form } from 'vee-validate';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { api } from 'src/boot/axios';
import {
  InvoiceDetailOut,
  InvoicePayment,
  InvoicePaymentRequest,
  PaymentAccountOut,
  PaymentRequest,
} from 'src/client';
import {
  getProps,
  queryServiceFactory,
} from 'src/components/VeeDynamicForm/componentMap';
import DateField from 'src/components/VeeDynamicForm/CustomComponents/DateField.vue';
import SearchSelector from 'src/components/VeeDynamicForm/CustomComponents/SearchSelector.vue';
import { parseDRFErrors } from 'src/components/VeeDynamicForm/drfErrorToYup';
import DynamicForm from 'src/components/VeeDynamicForm/DynamicForm.vue';
import { create_form } from 'src/composables/openapihelpers';

const props = defineProps<{ invoice: InvoiceDetailOut; popup: boolean }>();

const emit = defineEmits<{
  (e: 'newPayment', value: InvoicePayment): void;
  (e: 'update:popup', value: boolean): void;
}>();

const { formComponents, validator } = create_form('PaymentRequest', [], true);
const formRef = ref<InstanceType<typeof Form>>();
const $q = useQuasar();

const { t: $t } = useI18n();

const queryService = queryServiceFactory(
  'payments',
  'paymentsPaymentAccountsList'
);
const optionLabel = (option: PaymentAccountOut) => option.name;

const payerParams = computed(() => {
  if (
    props.invoice.invoice_type === 'sale' ||
    props.invoice.invoice_type === 'refund-purchase'
  ) {
    return { stakeholder: props.invoice.stakeholder.id };
  } else {
    return { stakeholderIsnull: true };
  }
});

const receiverParams = computed(() => {
  if (
    props.invoice.invoice_type === 'sale' ||
    props.invoice.invoice_type === 'refund-purchase'
  ) {
    return { stakeholderIsnull: true };
  } else {
    return { stakeholder: props.invoice.stakeholder.id };
  }
});

const onSubmit = (values: PaymentRequest) => {
  const payment = values;
  const invoicePayment: InvoicePaymentRequest = {
    invoice: props.invoice.id,
    payment: payment,
  };
  api.payments
    .paymentsInvoicePaymentsCreate({ requestBody: invoicePayment })
    .then((response) => {
      emit('newPayment', response);
      emit('update:popup', false);
    })
    .catch((reason) => {
      const errors = parseDRFErrors(reason);
      if (errors) {
        formRef.value?.setErrors(errors);
      } else {
        $q.notify({
          message: reason.message || $t('notifications.request_failed'),
          caption: JSON.stringify(reason.body) || '',
          color: 'negative',
          actions: [{ label: $t('commons.cancel'), color: 'white' }],
          position: 'bottom-right',
        });
      }
    });
};
</script>

<style scoped></style>
