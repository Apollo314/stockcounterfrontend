/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StockMovementWithoutItem } from './StockMovementWithoutItem';

export type PaginatedStockMovementWithoutItemList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<StockMovementWithoutItem>;
};
