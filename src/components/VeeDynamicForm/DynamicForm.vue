<template>
  <template v-for="[key, formComponent] in formComponents" :key="key">
    <div v-if="$slots[key]" class="q-py-xs" :class="{ [key]: true }">
      <slot
        :name="key"
        v-bind="{
          formComponent,
          getComponent,
          getProps,
          name: key,
          formComponents: formComponents,
        }"
      />
    </div>
    <div v-if="!$slots[key]" class="q-py-xs" :class="{ [key]: true }">
      <component
        :is="getComponent(formComponent)"
        v-bind="getProps(formComponent)"
        :name="key"
      ></component>
    </div>
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { getComponent, getProps } from 'components/VeeDynamicForm/componentMap';
import { FormComponent } from 'src/composables/openapihelpers';

defineProps({
  formComponents: {
    type: Object as PropType<Map<string, FormComponent> | undefined>,
    required: true,
  },
});
</script>

<style scoped></style>
