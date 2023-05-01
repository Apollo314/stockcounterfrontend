<template>
  <RichEditor
    name="invoice_conditions.conditions"
    :fullscreen-on-click="true"
    :placeholder="() => formComponents?.get('invoice_conditions')?.props.label"
  >
    <template #extra-buttons-before>
      <SearchSelector
        ref="searhSelectorRef"
        :query-service="
          queryServiceFactory('invoice', 'invoiceInvoiceConditionsList')
        "
        :label="$t('invoice_labels.invoice_condition_label')"
        :option-label="optionLabel"
        emit-full-object
        dense
        hide-selected
        fill-input
        class="q-mr-xs dark__search_input"
        name="invoice_conditions"
        @new-value="createValue"
        @filter="onFilter"
      >
        <template #no-option>
          <q-item clickable @click="onNoOptionClick">
            <q-item-section top avatar>
              <q-avatar color="primary" text-color="white" icon="add" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('commons.add_new') }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </SearchSelector>
    </template>
  </RichEditor>
</template>

<script setup lang="ts">
import { QSelectProps } from 'quasar';
import { ref } from 'vue';

import { queryServiceFactory } from 'components/VeeDynamicForm/componentMap';
import RichEditor from 'components/VeeDynamicForm/CustomComponents/Editor/RichEditor.vue';
import SearchSelector from 'components/VeeDynamicForm/CustomComponents/SearchSelector.vue';

import { $t } from '../../boot/i18n';

import type { FormComponents } from './DetailView.vue';

defineProps<{
  formComponents: FormComponents;
}>();

const searhSelectorRef = ref<InstanceType<typeof SearchSelector>>();

const getNewObj = (condition_name: string) => {
  return {
    condition_name,
    conditions: $t('invoice_labels.new_condition_placeholder'),
  };
};

const createValue: QSelectProps['onNewValue'] = (val, done) => {
  const obj = getNewObj(val);
  done(obj, 'add-unique');
};

const optionLabel = (val: Record<string, string>) => {
  return val.condition_name;
};

const lastFilteredValue = ref<string>();

const onFilter: QSelectProps['onFilter'] = (val) => {
  lastFilteredValue.value = val;
};

const onNoOptionClick = () => {
  searhSelectorRef.value?.selectRef?.add(
    getNewObj(
      lastFilteredValue.value || $t('invoice_labels.new_condition_name')
    ),
    true
  );
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
