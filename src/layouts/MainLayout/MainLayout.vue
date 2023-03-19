<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal class="transparent bg-blurred">
      <q-toolbar>
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <RouterLink :to="{ name: 'home' }">{{ $t('appName') }}</RouterLink>
        </q-toolbar-title>
        <q-toggle
          :model-value="$q.dark.isActive"
          @update:model-value="$q.dark.set($event)"
          checked-icon="dark_mode"
          color="grey-8"
          unchecked-icon="light_mode"
        />
      </q-toolbar>
    </q-header>

    <LeftDrawer v-model="leftDrawerOpen"></LeftDrawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import LeftDrawer from './LeftDrawer.vue';

const $q = useQuasar();

$q.dark.set('auto');

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss"></style>
