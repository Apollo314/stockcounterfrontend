/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaymentAccountIn = {
  readonly id: number;
  readonly created_at: string | null;
  readonly updated_at: string | null;
  name: string;
  bank: number | null;
  account_number?: string | null;
  iban?: string | null;
  stakeholder: number | null;
};
