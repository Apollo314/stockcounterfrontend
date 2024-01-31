/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentAccountForStakeholder } from './PaymentAccountForStakeholder';
import type { RoleEnum } from './RoleEnum';
import type { StakeholderEmployee } from './StakeholderEmployee';

export type Stakeholder = {
    readonly id: number;
    name: string;
    role: RoleEnum;
    shortname: string;
    phone?: string | null;
    email?: string | null;
    vkntckn?: string | null;
    address?: string | null;
    readonly employees: Array<StakeholderEmployee>;
    readonly paymentaccount_set: Array<PaymentAccountForStakeholder>;
};

