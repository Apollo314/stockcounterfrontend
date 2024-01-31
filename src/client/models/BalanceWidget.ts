/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bank } from './Bank';
import type { CurrencyEnum } from './CurrencyEnum';

export type BalanceWidget = {
    readonly id: number;
    name: string;
    bank: Bank;
    account_number?: string | null;
    iban?: string | null;
    balance: string;
    account_currency?: CurrencyEnum;
};

