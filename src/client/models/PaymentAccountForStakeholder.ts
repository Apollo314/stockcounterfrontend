/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankForStakeholderPaymentAccount } from './BankForStakeholderPaymentAccount';

export type PaymentAccountForStakeholder = {
  readonly id: number;
  readonly created_at: string | null;
  readonly updated_at: string | null;
  name: string;
  bank: BankForStakeholderPaymentAccount;
  account_number?: string | null;
  iban?: string | null;
};
