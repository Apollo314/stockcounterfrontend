<template>
  <FullHeightPage padding>
    <AdaptiveCard class="full-height">
      <div class="q-pa-md row q-col-gutter-md justify-center">
        <RouterLink :to="{ name: 'home' }">go home</RouterLink>
        <div v-for="i in 50" :key="i" class="full-width">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          illum fugit laudantium quo? Delectus dolorem ratione officiis iusto
          laudantium hic, sed, ut earum cupiditate, amet maxime distinctio
          doloribus nulla provident!
        </div>
      </div>
    </AdaptiveCard>
  </FullHeightPage>
</template>

<script setup lang="ts">
import AdaptiveCard from '../../components/Card/AdaptiveCard.vue';
import FullHeightPage from '../../components/Page/FullHeightPage.vue';
</script>

<style scoped></style>
