/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceConditionSerializerOut } from './InvoiceConditionSerializerOut';

export type PaginatedInvoiceConditionSerializerOutList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<InvoiceConditionSerializerOut>;
};
