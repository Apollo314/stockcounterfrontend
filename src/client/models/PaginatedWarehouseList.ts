/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Warehouse } from './Warehouse';

export type PaginatedWarehouseList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<Warehouse>;
};

