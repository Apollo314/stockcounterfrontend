/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WarehouseItemStockNestedRequest } from './WarehouseItemStockNestedRequest';

/**
 * for creating WarehouseItemStock from StockMovement
 */
export type StockMovementNestedRequest = {
    warehouse_item_stock: WarehouseItemStockNestedRequest;
    amount: string;
    related_movement?: number | null;
};

