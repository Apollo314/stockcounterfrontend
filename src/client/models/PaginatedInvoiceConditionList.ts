/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceCondition } from './InvoiceCondition';

export type PaginatedInvoiceConditionList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<InvoiceCondition>;
};
