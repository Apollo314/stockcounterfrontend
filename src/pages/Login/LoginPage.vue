<template>
  <q-page
    :padding="$q.screen.gt.xs"
    style="display: flex; align-items: flex-start; justify-content: center"
  >
    <Login style="margin-top: min(50px, 20vh)" @success="success"></Login>
  </q-page>
</template>

<script setup lang="ts">
import { RouteLocationRaw, useRouter } from 'vue-router';

import Login from 'src/components/Login/LoginComponent.vue';

const props = withDefaults(
  defineProps<{
    next?: RouteLocationRaw;
  }>(),
  {
    next: () => ({ name: 'home' }),
  }
);

const router = useRouter();

const success = () => {
  if (props.next) {
    router.push(props.next);
  }
};
</script>

<style lang="scss" scoped></style>
