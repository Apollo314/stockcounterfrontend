<template>
  <q-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    show-if-above
    :width="$q.screen.gt.xs ? 330 : $q.screen.width"
    :class="{
      'bg-blurred': isOverlay,
      'q-pr-none': !isOverlay,
    }"
    class="q-layout-padding transparent"
    @on-layout="isOverlay = !$event"
  >
    <adaptive-card class="full-height">
      <div v-for="i in 100" :key="i">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
        aspernatur illo inventore molestias dolorem cupiditate ipsam atque
        deleniti officiis, neque recusandae consectetur porro ad nesciunt eos
        illum omnis suscipit corporis!
      </div>
    </adaptive-card>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AdaptiveCard from '../../components/Card/AdaptiveCard.vue';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:model-value', value: boolean): void;
}>();

const isOverlay = ref(false);
</script>

<style scoped></style>
