<template>
  <AdaptiveCard style="max-width: 400px">
    <template #default>
      <div class="q-pa-md" style="height: min(max-content, 100vh)">
        <q-form
          class="q-gutter-md"
          greedy
          @submit.prevent="login()"
          @reset="reset"
        >
          <div class="text-h6 text-primary">{{ $t('titles.login') }}</div>
          <q-input
            v-model="username"
            tabindex="1"
            :rules="[(val) => !!val]"
            hide-bottom-space
            standout
            type="text"
            :placeholder="$t('forms.username')"
          >
            <template #prepend><q-icon name="person" /></template>
          </q-input>
          <q-input
            v-model="password"
            tabindex="1"
            :rules="[(val) => !!val]"
            hide-bottom-space
            standout
            type="password"
            :placeholder="$t('forms.password')"
          >
            <template #prepend><q-icon name="lock" /></template>
          </q-input>
          <q-checkbox
            v-model="authStore.rememberMe"
            tabindex="1"
            :label="$t('forms.rememberMe')"
          />
          <div>
            <q-btn
              :label="$t('buttons.login')"
              icon="login"
              size="md"
              no-caps
              tabindex="1"
              class="full-width"
              type="submit"
              push
              color="primary"
            />
          </div>
        </q-form>
        <div class="row full-width q-pt-md justify-end">
          <RouterLink class="text-grey" tabindex="1" :to="'/'">
            {{ $t('buttons.forgotmypassword') }}
          </RouterLink>
        </div>
      </div>
    </template>
  </AdaptiveCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import { useAuthStore } from 'stores/auth-store';

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const username = ref('');
const password = ref('');
const authStore = useAuthStore();

const login = () => {
  authStore.login(username.value, password.value, () => {
    emit('success');
  });
};

const reset = () => {
  username.value = '';
  password.value = '';
  authStore.rememberMe = true;
};
</script>

<style scoped></style>
