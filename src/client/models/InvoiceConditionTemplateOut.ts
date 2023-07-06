/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConciseUser } from './ConciseUser';

export type InvoiceConditionTemplateOut = {
  readonly id: string;
  condition_name: string;
  conditions: string;
  created_by: ConciseUser;
  updated_by: ConciseUser;
  readonly created_at: string | null;
  readonly updated_at: string | null;
};
