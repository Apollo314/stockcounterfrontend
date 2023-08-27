<template>
  <FullHeightPage padding :fit="$q.screen.gt.sm">
    <div class="dashboard-grid">
      <div class="comp1"></div>
      <div class="comp2"></div>
      <div class="comp3"></div>
      <BalanceGraph :data="balanceGraphData"></BalanceGraph>
      <div class="comp5"></div>
      <div class="comp6"></div>
      <div class="comp7"></div>
      <div class="comp8"></div>
      <div class="comp9"></div>
    </div>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue';

import { api } from 'src/boot/axios';
import BalanceGraph from 'src/components/Dashboard/Widgets/BalanceGraph.vue';
import FullHeightPage from 'src/components/Page/FullHeightPage.vue';

const data = ref();
const balanceGraphData = ref();

onActivated(() => {
  api.dashboard.dashboardRetrieve().then((dashboardData) => {
    data.value = dashboardData;
    balanceGraphData.value = data.value.widget_data.balance_graph_6;
  });
});
</script>

<style lang="scss">
[class^='comp'],
.comp {
  background: #333;
  border-radius: 10px;
}
</style>
