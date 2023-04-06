<template>
  <div>
    <q-select
      :standout="standout"
      tabindex="0"
      behavior="menu"
      class="label-top nice-select"
      :popup-content-class="
        ['nice-select-popup', 'coolshadow', 'compact-scrollbar'].join(' ')
      "
      options-selected-class="bg-teal text-white"
      v-model="value"
      :options="options"
      :label="label"
      :label-color="labelColor"
      :error="!!errorMessage"
      :error-message="errorMessage"
      @input-value="validate()"
      @blur="validate()"
      :clearable="clearable"
      clear-icon="clear"
      :dense="dense"
      :bg-color="highlight ? 'primary' : undefined"
    >
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    options: string[] | { label: string; value: unknown }[];
    nullable?: boolean;
    default?: unknown;
    label?: string;
    labelColor?: string;
    name: string;
    standout?: string | boolean;
    clearable?: boolean;
    dense?: boolean;
    highlight?: boolean;
  }>(),
  { standout: true }
);

const { value, errorMessage, validate } = useField(toRef(props, 'name'));

onMounted(() => {
  if (props.default) {
    value.value = props.default;
  }
});
</script>

<style scoped></style>
