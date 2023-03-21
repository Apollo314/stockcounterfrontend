/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Warehouse } from './Warehouse';

export type WarehouseItemStockInfo = {
  warehouse: Warehouse;
  amount_db?: string | null;
};
