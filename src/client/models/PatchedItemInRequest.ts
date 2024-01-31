/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';

export type PatchedItemInRequest = {
    name?: string;
    thumbnail?: Blob | null;
    stock_unit?: number;
    buyprice?: string;
    buycurrency?: CurrencyEnum;
    sellprice?: string;
    sellcurrency?: CurrencyEnum;
    kdv?: number;
    stock_code?: string | null;
    barcode?: string | null;
    description?: string | null;
    category?: number | null;
};

