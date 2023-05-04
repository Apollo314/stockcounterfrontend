/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceConditionTemplateWithIdRequest } from './InvoiceConditionTemplateWithIdRequest';

export type InvoiceConditionInRequest = {
  id?: string;
  invoice_condition_template: InvoiceConditionTemplateWithIdRequest;
  invoice?: number;
  conditions: string;
};
