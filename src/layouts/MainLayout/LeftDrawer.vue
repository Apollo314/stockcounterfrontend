<template>
  <q-drawer
    :model-value="modelValue"
    show-if-above
    :width="$q.screen.gt.xs ? 330 : $q.screen.width"
    :class="{
      'bg-blurred': isOverlay,
      'q-pr-none': !isOverlay,
    }"
    class="q-layout-padding transparent"
    @update:model-value="$emit('update:model-value', $event)"
    @on-layout="isOverlay = !$event"
  >
    <adaptive-card class="bg-transparent shadow-0 full-height">
      <template #action-top>
        <div class="row q-pb-sm full-width">
          <q-btn
            v-if="isOverlay"
            class="q-mr-xs"
            flat
            round
            icon="menu"
            aria-label="Menu"
            @click="$emit('update:model-value', !modelValue)"
          />
          <div class="col">
            <q-input
              v-model="filter"
              dense
              standout
              class="full-width"
              type="text"
              :placeholder="$t('nav.search')"
              clearable
              clear-icon="clear"
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <accordion-menu
        :menu-items="menuItems"
        show-connectors
        bordered-menu-items
        rounded-connectors
        filled-menu-items
        :filter="filter"
        :negative-gutter="settingsStore.ui.negativeMenuGutter"
      ></accordion-menu>
      <template #action-bottom>
        <div class="row full-width justify-end">
          <div class="q-pa-sm">
            <q-btn
              flat
              icon="settings"
              :label="$t('settings.settings')"
              no-caps
              :to="{ name: 'settings' }"
            />
          </div>
        </div>
      </template>
    </adaptive-card>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import AccordionMenu from 'components/DrawerMenu/AccordionMenu.vue';
import { menuItems } from 'stores/menu-store';

import { useSettingsStore } from '../../stores/settings-store';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

const filter = ref('');

const isOverlay = ref(false);

const settingsStore = useSettingsStore();
</script>

<style scoped></style>
