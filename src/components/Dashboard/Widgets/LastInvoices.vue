<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-1 g-rs-2 bg-red-5 rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title col-shrink row q-mb-md text-black">
        <div class="column col-shrink">
          <div class="text-h4">{{ $t('dashboard.last-invoices') }}</div>
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
            <q-item-section>{{ $t('dashboard.invoice-name') }}</q-item-section>
            <q-item-section align="center">{{
              $t('dashboard.invoice-total')
            }}</q-item-section>
            <q-item-section align="right">{{
              $t('dashboard.invoice-type')
            }}</q-item-section>
          </q-item>
          <q-item
            v-for="invoice in data"
            :key="invoice.id"
            v-ripple
            clickable
            class="text-black"
            :to="{ name: 'invoice-detail', params: { id: invoice.id } }"
          >
            <q-item-section>{{ invoice.name }}</q-item-section>
            <q-item-section align="center">{{
              $n(parseFloat(invoice.total_with_tax || ''), {
                style: 'currency',
                currency: invoice.currency,
              })
            }}</q-item-section>
            <q-item-section align="right">
              {{ $t(`invoice_types.${invoice.invoice_type}`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QItem } from 'quasar';
import { useI18n } from 'vue-i18n';

import { InvoiceWidget } from 'src/client';

const { t: $t, n: $n } = useI18n();

defineProps<{
  data?: InvoiceWidget[];
}>();
</script>

<style scoped></style>
