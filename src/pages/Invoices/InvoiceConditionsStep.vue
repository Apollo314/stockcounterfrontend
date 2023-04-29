<template>
  <RichEditor
    name="invoice_conditions"
    :fullscreen-on-click="true"
    :placeholder="() => formComponents?.get('invoice_conditions')?.props.label"
  ></RichEditor>
</template>

<script setup lang="ts">
import RichEditor from 'src/components/VeeDynamicForm/CustomComponents/Editor/RichEditor.vue';

import type { FormComponents } from './DetailView.vue';

defineProps<{
  formComponents: FormComponents;
}>();
</script>

<style scoped></style>
