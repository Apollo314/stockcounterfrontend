/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Balances } from './Balances';
import type { Bank } from './Bank';

export type BalanceGraphWidget = {
  readonly id: number;
  name: string;
  bank: Bank;
  account_number?: string | null;
  iban?: string | null;
  readonly balances: Array<Balances>;
};
