<template>
  <div
    class="q-pt-md q-px-lg q-pb-lg g-cs-2 g-rs-2 bg-warning rounded-borders"
    style="overflow-x: hidden"
  >
    <div class="column full-height">
      <div class="title row q-mb-md text-grey-10">
        <div class="column col-shrink">
          <div class="text-h4">{{ $t('dashboard.account-balance') }}</div>
          <div class="text-h6 text-grey-9">All Accounts</div>
        </div>
        <div class="col-grow row items-start">
          <q-space />
          <div class="column">
            <div class="row">
              <q-space />
              <q-toggle
                v-model="cumulative"
                dense
                class="q-mb-sm"
                :label="$t('dashboard.balance-graph.cumulative')"
                left-label
                color="grey-9"
              ></q-toggle>
            </div>
            <q-btn-group outline>
              <!-- TODO -->
              <q-btn outline no-caps>{{
                $t('dashboard.balance-graph.daily')
              }}</q-btn>
              <q-btn outline no-caps>{{
                $t('dashboard.balance-graph.weekly')
              }}</q-btn>
              <q-btn outline no-caps>{{
                $t('dashboard.balance-graph.monthly')
              }}</q-btn>
              <!-- TODO -->
            </q-btn-group>
          </div>
        </div>
      </div>
      <div ref="lwchartContainer" class="col lw-chart fit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Decimal } from 'decimal.js';
import { SingleValueData } from 'lightweight-charts';
import { QBtn } from 'quasar';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { BalanceGraphWidget } from 'src/client';
import {
  defaultChartOptions,
  useAddChart,
  useAddSeries,
} from 'src/composables/Charts/useChart';

const props = defineProps<{
  data?: BalanceGraphWidget[];
}>();

const { t: $t } = useI18n();

const lwchartContainer = ref<HTMLElement>();
// TODO: Implement looking at individual accounts
const chosenAccount = ref<BalanceGraphWidget>();
const cumulative = ref(true);

type WidgetData = Pick<
  BalanceGraphWidget,
  'name' | 'balances' | 'balance_before'
>;
type DecimalWidgetData = Omit<WidgetData, 'balances' | 'balance_before'> & {
  balances: (Omit<WidgetData['balances'][number], 'balance'> & {
    balance: Decimal;
  })[];
  balance_before: Decimal;
};

const combineAllAccounts = () => {
  let result: DecimalWidgetData = {
    balances: [],
    name: $t('dashboard.balance-graph.all_accounts'),
    balance_before: new Decimal(0),
  };
  if (!props.data) return;
  for (let index = 0; index < props.data.length; index++) {
    const account_data = props.data?.[index];
    if (!account_data) return;
    result.balance_before = result.balance_before.plus(
      new Decimal(account_data.balance_before)
    );
    for (let j = 0; j < account_data.balances.length; j++) {
      const balance_data = account_data.balances[j];
      if (!balance_data) return;
      if (result.balances.length <= j) {
        result.balances.push({
          range: balance_data.range,
          balance: new Decimal(balance_data.balance),
        });
      } else {
        const prev = result.balances[j];
        const new_balance = new Decimal(balance_data.balance).plus(
          prev.balance
        );
        result.balances[j].balance = new_balance;
      }
    }
  }
  return result;
};

const stringToDecimal = (input: BalanceGraphWidget) => {
  const result: DecimalWidgetData = {
    balances: [],
    name: input.name,
    balance_before: new Decimal(input.balance_before),
  };
  for (let index = 0; index < input.balances.length; index++) {
    const balance_data = input.balances[index];
    result.balances.push({
      balance: new Decimal(balance_data.balance),
      range: balance_data.range,
    });
  }
  return result;
};

const accumulate = (input: DecimalWidgetData) => {
  const result: DecimalWidgetData = {
    balances: [],
    name: input.name,
    balance_before: input.balance_before,
  };
  let accumulated_balance = result.balance_before;
  for (let index = 0; index < input.balances.length; index++) {
    const balance_data = input.balances[index];
    accumulated_balance = accumulated_balance.plus(balance_data.balance);
    result.balances.push({
      balance: accumulated_balance,
      range: balance_data.range,
    });
  }
  return result;
};

const widgetData = computed(() => {
  let result: DecimalWidgetData | undefined;
  if (chosenAccount.value) {
    result = stringToDecimal(chosenAccount.value);
  } else {
    result = combineAllAccounts();
  }
  return result;
});

const graphData = computed(() => {
  let pre_result: DecimalWidgetData;
  let result: SingleValueData[] = [];
  if (!widgetData.value?.balances) return result;
  if (cumulative.value) {
    pre_result = accumulate(widgetData.value);
  } else {
    pre_result = widgetData.value;
  }
  for (let index = 0; index < pre_result.balances.length; index++) {
    const balance = pre_result.balances[index];
    if (!balance) return [];
    result.push({
      time: balance?.range[0],
      value: balance?.balance.toNumber(),
    });
  }
  return result;
});

let chartOptions = defaultChartOptions.value;
if (chartOptions.layout && chartOptions.grid) {
  chartOptions.layout.textColor = '#222';
  chartOptions.grid.horzLines = { color: '#22222240' };
}

const { chart } = useAddChart(lwchartContainer, chartOptions);
useAddSeries(chart, 'Area', graphData, {
  lineColor: '#222',
  topColor: '#22222280',
  bottomColor: '#22222204',
});
</script>

<style scoped></style>
