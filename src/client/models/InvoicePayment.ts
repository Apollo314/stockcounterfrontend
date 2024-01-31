/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Payment } from './Payment';

export type InvoicePayment = {
    readonly id: number;
    payment: Payment;
    invoice: number;
};

