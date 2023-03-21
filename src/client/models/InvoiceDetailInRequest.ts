/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { InvoiceItemRequest } from './InvoiceItemRequest';
import type { InvoiceListRequest } from './InvoiceListRequest';
import type { InvoiceTypeEnum } from './InvoiceTypeEnum';

export type InvoiceDetailInRequest = {
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
  items: Array<InvoiceItemRequest>;
  related_invoice?: Array<InvoiceListRequest>;
};
