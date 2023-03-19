<template>
  <q-page :padding="$q.screen.gt.xs" style="height: 1px; max-width: 650px">
    <AdaptiveCard>
      <div class="q-pa-md q-gutter-md">
        <template v-for="(comp, i) in settingComponents" :key="i">
          <component
            standout
            :[comp.bind]="comp.getter(settings.$state)"
            @update:model-value="comp.mutator(settings.$state, $event)"
            :is="comp.component"
            v-bind="comp.props"
          ></component>
        </template>
      </div>
    </AdaptiveCard>
  </q-page>
</template>

<script setup lang="ts">
import { ComponentConstructor, QCheckbox, QSelect, useQuasar } from 'quasar';
import quasarEN from 'quasar/lang/en-US';
import quasarTR from 'quasar/lang/tr';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AdaptiveCard from 'src/components/Card/AdaptiveCard.vue';
import { useSettingsStore } from 'src/stores/settings-store';

const settings = useSettingsStore();

const mounted = ref(false);
const { t: $t, locale } = useI18n({ useScope: 'global' });
const $q = useQuasar();

const quasarLangMap = {
  en: quasarEN,
  tr: quasarTR,
};

onMounted(() => {
  mounted.value = true;
});

type SettingComponent = {
  component: ComponentConstructor;
  props: unknown;
  getter: (state: typeof settings.$state) => unknown;
  mutator: (state: typeof settings.$state, value: unknown) => void;
  bind: string;
};

const settingComponents = computed<SettingComponent[]>(() => {
  return [
    {
      component: QSelect,
      props: {
        label: $t('settings.language.label'),
        options: [
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'Türkçe',
            value: 'tr',
          },
        ],
        mapOptions: true,
        emitValue: true,
      },
      getter: () => locale.value,
      mutator: (_, value) => {
        locale.value = value as keyof typeof quasarLangMap;
        $q.lang.set(quasarLangMap[value as keyof typeof quasarLangMap]);
      },
      bind: 'modelValue',
    },
    {
      component: QCheckbox,
      props: {
        label: $t('settings.transitionAnimations.checkboxLabel'),
      },
      getter: (state) => state.ui.showTransitionAnimations,
      mutator: (state, value) =>
        (state.ui.showTransitionAnimations =
          value as typeof state.ui.showTransitionAnimations),
      bind: 'modelValue',
    },
    {
      component: QSelect,
      props: {
        label: $t('settings.transitionAnimations.animationType'),
        options: [
          {
            label: $t('settings.transitionAnimations.standard'),
            value: 'zoom-out-in',
          },
          {
            label: $t('settings.transitionAnimations.alternative'),
            value: 'zoom-out-out',
          },
          {
            label: $t('settings.transitionAnimations.aroundZ'),
            value: 'rotate-around-z',
          },
          {
            label: $t('settings.transitionAnimations.aroundX'),
            value: 'rotate-around-x',
          },
          {
            label: $t('settings.transitionAnimations.aroundY'),
            value: 'rotate-around-y',
          },
          {
            label: $t('settings.transitionAnimations.aroundCorner'),
            value: 'rotate-around-corner',
          },
          {
            label: $t('settings.transitionAnimations.swipeLeft'),
            value: 'swipe-left',
          },
          {
            label: $t('settings.transitionAnimations.swipeRight'),
            value: 'swipe-right',
          },
        ],
        mapOptions: true,
        emitValue: true,
      },
      getter: (state) => state.ui.genericAnimation,
      mutator: (state, value) => {
        state.ui.genericAnimation = value as typeof state.ui.genericAnimation;
      },
      bind: 'modelValue',
    },
  ];
});
</script>

<style scoped></style>
