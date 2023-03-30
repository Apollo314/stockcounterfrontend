<template>
  <div>
    <q-btn
      :color="color"
      flat
      dense
      v-if="directionLinks"
      icon="chevron_left"
      @click="updatePage(Math.max(currentPage - 1, minPage))"
      style="padding: 3px 2px; min-width: 2em; min-height: 0px"
    />
    <template v-for="page in pages" :key="page">
      <q-btn
        dense
        :color="color"
        :flat="currentPage !== page.number"
        push
        v-if="!page.isEllipses"
        :label="page.number"
        @click="updatePage(page.number)"
        style="padding: 3px 2px; min-width: 2em; min-height: 0px"
      />
      <ellipses
        v-else
        :initial-page="page.number"
        :page="currentPage"
        @update:page="(page: any) => updatePage(page)"
      ></ellipses>
    </template>
    <q-btn
      :color="color"
      dense
      flat
      v-if="directionLinks"
      icon="chevron_right"
      @click="updatePage(Math.min(currentPage + 1, maxPage))"
      style="padding: 3px 2px; min-width: 2em; min-height: 0px"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, Ref } from 'vue';

import Ellipses from './EllipsesButton.vue';

const props = withDefaults(
  defineProps<{
    // maximum amount of page buttons shown
    maxLength?: number;
    // minimum page that can be visited
    minPage?: number;
    // current page
    modelValue: number;
    // color name default: primary
    color?: string;
    // whether or not to show direction links, next, previous, default: false
    directionLinks?: boolean;
    // count of total elements that can be paginated
    count?: number;
    // how many elements shown in one page
    limit?: number;
    // offset
    offset?: number;
  }>(),
  {
    maxLength: 7,
    minPage: 1,
    color: 'primary',
    count: 1,
    limit: 10,
    offset: 0,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const updatePage = (page: number) => {
  const offset = (page - 1) * props.limit;
  emit('update:modelValue', offset);
};

const currentPage: Ref<number> = computed(() => {
  return Math.ceil(props.modelValue / props.limit) + 1;
});

const maxPage = computed(() => {
  return Math.ceil(props.count / props.limit);
});

const pages = computed(() => {
  const count_left = currentPage.value - props.minPage;
  const count_right = maxPage.value - currentPage.value;

  const half = Math.floor((props.maxLength - 1) / 2);

  let budget_left = Math.min(half, count_left);
  let budget_right = Math.min(half, count_right);

  budget_left += Math.max(half - budget_right, 0);
  budget_right += Math.max(half - budget_left, 0);

  const page_list = [];

  if (budget_left >= count_left) {
    for (let i = props.minPage; i < currentPage.value; i++) {
      page_list.push({ isEllipses: false, number: i });
    }
  } else {
    page_list.push({ isEllipses: false, number: props.minPage });
    page_list.push({
      isEllipses: true,
      number: currentPage.value - budget_left + 1,
    });
    for (
      let i = currentPage.value - budget_left + 2;
      i < Math.min(currentPage.value, maxPage.value);
      i++
    ) {
      page_list.push({ isEllipses: false, number: i });
    }
  }
  page_list.push({
    isEllipses: false,
    number: Math.min(currentPage.value, maxPage.value),
  });

  if (budget_right >= count_right) {
    for (let i = currentPage.value + 1; i <= maxPage.value; i++) {
      page_list.push({ isEllipses: false, number: i });
    }
  } else {
    for (
      let i = currentPage.value + 1;
      i <= currentPage.value + budget_right - 2;
      i++
    ) {
      page_list.push({ isEllipses: false, number: i });
    }
    page_list.push({
      isEllipses: true,
      number: currentPage.value + budget_right - 1,
    });
    page_list.push({ isEllipses: false, number: maxPage.value });
  }
  return page_list;
});

provide('count', props.count);
provide('rowsPerPage', props.limit);
provide('maxPage', maxPage);
provide('minPage', props.minPage);
provide('modelValue', props.modelValue);
provide('color', props.color);
</script>

<style scoped></style>
