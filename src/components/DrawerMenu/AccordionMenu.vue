<template>
  <nav
    class="menu-navigation"
    :class="{
      'show-connectors': showConnectors,
      'bordered-menu-items': borderedMenuItems,
      'rounded-connectors': roundedConnectors,
      'filled-menu-items': filledMenuItems,
    }"
  >
    <template v-if="hasContent">
      <DrawerLink
        v-for="menuItem in markedMenuItems"
        :key="`${menuItem.title}` + menuItem.to || ''"
        v-show="menuItem.visible"
        :item="menuItem"
      />
    </template>
    <template v-else-if="$slots['not-found']">
      <slot name="non-found"></slot>
    </template>
    <template v-else> {{ $t('commons.no-result') }} </template>
  </nav>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { MenuItem, FilterableMenuItem } from 'src/types/MenuTypes/MenuTypes';

import DrawerLink from './DrawerLink.vue';

const props = withDefaults(
  defineProps<{
    menuItems: () => MenuItem[];
    filter?: string;
    showConnectors?: boolean;
    roundedConnectors?: boolean;
    borderedMenuItems?: boolean;
    filledMenuItems?: boolean;
  }>(),
  { filter: '' }
);

const { t: $t, locale } = useI18n();

const hasContent = ref(false);

const approxSearch = (filter: string, menuItem: MenuItem): boolean => {
  let title = menuItem.title.toLocaleLowerCase(locale.value);
  const lower_filter = filter.toLocaleLowerCase(locale.value);
  for (const letter of lower_filter) {
    const index = title.indexOf(letter);
    if (index === -1) {
      return false;
    } else {
      title = title.slice(index);
    }
  }
  return true;
};

const filterMenuItems = (
  filter: string,
  filterFunction: (filter: string, menuItem: MenuItem) => boolean,
  menuItems: FilterableMenuItem[]
): FilterableMenuItem[] => {
  const cascadeChildren = (menuItem: FilterableMenuItem) => {
    menuItem.children?.forEach((child: FilterableMenuItem) => {
      child.visible = true;
      if (child.children) {
        cascadeChildren(child);
      }
    });
  };

  const recursiveCheck = (
    menuItem: FilterableMenuItem,
    parent?: FilterableMenuItem
  ): FilterableMenuItem => {
    if (filterFunction(filter, menuItem)) {
      hasContent.value = true;
      menuItem.visible = true;
      cascadeChildren(menuItem);
    }
    menuItem.children?.forEach((child) => {
      recursiveCheck(child, menuItem);
    });
    if (menuItem.visible) {
      if (parent) {
        parent.visible = true;
      }
    }
    return menuItem;
  };
  let markedItems: FilterableMenuItem[] = [];
  for (const menuItem of menuItems) {
    let markedItem = recursiveCheck(menuItem);
    markedItems.push(markedItem);
  }
  return markedItems;
};

const getMenu = () => {
  return filterMenuItems(props.filter || '', approxSearch, props.menuItems());
};

const markedMenuItems: Ref<FilterableMenuItem[]> = ref(getMenu());

watch(
  () => [props.filter, locale],
  () => {
    hasContent.value = false;
    markedMenuItems.value = getMenu();
  },
  { deep: true }
);
</script>

<style lang="scss">
$connector-depth: 15px;
$connector-border-radius: 8px;
$border-width: 3px;

$border-color: desaturate($primary, 80%);

$gutter: 10px;

nav.menu-navigation {
  padding: $border-width;
  .menu-item:not(:first-child) {
    margin-top: $gutter;
  }
  &.show-connectors {
    .q-expansion-item__content {
      padding-right: $border-width;
      .q-list {
        .menu-item {
          margin-top: $gutter;
        }
        .accordion-item {
          margin-top: $gutter;
        }
        &
          > .accordion-item.q-expansion-item:not(:last-child)
          > .q-expansion-item__container {
          &::before {
            content: '';
            position: absolute;
            height: calc(100% + #{$gutter * 2});
            width: $border-width;
            left: -$connector-depth;
            top: -$gutter / 2;
            border-left: $border-width solid $border-color;
            transition: 0s;
          }
        }
        & > .menu-item:not(.accordion-item):not(:last-child)::before {
          content: '';
          position: absolute;
          height: calc(100% + #{$gutter * 2});
          left: -$connector-depth;
          top: -$gutter / 2;
          border-left: $border-width solid $border-color;
          transition: 0s;
        }
        .q-item::after {
          content: '';
          position: absolute;
          height: calc(50% + #{$gutter});
          width: $connector-depth;
          left: -$connector-depth;
          top: -$gutter;
          border-left: $border-width solid $border-color;
          border-bottom: $border-width solid $border-color;
          transition: 0s;
        }
      }
    }
    &.rounded-connectors {
      .q-item::after {
        border-bottom-left-radius: $connector-border-radius;
      }
    }
  }
  &.bordered-menu-items {
    .q-item {
      outline: $border-width solid $border-color;
      transition: 0s;
    }
  }
}
</style>
