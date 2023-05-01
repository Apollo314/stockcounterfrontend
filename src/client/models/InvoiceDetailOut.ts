/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { InvoiceCondition } from './InvoiceCondition';
import type { InvoiceItem } from './InvoiceItem';
import type { InvoiceList } from './InvoiceList';
import type { InvoiceTypeEnum } from './InvoiceTypeEnum';
import type { Stakeholder } from './Stakeholder';
import type { Warehouse } from './Warehouse';

export type InvoiceDetailOut = {
  readonly id: number;
  invoice_type: InvoiceTypeEnum;
  name: string;
  description?: string | null;
  last_payment_date?: string;
  currency?: CurrencyEnum;
  currency_exchange_rate?: string | null;
  stakeholder: Stakeholder;
  warehouse: Warehouse;
  total?: string | null;
  total_with_tax?: string | null;
  items: Array<InvoiceItem>;
  related_invoice?: Array<InvoiceList>;
  invoice_conditions?: InvoiceCondition;
};
