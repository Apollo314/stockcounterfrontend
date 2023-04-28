<template>
  <section v-if="formComponents !== undefined">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col col-xs-12 col-md-6">
        <DefaultField
          v-bind="getProps(formComponents.get('name'))"
          name="name"
          class="q-mb-md"
        ></DefaultField>
        <DefaultField
          v-bind="getProps(formComponents.get('description'))"
          name="description"
          type="textarea"
        ></DefaultField>
      </div>
      <div class="col col-xs-12 col-md-6">
        <div class="column full-height justify-between">
          <div class="col q-pb-md">
            <DateField
              v-bind="getProps(formComponents.get('last_payment_date'))"
              name="last_payment_date"
            ></DateField>
          </div>
          <div class="col-shrink">
            <div class="row q-col-gutter-md">
              <div class="col">
                <EnumSelector
                  v-bind="getProps(formComponents?.get('currency'))"
                  name="currency"
                ></EnumSelector>
              </div>
              <div class="col">
                <NumberInput
                  name="currency_exchange_rate"
                  v-bind="
                    getProps(formComponents.get('currency_exchange_rate'))
                  "
                >
                </NumberInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col col-xs-12 col-md-6">
        <SearchSelector
          name="stakeholder"
          :query-service="getStakeholderQueryService()"
          :label="getStakeholderLabel()"
          :option-label="stakeholderOption"
        ></SearchSelector>
      </div>
      <div class="col col-xs-12 col-md-6">
        <SearchSelector
          v-bind="warehouseProps"
          name="warehouse"
        ></SearchSelector>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, inject, onDeactivated } from 'vue';

import { $t } from 'boot/i18n';
import {
  getProps,
  queryServiceFactory,
  QueryService,
} from 'components/VeeDynamicForm/componentMap';
import NumberInput from 'components/VeeDynamicForm/CustomComponents/NumberInput.vue';
import DateField from 'src/components/VeeDynamicForm/CustomComponents/DateField.vue';
import DefaultField from 'src/components/VeeDynamicForm/CustomComponents/DefaultField.vue';
import EnumSelector from 'src/components/VeeDynamicForm/CustomComponents/EnumSelector.vue';
import SearchSelector from 'src/components/VeeDynamicForm/CustomComponents/SearchSelector.vue';
import { NestedRecord } from 'src/composables/openapihelpers';

import type {
  CheckStepErrors,
  FormComponents,
  ValidateField,
  TypeOfInvoiceType,
} from './DetailView.vue';

const props = defineProps<{
  formComponents: FormComponents;
}>();

const invoice_type = inject<TypeOfInvoiceType>('invoiceType');
const validateField = inject<ValidateField>('validateField');

function getStakeholderQueryService() {
  if (
    invoice_type?.value === 'purchase' ||
    invoice_type?.value === 'refund-purchase'
  ) {
    return queryServiceFactory('stakeholder', 'stakeholderSuppliersList');
  } else {
    return queryServiceFactory('stakeholder', 'stakeholderCustomersList');
  }
}

function getStakeholderLabel() {
  if (
    invoice_type?.value === 'purchase' ||
    invoice_type?.value === 'refund-purchase'
  ) {
    return $t('invoice_labels.supplier');
  } else {
    return $t('invoice_labels.customer');
  }
}

function stakeholderOption(option: NestedRecord) {
  return option.name as string;
}

const warehouseProps = computed(() => {
  return getProps(props.formComponents?.get('warehouse')) as {
    label: string;
    queryService: QueryService;
  };
});

const checkStepErrors = inject<CheckStepErrors>('checkStepErrors');

onDeactivated(async () => {
  await validateField?.('name');
  await validateField?.('description');
  await validateField?.('last_payment_date');
  await validateField?.('currency');
  await validateField?.('currency_exchange_rate');
  await validateField?.('stakeholder');
  await validateField?.('warehouse');
  checkStepErrors?.('GeneralInformationStep');
});
</script>

<style scoped></style>
