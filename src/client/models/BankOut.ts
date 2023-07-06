/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type BankOut = {
  readonly id: number;
  created_by: User;
  updated_by: User;
  readonly created_at: string | null;
  readonly updated_at: string | null;
  name: string;
};
