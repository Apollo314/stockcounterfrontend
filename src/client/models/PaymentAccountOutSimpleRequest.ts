/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { StakeholderBasicRequest } from './StakeholderBasicRequest';

export type PaymentAccountOutSimpleRequest = {
    name: string;
    stakeholder?: StakeholderBasicRequest;
    account_currency?: CurrencyEnum;
};

