/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoicePayment } from './InvoicePayment';

export type PaginatedInvoicePaymentList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<InvoicePayment>;
};

