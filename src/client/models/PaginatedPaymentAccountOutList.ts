/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentAccountOut } from './PaymentAccountOut';

export type PaginatedPaymentAccountOutList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<PaymentAccountOut>;
};

