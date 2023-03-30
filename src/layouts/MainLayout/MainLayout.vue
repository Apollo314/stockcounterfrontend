<template>
  <q-layout view="lhr LpR lfr" class="overflow-clip">
    <StickyHeader>
      <div class="q-layout-padding q-pb-sm">
        <q-toolbar
          style="border-radius: 10px; min-height: 40px"
          class="semi-transparent"
        >
          <q-btn
            flat
            round
            dense
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          <div class="row full-width items-center" ref="replacementHeaderRef">
            <template v-if="!uiStore.replaceHeader">
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
            </template>
          </div>
        </q-toolbar>
      </div>
    </StickyHeader>
    <q-footer reveal class="semi-transparent-accent">
      <div ref="replacementFooterRef" class="row full-width items-center"></div>
    </q-footer>
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
import { watch, ref, provide, Ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import { useSettingsStore } from 'src/stores/settings-store';
import { useUIStore } from 'stores/ui-store';

import StickyHeader from '../../components/Header/StickyHeader.vue';

import LeftDrawer from './LeftDrawer.vue';

const $q = useQuasar();
const uiStore = useUIStore();
const replacementHeaderRef = ref();
const replacementFooterRef = ref();

watch(
  () => replacementHeaderRef.value,
  () => {
    uiStore.replacementHeaderRef = replacementHeaderRef.value;
  }
);

watch(
  () => replacementFooterRef.value,
  () => {
    uiStore.replacementFooterRef = replacementFooterRef.value;
  }
);

const settings = useSettingsStore();

$q.dark.set('auto');

const leftDrawerOpen = ref(false);

const showHeader = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const getKey = (
  route: RouteLocationNormalizedLoaded
): string | number | symbol => {
  if (route.meta.key) {
    return route.meta.key as string;
  } else if (route.meta.keyFunc) {
    return (
      route.meta.keyFunc as (route: RouteLocationNormalizedLoaded) => string
    )(route);
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
    transition = route.meta.transition as string;
  } else if (route.params.transition) {
    transition = route.params.transition as string;
  }
  return transition;
};

provide<Ref<boolean>>('showHeader', showHeader);
</script>

<style lang="scss">
main.q-page {
  grid-column: 1;
  grid-row: 1;
}
</style>
