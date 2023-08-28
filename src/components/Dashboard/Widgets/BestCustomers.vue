<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-1 g-rs-2 bg-brown-8 rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title col-shrink row q-mb-md text-grey-1">
        <div class="column col-shrink">
          <div class="text-h4">{{ $t('dashboard.best-customers') }}</div>
        </div>
      </div>
      <q-card class="col" style="overflow: auto">
        <q-list
          separator
          bordered
          class="full-width rounded-borders"
          style="overflow: hidden"
        >
          <q-item>
            <q-item-section>{{ $t('dashboard.customer-name') }}</q-item-section>
            <q-item-section align="right">{{
              $t('dashboard.customer-cash-in')
            }}</q-item-section>
          </q-item>
          <q-item
            v-for="customer in data"
            :key="customer.id"
            v-ripple
            clickable
            :to="{ name: 'customer-update', params: { id: customer.id } }"
          >
            <q-item-section>{{ customer.name }}</q-item-section>
            <q-item-section align="right">{{
              $n(parseFloat(customer.cash_in), {
                style: 'currency',
                currency: 'TRY',
              })
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QItem } from 'quasar';
import { useI18n } from 'vue-i18n';

import { BestCustomerWidget } from 'src/client';

const { t: $t, n: $n } = useI18n();

defineProps<{
  data?: BestCustomerWidget[];
}>();
</script>

<style scoped></style>
