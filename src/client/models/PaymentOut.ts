/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { PaymentAccountOutSimple } from './PaymentAccountOutSimple';
import type { PaymentTypeEnum } from './PaymentTypeEnum';
import type { User } from './User';

export type PaymentOut = {
    readonly id: number;
    created_by: User;
    updated_by: User;
    readonly created_at: string | null;
    readonly updated_at: string | null;
    payer: PaymentAccountOutSimple;
    receiver: PaymentAccountOutSimple;
    amount: string;
    currency?: CurrencyEnum;
    additional_info?: string | null;
    due_date?: string | null;
    payment_type?: PaymentTypeEnum;
    payment_done?: boolean;
};

