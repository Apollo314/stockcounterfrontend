/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankRequest } from './BankRequest';
import type { CurrencyEnum } from './CurrencyEnum';
import type { StakeholderRequest } from './StakeholderRequest';
import type { UserRequest } from './UserRequest';

export type PatchedPaymentAccountOutRequest = {
    created_by?: UserRequest;
    updated_by?: UserRequest;
    name?: string;
    bank?: BankRequest;
    account_number?: string | null;
    iban?: string | null;
    stakeholder?: StakeholderRequest;
    account_currency?: CurrencyEnum;
};

