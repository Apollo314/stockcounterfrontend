<template>
  <div
    class="full-height q-py-xs"
    v-for="(formComponent, key) in formComponents"
    :key="key"
  >
    <component
      v-if="keyIsntForPagination(key)"
      :is="getComponent(formComponent).component"
      v-bind="{
        ...getComponent(formComponent).props,
        ...formComponent.props,
      }"
      :name="camelCaseNames ? camelCase(key) : key"
    ></component>
  </div>
</template>

<script setup lang="ts" generic="Filters extends Record<string, unknown>">
import camelCase from 'camelcase';
import { PropType } from 'vue';

import { componentMap } from 'components/VeeDynamicForm/componentMap';
import { FormComponent } from 'src/composables/openapihelpers';

defineProps({
  formComponents: {
    type: Object as PropType<Record<string, FormComponent>>,
    required: true,
  },
  initialFilters: {
    type: Object as PropType<Filters>,
    required: false,
  },
  camelCaseNames: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const getComponent = (formComponent: FormComponent) => {
  let componentDefinition = componentMap[formComponent.componentString];
  if (componentDefinition === undefined) {
    componentDefinition = componentMap['text-input'];
    componentDefinition.props = {
      label: 'Define me, I am undefined',
      hint: formComponent.componentString,
    };
  }
  return componentDefinition;
};

const keyIsntForPagination = (key: string) => {
  if (['limit', 'offset', 'ordering', 'search'].includes(key)) {
    return false;
  }
  return true;
};
</script>

<style scoped></style>
