/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BalanceGraphWidget } from './BalanceGraphWidget';
import type { BalanceWidget } from './BalanceWidget';
import type { BestCustomerWidget } from './BestCustomerWidget';
import type { InvoiceWidget } from './InvoiceWidget';
import type { ItemWidget } from './ItemWidget';
import type { User } from './User';

export type widget_data =
  | ItemWidget
  | InvoiceWidget
  | BestCustomerWidget
  | BalanceWidget
  | BalanceGraphWidget
  | User;
