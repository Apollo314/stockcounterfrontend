/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConciseUser } from './ConciseUser';
import type { CurrencyEnum } from './CurrencyEnum';
import type { InvoiceTypeEnum } from './InvoiceTypeEnum';
import type { StakeholderBasic } from './StakeholderBasic';

export type InvoiceWidget = {
  readonly id: number;
  invoice_type: InvoiceTypeEnum;
  name: string;
  description?: string | null;
  last_payment_date?: string;
  currency?: CurrencyEnum;
  currency_exchange_rate?: string | null;
  stakeholder: StakeholderBasic;
  created_by: ConciseUser;
  total?: string | null;
  total_with_tax?: string | null;
};
