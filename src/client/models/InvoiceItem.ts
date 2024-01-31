/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StockMovementNested } from './StockMovementNested';

export type InvoiceItem = {
    id?: number;
    stock_movement: StockMovementNested;
    price: string;
};

