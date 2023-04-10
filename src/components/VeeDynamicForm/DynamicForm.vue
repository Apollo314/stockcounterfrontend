<template>
  <template v-for="(formComponent, key) in formComponents" :key="key">
    <template v-if="!ignoredFields?.includes(key)">
      <div v-if="$slots[key]" class="q-py-xs">
        <slot
          :name="key"
          v-bind="{
            formComponent,
            getComponent,
            getProps,
            name: key,
          }"
        />
      </div>
      <div v-if="!$slots[key]" class="q-py-xs">
        <component
          :is="getComponent(formComponent)"
          v-bind="getProps(formComponent)"
          :name="key"
        ></component>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { getComponent, getProps } from 'components/VeeDynamicForm/componentMap';
import { FormComponent } from 'src/composables/openapihelpers';

defineProps({
  formComponents: {
    type: Object as PropType<Record<string, FormComponent>>,
    required: true,
  },
  ignoredFields: {
    type: Array<string>,
    required: false,
  },
});
</script>

<style scoped></style>
