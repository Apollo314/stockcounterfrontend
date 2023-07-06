/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankOut } from './BankOut';

export type PaginatedBankOutList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<BankOut>;
};
