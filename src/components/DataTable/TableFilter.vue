<template>
  <form @reset="resetForm()">
    <q-btn
      color="negative"
      icon="delete"
      :label="$t('commons.reset')"
      type="reset"
    />
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
        :name="key"
      ></component>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { PropType, toRef } from 'vue';

import { componentMap } from 'components/VeeDynamicForm/componentMap';
import { FormComponent } from 'src/composables/openapihelpers';

const props = defineProps({
  formComponents: {
    type: Object as PropType<Record<string, FormComponent>>,
    required: true,
  },
  initialFilters: {
    type: Object as PropType<Record<string, unknown>>,
    required: false,
  },
});

const { values, resetForm, handleSubmit, setValues } = useForm({
  initialValues: toRef(props, 'initialFilters', {}),
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
