<template>
  <q-tabs
    outside-arrows
    mobile-arrows
    align="left"
    class="q-pa-xs"
    style="width: 100%; max-width: 100vw"
  >
    <q-btn
      :dense="$q.screen.xs"
      flat
      icon="refresh"
      :disable="!requestDone"
      @click="request({})"
    >
      <q-tooltip
        anchor="bottom left"
        self="top left"
        class="text-medium bg-primary nowrap"
        style=""
      >
        {{ $t('data_table.refresh') }}
      </q-tooltip>
    </q-btn>
    <q-btn
      :dense="$q.screen.xs"
      class="bar-button"
      :label="$t('data_table.file')"
      no-caps
      flat
    />
    <q-btn
      :dense="$q.screen.xs"
      class="bar-button"
      :label="$t('data_table.view')"
      no-caps
      flat
    >
      <q-menu v-model="showMenu">
        <q-card class="q-card-mobile-full-width" bordered>
          <q-card-section class="q-pa-none">
            <q-list class="listpadding" style="min-width: 100px">
              <q-item clickable>
                <q-item-section>
                  <div>{{ $t('titles.activeColumns') }}</div>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <ActiveColumns :context-menu="false"></ActiveColumns>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>{{
                  $t('data_table.table_type')
                }}</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-popup-proxy
                  anchor="top end"
                  self="top start"
                  :breakpoint="600"
                >
                  <q-card class="q-card-mobile-full-width q-pa-none" bordered>
                    <div class="text-h6 q-pa-sm text-center">
                      {{ $t('data_table.table_type') }}
                    </div>
                    <q-separator />
                    <q-list class="listpadding">
                      <q-item
                        v-for="option in tableTypes"
                        :key="option.label"
                        v-ripple
                        v-close-popup="2"
                        clickable
                        :active="card === option.value"
                        active-class="active-item"
                        @click="toggleCardView(option.value)"
                      >
                        <q-item-section avatar class="col-shrink">
                          <q-icon :name="option.icon" />
                        </q-item-section>
                        <q-item-section>{{ option.label }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </q-popup-proxy>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-menu>
    </q-btn>
    <q-btn
      :dense="$q.screen.xs"
      class="bar-button"
      :label="$t('data_table.order')"
      no-caps
      flat
    >
      <SortingComponent></SortingComponent>
    </q-btn>
    <q-btn flat icon="fullscreen" @click="toggle()" />
    <q-space />
    <q-btn flat icon="filter_list" @click="showFilter = !showFilter" />
    <slot name="top-right"></slot>
  </q-tabs>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ActiveColumns from './ActiveColumns.vue';
import SortingComponent from './SortingComponent.vue';

import type { RequestFunction } from './DataTable.vue';

const requestDone = inject<boolean>('requestDone');
const request = inject('request') as RequestFunction<unknown>;
const toggleCardView = inject('toggleCardView') as (val?: boolean) => void;
const card = inject('card') as boolean;
const toggle = inject('toggle') as () => void;

const showMenu = ref(false);
const showFilter = inject<boolean>('showFilter');
const { t: $t } = useI18n();

const tableTypes = computed(() => {
  return [
    {
      label: $t('data_table.cards'),
      value: true,
      icon: 'style',
    },
    {
      label: $t('data_table.rows'),
      value: false,
      icon: 'list',
    },
  ];
});
</script>

<style scoped></style>
