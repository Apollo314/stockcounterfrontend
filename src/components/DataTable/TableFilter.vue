<template>
  <div>
    <pre v-for="(component, key) in formComponents" :key="key">
    {{ key }}
    {{ component }}</pre
    >
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { FormComponent } from 'src/composables/openapihelpers';

const props = defineProps({
  formComponents: {
    type: Object as PropType<Record<string, FormComponent>>,
    required: true,
  },
});

console.log('formcomps', props.formComponents);
</script>

<style scoped></style>
