/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemNestedRequest } from './ItemNestedRequest';

/**
 * for creating Item if needed from stock WarehouseItemStock
 */
export type WarehouseItemStockNestedRequest = {
    item: ItemNestedRequest;
    warehouse?: number;
};

