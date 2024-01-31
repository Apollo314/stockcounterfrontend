/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permission } from './Permission';

export type PaginatedPermissionList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<Permission>;
};

