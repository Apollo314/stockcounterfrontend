/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { StockUnitNested } from './StockUnitNested';
import type { WarehouseItemStockINFO_ONLY } from './WarehouseItemStockINFO_ONLY';

export type ItemNested = {
    id?: number;
    name: string;
    description?: string | null;
    stock_unit: StockUnitNested;
    barcode?: string | null;
    kdv: number;
    stocks: Array<WarehouseItemStockINFO_ONLY>;
    stock_code?: string | null;
    buyprice: string;
    buycurrency?: CurrencyEnum;
    sellprice: string;
    sellcurrency?: CurrencyEnum;
};

