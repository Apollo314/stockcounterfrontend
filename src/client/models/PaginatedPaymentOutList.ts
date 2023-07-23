/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentOut } from './PaymentOut';

export type PaginatedPaymentOutList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<PaymentOut>;
};
