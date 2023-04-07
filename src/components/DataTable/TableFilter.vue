<template>
  <template v-for="(formComponent, key) in formComponents" :key="key">
    <div v-if="keyIsntForPagination(key)" class="full-height q-py-xs">
      <component
        :is="getComponent(formComponent).component"
        v-bind="{
          ...getComponent(formComponent).props,
          ...formComponent.props,
        }"
        :highlight="highlightedComponents[key]"
        :name="camelCaseNames ? camelCase(key) : key"
      ></component>
    </div>
  </template>
</template>

<script setup lang="ts" generic="Filters extends Record<string, unknown>">
import camelCase from 'camelcase';
import { PropType, ref } from 'vue';

import { componentMap } from 'components/VeeDynamicForm/componentMap';
import { FormComponent } from 'src/composables/openapihelpers';

const props = defineProps({
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

const FILTER_SUFFIXES = [
  'iexact',
  'contains',
  'icontains',
  'in',
  'gt',
  'gte',
  'lt',
  'lte',
  'startswith',
  'istartswith',
  'endswith',
  'iendswith',
  'date',
  'year',
  'iso_year',
  'month',
  'day',
  'week',
  'week_day',
  'iso_week_day',
  'quarter',
  'time',
  'hour',
  'minute',
  'second',
  'regex',
  'iregex',
  'range',
  'isnull',
];

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
