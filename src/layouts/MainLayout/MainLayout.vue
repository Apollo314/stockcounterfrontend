<template>
  <q-layout view="hhh LpR lfr">
    <StickyHeader>
      <div ref="subHeader" class="row full-width items-center header-blurry">
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
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            @update:model-value="$q.dark.set($event)"
          />
        </q-toolbar>
      </div>
    </StickyHeader>
    <LeftDrawer v-model="leftDrawerOpen"></LeftDrawer>
    <q-page-container
      style="display: grid; grid-template-columns: 100%"
      :class="{
        'page-in-transition': !transitioned || transitioning,
        perspective: !transitioned || transitioning,
      }"
    >
      <router-view v-slot="{ Component }">
        <Transition
          :name="componentTransition"
          @before-enter="transitioning = true"
          @enter="transitioning = true"
          @after-enter="transitioning = false"
          @before-leave="transitioned = false"
          @leave="transitioned = false"
          @after-leave="transitioned = true"
        >
          <KeepAlive :max="10">
            <component :is="Component" :key="componentKey" />
          </KeepAlive>
        </Transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { Ref, computed, provide, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

import StickyHeader from 'components/Header/StickyHeader.vue';
import { useSettingsStore } from 'src/stores/settings-store';

import LeftDrawer from './LeftDrawer.vue';

const $q = useQuasar();
const subHeader = ref();
const replacementFooterRef = ref();

const settings = useSettingsStore();
const route = useRoute();

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

const componentKey = computed(() => {
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
});

const componentTransition = computed(() => {
  if (!settings.ui.showTransitionAnimations) return undefined;
  let transition: string = settings.ui.genericAnimation;
  if (route.meta.transition) {
    transition = route.meta.transition as string;
  } else if (route.params.transition) {
    transition = route.params.transition as string;
  }
  return transition;
});

provide<Ref<boolean>>('showHeader', showHeader);
provide<Ref<HTMLElement>>('replacementFooterRef', replacementFooterRef);
provide<Ref<HTMLElement>>('subHeader', subHeader);
</script>

<style lang="scss">
main.q-page {
  grid-column: 1;
  grid-row: 1;
}

// to avoid scrollbars during transition in chromium based browsers
// firefox doesn't have this problem nor does it have :has() so it's fine
body:has(.page-in-transition) {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
