<template>
  <FullHeightPage :padding="$q.screen.gt.xs" class="full-height">
    <div class="row full-width justify-center">
      <Login style="margin-top: min(50px, 20vh)" @success="success"></Login>
    </div>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { RouteLocationRaw, useRouter } from 'vue-router';

import Login from 'components/Login/LoginComponent.vue';

import FullHeightPage from '../../components/Page/FullHeightPage.vue';

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
