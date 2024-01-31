<template>
  <RichEditor
    name="invoice_condition"
    :fullscreen-on-click="true"
    :placeholder="() => formComponents?.get('invoice_condition')?.props.label"
  >
  </RichEditor>
</template>

<script setup lang="ts">
import RichEditor from 'components/VeeDynamicForm/CustomComponents/Editor/RichEditor.vue';

import type { FormComponents } from './DetailView.vue';

defineProps<{
  formComponents: FormComponents;
}>();
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
  &.modified {
    .q-field__control {
      background-color: $yellow-10 !important;
    }
  }
}
</style>
