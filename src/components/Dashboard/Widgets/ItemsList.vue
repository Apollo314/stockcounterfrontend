<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-1 g-rs-2 rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title col-shrink row q-mb-md text-black">
        <div class="column col-shrink">
          <div class="text-h4">{{ title }}</div>
        </div>
      </div>
      <q-card class="col bg-transparent" flat style="overflow: auto">
        <q-list
          separator
          bordered
          class="full-width rounded-borders"
          style="overflow: hidden"
          :dark="false"
        >
          <q-item class="text-black">
            <q-item-section>{{ $t('dashboard.item-name') }}</q-item-section>
            <q-item-section align="center">{{
              $t('dashboard.item-stock')
            }}</q-item-section>
            <q-item-section align="right">
              {{ $t('dashboard.item-buy-sell') }}
            </q-item-section>
          </q-item>
          <q-item
            v-for="item in data"
            :key="item.id"
            v-ripple
            clickable
            :to="{ name: 'items-update', params: { id: item.id } }"
            class="text-black"
          >
            <q-tooltip
              v-if="item.thumbnail"
              class="bg-transparent"
              style="overflow: visible"
            >
              <q-img
                class="rounded-borders shadow-10"
                style="height: 200px; width: 200px"
                :src="item.thumbnail"
                spinner-color="primary"
                spinner-size="82px"
              />
            </q-tooltip>
            <q-item-section>{{ item.name }}</q-item-section>
            <q-item-section align="center">
              {{
                item.stocks.reduce(
                  (sum, stock) => sum + parseFloat(stock.amount),
                  0
                )
              }}
              {{ item.stock_unit.name }}
            </q-item-section>
            <q-item-section align="right">
              {{
                $n(parseFloat(item.buyprice), {
                  style: 'currency',
                  currency: item.buycurrency,
                })
              }}
              -
              {{
                $n(parseFloat(item.sellprice), {
                  style: 'currency',
                  currency: item.sellcurrency,
                })
              }}
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

import { ItemWidget } from 'src/client';

const { t: $t, n: $n } = useI18n();

defineProps<{
  data?: ItemWidget[];
  title?: string;
}>();
</script>

<style scoped></style>
