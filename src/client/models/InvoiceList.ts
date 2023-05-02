/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConciseUser } from './ConciseUser';
import type { CurrencyEnum } from './CurrencyEnum';
import type { StakeholderBasic } from './StakeholderBasic';
import type { Warehouse } from './Warehouse';

/**
 * For listview only
 */
export type InvoiceList = {
  readonly id: number;
  name: string;
  description?: string | null;
  last_payment_date?: string;
  created_by: ConciseUser;
  updated_by: ConciseUser;
  created_at?: string;
  readonly updated_at: string | null;
  currency?: CurrencyEnum;
  currency_exchange_rate?: string | null;
  total?: string | null;
  total_with_tax?: string | null;
  stakeholder: StakeholderBasic;
  warehouse: Warehouse;
};
