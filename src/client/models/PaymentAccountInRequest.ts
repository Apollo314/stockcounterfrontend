/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';

export type PaymentAccountInRequest = {
  name: string;
  bank: number | null;
  account_number?: string | null;
  iban?: string | null;
  stakeholder: number | null;
  account_currency?: CurrencyEnum;
};
