/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentRequest } from './PaymentRequest';

export type PatchedInvoicePaymentRequest = {
  payment?: PaymentRequest;
  invoice?: number;
};
