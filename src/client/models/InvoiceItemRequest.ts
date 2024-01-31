/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StockMovementNestedRequest } from './StockMovementNestedRequest';

export type InvoiceItemRequest = {
    id?: number;
    invoice?: number;
    stock_movement: StockMovementNestedRequest;
    price: string;
};

