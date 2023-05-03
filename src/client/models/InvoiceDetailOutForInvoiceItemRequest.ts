/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConciseUserRequest } from './ConciseUserRequest';
import type { CurrencyEnum } from './CurrencyEnum';
import type { InvoiceConditionInRequest } from './InvoiceConditionInRequest';
import type { InvoiceTypeEnum } from './InvoiceTypeEnum';
import type { StakeholderBasicRequest } from './StakeholderBasicRequest';

export type InvoiceDetailOutForInvoiceItemRequest = {
  invoice_type: InvoiceTypeEnum;
  name: string;
  description?: string | null;
  last_payment_date?: string;
  currency?: CurrencyEnum;
  currency_exchange_rate?: string | null;
  stakeholder: StakeholderBasicRequest;
  created_by: ConciseUserRequest;
  total?: string | null;
  total_with_tax?: string | null;
  invoice_condition?: InvoiceConditionInRequest;
};
