<template>
  <div>
    <q-input
      v-model="value"
      :standout="standout"
      :outlined="outlined"
      :type="showpassword ? 'text' : 'password'"
      :label="label"
      :clearable="clearable"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-bottom-space="!errorMessage"
      clear-icon="clear"
      :dense="dense"
      autocomplete="new-password"
      :bg-color="highlight ? 'primary' : undefined"
      @blur="validate()"
    >
      <template #prepend>
        <q-icon :name="icon || 'key'"></q-icon>
      </template>
      <template #append>
        <q-btn
          v-if="suggest"
          icon="casino"
          flat
          @click="
            value = generateRandomString();
            showpassword = true;
          "
        >
          <q-tooltip>
            {{ $t('buttons.generate_random') }}
          </q-tooltip>
        </q-btn>
        <q-btn icon="visibility" flat @click="showpassword = !showpassword">
          <q-tooltip>
            {{ $t('buttons.show_password') }}
          </q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { QBtn } from 'quasar';
import { useField } from 'vee-validate';
import { ref, toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    standout?: string | boolean;
    outlined?: boolean;
    clearable?: boolean;
    dense?: boolean;
    highlight?: boolean;
    icon?: string;
    suggest?: boolean;
  }>(),
  {
    type: 'text',
    standout: true,
  }
);

const { value, validate, errorMessage } = useField<string>(
  toRef(props, 'name')
);

const showpassword = ref(false);

function generateRandomString() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let arr = new Uint8Array(12);
  crypto.getRandomValues(arr);

  return Array.from(arr)
    .map((num) => chars[num % chars.length])
    .join('');
}
</script>

<style scoped></style>
