<template>
  <q-expansion-item
    v-if="item.children && item.children.length > 1"
    v-show="item.visible"
    :to="item.to"
    class="border-radius no-user-select-wildcard menu-item accordion-item"
    :class="{ invis: item.visible }"
    active-class="active-menu-item"
    exact-active-class="exact-active-menu-item"
    :clickable="item.to !== undefined"
    :content-inset-level="0.77"
    :default-opened="!item.defaultClosed || !item.shrinkable"
    switch-toggle-side
    expanded-icon="arrow_drop_down"
  >
    <template #header>
      <q-item-section class="q-pa-none">
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label v-if="item.caption" caption>
          {{ item.caption }}
        </q-item-label>
      </q-item-section>
      <q-item-section v-if="item.icon" side>
        <q-icon
          :color="item.iconColor || item.bgColor"
          size="24px"
          :name="item.icon"
        />
      </q-item-section>
    </template>
    <q-list>
      <DrawerLink
        v-for="menuItem in item.children"
        v-show="menuItem.visible"
        :key="menuItem.title + menuItem.to || ''"
        :item="menuItem"
      />
    </q-list>
  </q-expansion-item>
  <q-item
    v-else
    v-show="item.visible"
    :to="item.to"
    dense
    class="border-radius no-user-select menu-item"
    :class="{ invis: item.visible }"
    active-class="active-menu-item"
    exact-active-class="exact-active-menu-item"
    :clickable="item.to !== undefined"
  >
    <q-item-section v-if="item.icon" side>
      <q-icon :color="item.bgColor" size="24px" :name="item.icon" />
    </q-item-section>
    <q-item-section class="q-pa-none">
      <q-item-label>{{ item.title }}</q-item-label>
      <q-item-label v-if="item.caption" caption>
        {{ item.caption }}
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="item.children?.[0].icon" class="q-pa-none" side>
      <router-link
        v-if="item.children?.[0].to"
        clickable
        class="q-pa-sm menu-link no-user-select only-child"
        style="border-radius: 10px"
        active-class="active-menu-item"
        exact-active-class="exact-active-menu-item"
        :to="item.children?.[0].to"
      >
        <q-tooltip class="bg-accent">
          {{ item.children?.[0].title }}
        </q-tooltip>
        <q-item-section>
          <q-icon size="24px" :name="item.children?.[0].icon" />
        </q-item-section>
      </router-link>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { FilterableMenuItem } from 'src/types/MenuTypes/MenuTypes';

defineProps({
  item: {
    type: Object as PropType<FilterableMenuItem>,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
