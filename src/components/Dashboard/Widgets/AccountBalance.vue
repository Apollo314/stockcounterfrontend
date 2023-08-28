<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-1 g-rs-1 bg-accent rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title row q-mb-md">
        <div class="column col-shrink">
          <div class="text-h4">{{ $t('dashboard.account-balance') }}</div>
          <div class="text-h6">
            {{
              chosenAccount?.id
                ? chosenAccount.name
                : $t('dashboard.balance-graph.all_accounts')
            }}
          </div>
        </div>
      </div>
      <div
        class="row col justify-center items-center rounded-borders"
        :class="{ 'bg-green-3': balance >= 0, 'bg-red-8': balance < 0 }"
      >
        <div
          class="text-h4 text-bold text-black"
          style="border-bottom: 4px solid"
        >
          {{
            $n(balance, {
              style: 'currency',
              currency: chosenAccount?.account_currency || 'TRY',
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Decimal } from 'decimal.js';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { BalanceWidget } from 'src/client';

const props = defineProps<{
  data?: BalanceWidget[];
}>();

const { t: $t, n: $n } = useI18n();

const chosenAccount = ref<BalanceWidget>();

const balance = computed(() => {
  if (chosenAccount.value?.id) {
    return +chosenAccount.value.balance;
  } else {
    let combinedBalance = new Decimal(0);
    if (!props.data?.length) return 0;
    for (let index = 0; index < props.data.length; index++) {
      const balance_data = props.data[index];
      combinedBalance = combinedBalance.plus(new Decimal(balance_data.balance));
    }
    return combinedBalance.toNumber();
  }
});
</script>

<style scoped></style>
