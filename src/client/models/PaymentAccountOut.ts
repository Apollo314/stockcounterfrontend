/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bank } from './Bank';
import type { CurrencyEnum } from './CurrencyEnum';
import type { Stakeholder } from './Stakeholder';
import type { User } from './User';

export type PaymentAccountOut = {
  readonly id: number;
  created_by?: User;
  updated_by?: User;
  readonly created_at: string | null;
  readonly updated_at: string | null;
  name: string;
  bank?: Bank;
  account_number?: string | null;
  iban?: string | null;
  stakeholder?: Stakeholder;
  account_currency?: CurrencyEnum;
};
