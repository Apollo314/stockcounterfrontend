/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GroupDetail } from './GroupDetail';

export type PaginatedGroupDetailList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<GroupDetail>;
};

