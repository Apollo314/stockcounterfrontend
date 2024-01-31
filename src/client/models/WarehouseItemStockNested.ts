/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemNested } from './ItemNested';

/**
 * for creating Item if needed from stock WarehouseItemStock
 */
export type WarehouseItemStockNested = {
    item: ItemNested;
    readonly amount: string;
};

