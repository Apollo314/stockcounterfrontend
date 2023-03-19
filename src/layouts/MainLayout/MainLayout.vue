<template>
  <q-layout view="hHh LpR fFf" class="overflow-hidden">
    <q-header reveal class="transparent bg-blurred auto-text-color">
      <q-toolbar>
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <RouterLink class="text-h6" :to="{ name: 'home' }">{{
            $t('appName')
          }}</RouterLink>
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
    <q-page-container
      class="perspective"
      style="display: grid; grid-template-columns: 100%"
    >
      <router-view v-slot="{ Component, route }">
        <Transition :name="getTransition(route)">
          <KeepAlive :max="10">
            <Component :is="Component" :key="getKey(route)" />
          </KeepAlive>
        </Transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import { useSettingsStore } from 'src/stores/settings-store';

import LeftDrawer from './LeftDrawer.vue';

const $q = useQuasar();

const settings = useSettingsStore();

$q.dark.set('auto');

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const getKey = (
  route: RouteLocationNormalizedLoaded
): string | number | symbol => {
  if (route.meta.key) {
    return <string>route.meta.key;
  } else if (route.meta.keyFunc) {
    return (<(route: RouteLocationNormalizedLoaded) => string>(
      route.meta.keyFunc
    ))(route);
  } else if (route.meta.pathAsKey) {
    return route.path;
  } else if (route.name) {
    return route.name;
  } else {
    return Math.random();
  }
};

const getTransition = (
  route: RouteLocationNormalizedLoaded
): string | undefined => {
  if (!settings.ui.showTransitionAnimations) return undefined;
  let transition: string = settings.ui.genericAnimation;
  if (route.meta.transition) {
    transition = <string>route.meta.transition;
  } else if (route.params.transition) {
    transition = <string>route.params.transition;
  }
  return transition;
};
</script>

<style lang="scss">
main.q-page {
  grid-column: 1;
  grid-row: 1;
}
</style>
