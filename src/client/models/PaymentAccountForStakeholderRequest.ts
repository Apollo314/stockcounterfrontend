/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankForStakeholderPaymentAccountRequest } from './BankForStakeholderPaymentAccountRequest';

export type PaymentAccountForStakeholderRequest = {
  name: string;
  bank: BankForStakeholderPaymentAccountRequest;
  account_number?: string | null;
  iban?: string | null;
};
