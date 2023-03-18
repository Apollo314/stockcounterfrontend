<template>
  <q-card
    :class="{
      'bg-transparent': transparent,
      'shadow-0': transparent,
    }"
    class="adaptive-card"
  >
    <q-card-actions
      v-if="$slots['action-top']"
      class="q-pa-none actions-container"
    >
      <div class="row actions-row top full-width">
        <slot name="action-top" />
      </div>
    </q-card-actions>
    <q-card-section class="col scroll-section q-pa-none compact-scrollbar">
      <slot />
    </q-card-section>
    <q-card-actions
      v-if="$slots['action-bottom']"
      class="q-pa-none actions-container"
    >
      <div class="row actions-row bottom full-width">
        <slot name="action-bottom" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  transparent?: boolean;
}>();
</script>
