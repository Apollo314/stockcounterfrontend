<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-1 g-rs-2 bg-blue-5 rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title col-shrink row q-mb-md">
        <div class="column col-shrink text-black">
          <div class="text-h4">{{ $t('dashboard.due-payments') }}</div>
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
            <q-item-section>{{
              $t('dashboard.payment-amount')
            }}</q-item-section>
            <q-item-section align="center">
              {{ $t('dashboard.other-side') }}
            </q-item-section>
            <q-item-section align="right">{{
              $t('dashboard.due-date')
            }}</q-item-section>
          </q-item>
          <DuePaymentsListItem
            v-for="payment in data"
            :key="payment.id"
            class="text-black"
            :payment="payment"
          />
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QItem } from 'quasar';

import { PaymentOut } from 'src/client';

import DuePaymentsListItem from './DuePaymentsListItem.vue';

defineProps<{
  data: PaymentOut[];
}>();
</script>

<style scoped></style>
