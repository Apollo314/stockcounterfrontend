<template>
  <q-page padding style="height: 1px">
    <AdaptiveCard class="full-height">
      <div class="q-pa-md row q-col-gutter-md justify-center">
        <RouterLink :to="{ name: 'home' }">go home</RouterLink>
        <div class="full-width" v-for="i in 50" :key="i">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          illum fugit laudantium quo? Delectus dolorem ratione officiis iusto
          laudantium hic, sed, ut earum cupiditate, amet maxime distinctio
          doloribus nulla provident!
        </div>
      </div>
    </AdaptiveCard>
  </q-page>
</template>

<script setup lang="ts">
import AdaptiveCard from '../../components/Card/AdaptiveCard.vue';
</script>

<style scoped></style>
