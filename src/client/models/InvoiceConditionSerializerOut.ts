/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConciseUser } from './ConciseUser';

export type InvoiceConditionSerializerOut = {
  readonly id: string;
  condition_name: string;
  conditions: string;
  created_by: ConciseUser;
  updated_by: ConciseUser;
  created_at?: string;
  readonly updated_at: string | null;
};
