<template>
  <FullHeightPage padding>
    <AdaptiveCard style="max-width: 650px">
      <div class="q-pa-md q-gutter-md">
        <template v-for="(comp, i) in settingComponents" :key="i">
          <component
            :[comp.bind]="comp.getter(settings.$state)"
            @update:model-value="comp.mutator(settings.$state, $event)"
            :is="comp.component"
            v-bind="comp.props"
          ></component>
        </template>
      </div>
    </AdaptiveCard>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { ComponentConstructor, QCheckbox, QSelect, useQuasar } from 'quasar';
import quasarEN from 'quasar/lang/en-US';
import quasarTR from 'quasar/lang/tr';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import { useSettingsStore } from 'stores/settings-store';

import FullHeightPage from '../../components/Page/FullHeightPage.vue';

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
        standout: true,
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
      component: QSelect,
      props: {
        standout: true,
        label: $t('settings.theme.label'),
        options: [
          {
            label: $t('settings.theme.dark'),
            value: true,
          },
          {
            label: $t('settings.theme.light'),
            value: false,
          },
          {
            label: $t('settings.theme.device'),
            value: 'auto',
          },
        ],
        mapOptions: true,
        emitValue: true,
      },
      getter: () => $q.dark.mode,
      mutator: (_, value) => {
        $q.dark.set(value as boolean | 'auto');
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
        standout: true,
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
    {
      component: QSelect,
      props: {
        standout: true,
        label: $t('settings.ui.navigation-menu-type'),
        options: [
          {
            label: $t('settings.ui.compact'),
            value: true,
          },
          {
            label: $t('settings.ui.relax'),
            value: false,
          },
        ],
        mapOptions: true,
        emitValue: true,
      },
      getter: (state) => state.ui.negativeMenuGutter,
      mutator: (state, value) => {
        state.ui.negativeMenuGutter = value as boolean;
      },
      bind: 'modelValue',
    },
  ];
});
</script>

<style scoped></style>
