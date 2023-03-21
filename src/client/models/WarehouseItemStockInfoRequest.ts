/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WarehouseRequest } from './WarehouseRequest';

export type WarehouseItemStockInfoRequest = {
  warehouse: WarehouseRequest;
  amount_db?: string | null;
};
