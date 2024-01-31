/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WarehouseItemStockNested } from './WarehouseItemStockNested';

/**
 * for creating WarehouseItemStock from StockMovement
 */
export type StockMovementNested = {
    warehouse_item_stock: WarehouseItemStockNested;
    amount: string;
    related_movement?: number | null;
};

