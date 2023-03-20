<template>
  <FullHeightPage padding>
    <AdaptiveCard class="full-height">
      <div class="q-pa-md row q-col-gutter-md justify-center">
        <RouterLink :to="{ name: 'another' }">the other page</RouterLink>
        <div class="full-width" v-for="i in 50" :key="i">Why hello there</div>
      </div>
    </AdaptiveCard>
  </FullHeightPage>
</template>

<script setup lang="ts">
import AdaptiveCard from '../../components/Card/AdaptiveCard.vue';
import FullHeightPage from '../../components/Page/FullHeightPage.vue';
</script>

<style scoped></style>
