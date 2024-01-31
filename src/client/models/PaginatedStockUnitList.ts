/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StockUnit } from './StockUnit';

export type PaginatedStockUnitList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<StockUnit>;
};

