/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { KdvEnum } from './KdvEnum';
import type { WarehouseItemStock } from './WarehouseItemStock';

export type ItemIn = {
  readonly id: number;
  name: string;
  thumbnail?: string | null;
  stock_unit: number;
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
  description?: string | null;
  category?: number | null;
};
