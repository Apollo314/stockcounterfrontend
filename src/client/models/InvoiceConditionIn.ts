/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceConditionTemplateWithId } from './InvoiceConditionTemplateWithId';

export type InvoiceConditionIn = {
  id?: string;
  invoice_condition_template: InvoiceConditionTemplateWithId;
  conditions: string;
};
