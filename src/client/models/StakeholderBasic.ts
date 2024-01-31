/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleEnum } from './RoleEnum';

export type StakeholderBasic = {
    readonly id: number;
    name: string;
    role: RoleEnum;
    shortname: string;
    phone?: string | null;
    email?: string | null;
    vkntckn?: string | null;
    address?: string | null;
};

