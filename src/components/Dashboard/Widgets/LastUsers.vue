<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-1 g-rs-2 bg-red-5 rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title col-shrink row q-mb-md text-black">
        <div class="column col-shrink">
          <div class="text-h4">{{ $t('dashboard.last-users') }}</div>
        </div>
      </div>
      <q-card class="col bg-transparent" flat style="overflow: auto">
        <q-list
          :dark="false"
          separator
          bordered
          class="full-width rounded-borders"
          style="overflow: hidden"
        >
          <q-item class="text-black">
            <q-item-section>{{ $t('dashboard.username') }}</q-item-section>
            <q-item-section align="center">{{
              $t('dashboard.fullname')
            }}</q-item-section>
            <q-item-section align="right">{{
              $t('dashboard.email')
            }}</q-item-section>
          </q-item>
          <q-item
            v-for="user in data"
            :key="user.id"
            v-ripple
            clickable
            class="text-black"
            :to="{ name: 'user-account-update', params: { id: user.id } }"
          >
            <q-item-section>{{ user.username }}</q-item-section>
            <q-item-section align="center">
              {{ user.first_name }} {{ user.last_name }}
            </q-item-section>
            <q-item-section align="right">{{ user.email }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QItem } from 'quasar';
import { useI18n } from 'vue-i18n';

import { User } from 'src/client';

const { t: $t } = useI18n();

defineProps<{
  data?: User[];
}>();
</script>

<style scoped></style>
