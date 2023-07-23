/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentRequest } from './PaymentRequest';

export type InvoicePaymentRequest = {
  payment: PaymentRequest;
  invoice: number;
};
