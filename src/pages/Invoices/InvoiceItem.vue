<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col q-pa-xs col-xs-12 col-lg-4">
          <SearchSelector
            :query-service="
              queryServiceFactory('inventory', 'inventoryItemList')
            "
            :option-label="(object: Record<string, string>) => object.name"
            emit-full-object
            :name="`${name}.stock_movement.warehouse_item_stock.item`"
            :label="$t('invoice_labels.items.itemname')"
            :extra-params="{ idNotin: existingIds?.join(',') }"
            @select="setItemProperties($event as ItemOut)"
          ></SearchSelector>
        </div>
        <div class="col q-pa-xs col-xs-6 col-lg-4">
          <NumberInput
            :name="`${name}.stock_movement.amount`"
            :label="$t('invoice_labels.items.amount')"
          ></NumberInput>
        </div>
        <div class="col q-pa-xs col-xs-6 col-lg-4">
          <NumberInput
            :label="$t('invoice_labels.items.price')"
            :name="`${name}.price`"
            :prefix="currency"
          >
            <InvoiceItemPriceSelector
              v-if="itemProperties"
              :item-properties="itemProperties"
            ></InvoiceItemPriceSelector>
          </NumberInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useFieldValue } from 'vee-validate';
import { computed, inject, onDeactivated, ref, toRef } from 'vue';

import { CurrencyEnum, InvoiceItemRequest, ItemOut } from 'src/client';
import SearchSelector from 'src/components/VeeDynamicForm/CustomComponents/SearchSelector.vue';

import { queryServiceFactory } from '../../components/VeeDynamicForm/componentMap';
import NumberInput from '../../components/VeeDynamicForm/CustomComponents/NumberInput.vue';

import InvoiceItemPriceSelector from './InvoiceItemPriceSelector.vue';
import { ExistingIds } from './InvoiceItemsStep.vue';

import type {
  CheckStepErrors,
  SetFieldValue,
  TypeOfInvoiceType,
  ValidateField,
} from './DetailView.vue';

const props = defineProps<{
  /**
   * the string should be 'items[0]' or 'items[1]' etc...
   */
  name: string;
}>();

const validateField = inject<ValidateField>('validateField');
const checkStepErrors = inject<CheckStepErrors>('checkStepErrors');
const setFieldValue = inject<SetFieldValue>('setFieldValue');
const invoiceType = inject<TypeOfInvoiceType>('invoiceType');
const existingIds = inject<ExistingIds>('existingIds');

const currency = ref<CurrencyEnum>();

const itemName = computed(() => {
  return `${props.name}.stock_movement.warehouse_item_stock.item`;
});

const { value: itemProperties } = useField<ItemOut>(itemName);

onDeactivated(async () => {
  await validateField?.(
    `${props.name}.stock_movement.warehouse_item_stock.item`
  );
  await validateField?.(`${props.name}.stock_movement.amount`);
  await validateField?.(`${props.name}.price`);
  checkStepErrors?.('InvoiceItemsStep');
});

defineEmits<{
  (e: 'delete'): void;
}>();

const setItemProperties = (val: ItemOut) => {
  itemProperties.value = val;
  if (val) {
    if (
      invoiceType?.value === 'purchase' ||
      invoiceType?.value === 'refund-purchase'
    ) {
      const price = val.buyprice;
      currency.value = val.buycurrency;
      setFieldValue?.(`${props.name}.price`, price);
    } else {
      const price = val.sellprice;
      currency.value = val.sellcurrency;
      setFieldValue?.(`${props.name}.price`, price);
    }
  }
};
</script>

<style scoped lang="scss"></style>
