/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { StakeholderBasic } from './StakeholderBasic';

export type PaymentAccountOutSimple = {
    name: string;
    stakeholder?: StakeholderBasic;
    account_currency?: CurrencyEnum;
};

