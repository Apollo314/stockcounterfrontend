<template>
  <RichEditor
    name="invoice_condition.conditions"
    :fullscreen-on-click="true"
    :placeholder="() => formComponents?.get('invoice_condition')?.props.label"
  >
    <template #extra-buttons-before>
      <SearchSelector
        ref="searhSelectorRef"
        :query-service="
          queryServiceFactory('invoice', 'invoiceInvoiceConditionsList')
        "
        :label="$t('invoice_labels.invoice_condition_label')"
        :option-label="optionLabel"
        dense
        emit-full-object
        hide-selected
        fill-input
        class="q-mr-xs dark__search_input"
        name="invoice_condition_template"
        @select="onSelect"
        @filter="onFilter"
      >
      </SearchSelector>
    </template>
  </RichEditor>
</template>

<script setup lang="ts">
import { QSelectProps } from 'quasar';
import { inject, ref } from 'vue';

import { $t } from 'boot/i18n';
import { queryServiceFactory } from 'components/VeeDynamicForm/componentMap';
import RichEditor from 'components/VeeDynamicForm/CustomComponents/Editor/RichEditor.vue';
import SearchSelector from 'components/VeeDynamicForm/CustomComponents/SearchSelector.vue';
import { InvoiceConditionTemplateOut } from 'src/client';

import type { FormComponents, UseFieldModel } from './DetailView.vue';

defineProps<{
  formComponents: FormComponents;
}>();

const searhSelectorRef = ref<InstanceType<typeof SearchSelector>>();
const useFieldModel = inject<UseFieldModel>('useFieldModel');

const invoice_condition = useFieldModel?.('invoice_condition');

const onSelect = (val: unknown) => {
  const template = val as InvoiceConditionTemplateOut;
  console.log('before', invoice_condition?.value);
  if (invoice_condition?.value) {
    console.log(template);
    console.log('its a thing yo');
    invoice_condition.value.conditions = template.conditions;
    invoice_condition.value.invoice_condition_template = template.id;
  }
  console.log('invoice_condition', invoice_condition?.value);
};

const optionLabel = (val: Record<string, string>) => {
  return val.condition_name;
};

const lastFilteredValue = ref<string>();

const onFilter: QSelectProps['onFilter'] = (val) => {
  lastFilteredValue.value = val;
};
</script>

<style lang="scss">
.dark__search_input {
  .q-field__control {
    background-color: black !important;
    .q-field__label,
    * {
      color: white !important;
    }
  }
}
</style>
