<template>
  <FullHeightPage padding>
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
import BestCustomers from 'src/components/Dashboard/Widgets/BestCustomers.vue';
import DuePayments from 'src/components/Dashboard/Widgets/DuePayments/DuePayments.vue';
import LastInvoices from 'src/components/Dashboard/Widgets/LastInvoices.vue';
import LastItems from 'src/components/Dashboard/Widgets/LastItems.vue';
import LeftoverItems from 'src/components/Dashboard/Widgets/LeftoverItems.vue';
import UnknownWidget from 'src/components/Dashboard/Widgets/UnknownWidget.vue';
import FullHeightPage from 'src/components/Page/FullHeightPage.vue';

import type { Component } from 'vue';

const data = ref<Dashboard[]>();

const WidgetMap: Record<WidgetNameEnum, Component> = {
  balance_graph: BalanceGraph,
  balance: AccountBalance,
  last_items: LastItems,
  best_customers: BestCustomers,
  due_payments: DuePayments,
  last_invoices: LastInvoices,
  leftover_items: LeftoverItems,

  last_users: UnknownWidget,
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
