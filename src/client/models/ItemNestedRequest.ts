/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { StockUnitNestedRequest } from './StockUnitNestedRequest';
import type { WarehouseItemStockINFO_ONLYRequest } from './WarehouseItemStockINFO_ONLYRequest';

export type ItemNestedRequest = {
    id?: number;
    name: string;
    description?: string | null;
    stock_unit: StockUnitNestedRequest;
    barcode?: string | null;
    kdv: number;
    stocks: Array<WarehouseItemStockINFO_ONLYRequest>;
    stock_code?: string | null;
    buyprice: string;
    buycurrency?: CurrencyEnum;
    sellprice: string;
    sellcurrency?: CurrencyEnum;
};

