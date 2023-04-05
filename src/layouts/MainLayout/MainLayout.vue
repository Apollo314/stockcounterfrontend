<template>
  <q-layout view="hhh LpR lfr">
    <StickyHeader>
      <div class="row full-width items-center bg-page" ref="subHeader">
        <q-toolbar style="min-height: 40px" class="q-py-xs">
          <q-btn
            flat
            round
            dense
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer()"
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
            unchecked-icon="light_mode"
          />
        </q-toolbar>
      </div>
    </StickyHeader>
    <LeftDrawer v-model="leftDrawerOpen"></LeftDrawer>
    <q-page-container
      class="perspective"
      style="display: grid; grid-template-columns: 100%"
      :class="{
        'page-in-transition': !transitioned || transitioning,
      }"
    >
      <router-view v-slot="{ Component, route }">
        <Transition
          @before-enter="transitioning = true"
          @enter="transitioning = true"
          @after-enter="transitioning = false"
          @before-leave="transitioned = false"
          @leave="transitioned = false"
          @after-leave="transitioned = true"
          :name="getTransition(route)"
        >
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
import { Ref, provide, ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import StickyHeader from 'components/Header/StickyHeader.vue';
import { useSettingsStore } from 'src/stores/settings-store';

import LeftDrawer from './LeftDrawer.vue';

const $q = useQuasar();
const subHeader = ref();
const replacementFooterRef = ref();

const settings = useSettingsStore();

$q.dark.set('auto');

const leftDrawerOpen = ref(false);

const showHeader = ref(true);

// the one that gets in, ex @enter
const transitioning = ref(false);

// the one that goes away, ex @leave
const transitioned = ref(true);

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
provide<Ref<HTMLElement>>('replacementFooterRef', replacementFooterRef);
provide<Ref<HTMLElement>>('subHeader', subHeader);
</script>

<style lang="scss">
main.q-page {
  grid-column: 1;
  grid-row: 1;
}

.page-in-transition {
  height: 100vh;
  width: 100vw;
  overflow: clip;
}
</style>
