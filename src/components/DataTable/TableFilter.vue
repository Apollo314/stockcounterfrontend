<template>
  <DefaultField
    v-if="formComponents['search']"
    name="search"
    :label="$t('commons.search')"
    icon="search"
  ></DefaultField>
  <template v-for="(formComponent, key) in formComponents" :key="key">
    <div
      v-if="
        keyIsntForPagination(key) && formComponent.componentString !== 'hidden'
      "
      class="full-height q-py-xs"
    >
      <component
        :is="getComponent(formComponent)"
        v-bind="getProps(formComponent)"
        :highlight="highlightedComponents[key]"
        :name="key"
      ></component>
    </div>
  </template>
</template>

<script setup lang="ts" generic="Filters extends Record<string, unknown>">
import { ref } from 'vue';

import { getComponent, getProps } from 'components/VeeDynamicForm/componentMap';
import { FormComponent } from 'src/composables/openapihelpers';

import DefaultField from '../VeeDynamicForm/CustomComponents/DefaultField.vue';

import { FILTER_SUFFIXES } from './datatableutilities';

const props = defineProps<{
  formComponents: Record<string, FormComponent>;
  initialFilters?: Filters;
}>();

const keyIsntForPagination = (key: string) => {
  if (['limit', 'offset', 'ordering', 'search'].includes(key)) {
    return false;
  }
  return true;
};

const highlightedComponents = ref<Record<string, boolean>>({});

const highlightComponentsByField = (field: string) => {
  for (const key in props.formComponents) {
    if (key.startsWith(field)) {
      if (
        key.slice(field.length + 2).length === 0 ||
        FILTER_SUFFIXES.includes(key.slice(field.length + 2))
      ) {
        highlightedComponents.value[key] = true;
        setTimeout(() => {
          try {
            delete highlightedComponents.value[key];
          } catch (error) {}
        }, 4000);
      }
    }
  }
};

defineExpose({
  highlightComponentsByField,
});
</script>

<style scoped></style>
