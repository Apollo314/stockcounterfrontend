/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WarehouseItemStockInfo } from './WarehouseItemStockInfo';

export type PaginatedWarehouseItemStockInfoList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<WarehouseItemStockInfo>;
};
