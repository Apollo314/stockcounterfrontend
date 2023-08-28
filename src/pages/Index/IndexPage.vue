<template>
  <FullHeightPage padding :fit="$q.screen.gt.sm">
    <div class="dashboard-grid">
      <component
        :is="get_widget_component(dashboard_component.widget_name)"
        v-for="dashboard_component in data"
        :key="dashboard_component.id"
        :data="dashboard_component.widget_data"
      />
    </div>
  </FullHeightPage>
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue';

import { api } from 'src/boot/axios';
import { Dashboard, WidgetNameEnum } from 'src/client';
import AccountBalance from 'src/components/Dashboard/Widgets/AccountBalance.vue';
import BalanceGraph from 'src/components/Dashboard/Widgets/BalanceGraph.vue';
import LastItems from 'src/components/Dashboard/Widgets/LastItems.vue';
import UnknownWidget from 'src/components/Dashboard/Widgets/UnknownWidget.vue';
import FullHeightPage from 'src/components/Page/FullHeightPage.vue';

import type { Component } from 'vue';

const data = ref<Dashboard[]>();

const WidgetMap: Record<WidgetNameEnum, Component> = {
  balance_graph: BalanceGraph,
  balance: AccountBalance,
  last_items: LastItems,

  last_users: UnknownWidget,
  due_payments: UnknownWidget,
  last_invoices: UnknownWidget,
  best_customers: UnknownWidget,
  leftover_items: UnknownWidget,
};

const get_widget_component = (widget_name: WidgetNameEnum) => {
  const widget_component = WidgetMap[widget_name] || UnknownWidget;
  return widget_component;
};

onActivated(() => {
  api.dashboard.dashboardList().then((dashboardData) => {
    data.value = dashboardData;
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
