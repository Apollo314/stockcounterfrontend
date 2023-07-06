/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentAccountInRequest = {
  name: string;
  bank: number | null;
  account_number?: string | null;
  iban?: string | null;
  stakeholder: number | null;
};
