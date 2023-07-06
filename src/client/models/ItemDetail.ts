/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { ConciseUser } from './ConciseUser';
import type { CurrencyEnum } from './CurrencyEnum';
import type { KdvEnum } from './KdvEnum';
import type { StockUnit } from './StockUnit';
import type { WarehouseItemStock } from './WarehouseItemStock';

/**
 * For individual actions, create, update, delete...
 */
export type ItemDetail = {
  readonly id: number;
  name: string;
  thumbnail?: string | null;
  stock_unit: StockUnit;
  buyprice: string;
  buycurrency?: CurrencyEnum;
  sellprice: string;
  sellcurrency?: CurrencyEnum;
  kdv: KdvEnum;
  stock_code?: string | null;
  readonly stocks: Array<WarehouseItemStock>;
  barcode?: string | null;
  readonly created_at: string | null;
  readonly updated_at: string | null;
  created_by: ConciseUser;
  updated_by: ConciseUser;
  description?: string | null;
  category?: Category;
  readonly previous_id: number | null;
  readonly next_id: number | null;
};
