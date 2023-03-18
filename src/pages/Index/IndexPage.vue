<template>
  <q-page padding style="height: 1px">
    <AdaptiveCard transparent class="full-height">
      <div class="q-pa-md row q-col-gutter-md justify-center">
        <div class="full-width" v-for="i in 50" :key="i">Why hello there</div>
      </div>
    </AdaptiveCard>
  </q-page>
</template>

<script setup lang="ts">
import AdaptiveCard from '../../components/Card/AdaptiveCard.vue';
</script>

<style scoped></style>
