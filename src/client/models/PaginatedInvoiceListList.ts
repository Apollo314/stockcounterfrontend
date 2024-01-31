/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceList } from './InvoiceList';

export type PaginatedInvoiceListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<InvoiceList>;
};

