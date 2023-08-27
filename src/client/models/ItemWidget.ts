/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { ConciseUser } from './ConciseUser';
import type { CurrencyEnum } from './CurrencyEnum';
import type { StockUnit } from './StockUnit';
import type { WarehouseItemStock } from './WarehouseItemStock';

export type ItemWidget = {
  readonly id: number;
  name: string;
  thumbnail?: string | null;
  stock_unit: StockUnit;
  readonly stocks: Array<WarehouseItemStock>;
  buyprice: string;
  sellprice: string;
  buycurrency?: CurrencyEnum;
  sellcurrency?: CurrencyEnum;
  created_by: ConciseUser;
  category?: Category;
};
