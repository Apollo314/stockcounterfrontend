/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { StakeholderBasicRequest } from './StakeholderBasicRequest';
import type { WarehouseRequest } from './WarehouseRequest';

/**
 * For listview only
 */
export type InvoiceListRequest = {
  name: string;
  description?: string | null;
  last_payment_date?: string;
  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  currency?: CurrencyEnum;
  currency_exchange_rate?: string | null;
  total?: string | null;
  total_with_tax?: string | null;
  stakeholder: StakeholderBasicRequest;
  warehouse: WarehouseRequest;
};
