/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permission } from './Permission';

export type GroupDetail = {
    readonly id: number;
    name: string;
    permissions: Array<Permission>;
};

