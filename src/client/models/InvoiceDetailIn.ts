/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { InvoiceList } from './InvoiceList';
import type { InvoiceTypeEnum } from './InvoiceTypeEnum';

export type InvoiceDetailIn = {
  readonly id: number;
  invoice_type: InvoiceTypeEnum;
  name: string;
  description?: string | null;
  invoice_conditions?: string | null;
  last_payment_date?: string;
  currency?: CurrencyEnum;
  currency_exchange_rate?: string | null;
  stakeholder: number;
  warehouse: number;
  total?: string | null;
  total_with_tax?: string | null;
  related_invoice?: Array<InvoiceList>;
};
