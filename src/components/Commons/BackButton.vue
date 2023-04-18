<template>
  <q-btn
    flat
    class="backbutton"
    color="primary"
    no-caps
    @click="$router.back()"
  >
    <q-icon name="chevron_left" />
    {{ $t('buttons.back') }}
  </q-btn>
</template>

<script setup lang="ts"></script>
