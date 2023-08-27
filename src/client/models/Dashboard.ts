/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BalanceGraphWidget } from './BalanceGraphWidget';
import type { BalanceWidget } from './BalanceWidget';
import type { BestCustomerWidget } from './BestCustomerWidget';
import type { InvoiceWidget } from './InvoiceWidget';
import type { ItemWidget } from './ItemWidget';
import type { User } from './User';

export type Dashboard = {
  leftover_items?: Array<ItemWidget>;
  last_items?: Array<ItemWidget>;
  last_invoices?: Array<InvoiceWidget>;
  best_customers?: Array<BestCustomerWidget>;
  balance?: Array<BalanceWidget>;
  balange_graph?: Array<BalanceGraphWidget>;
  last_users?: Array<User>;
};
