/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { PaymentAccountOutSimpleRequest } from './PaymentAccountOutSimpleRequest';
import type { PaymentTypeEnum } from './PaymentTypeEnum';
import type { UserRequest } from './UserRequest';

export type PatchedPaymentOutRequest = {
  created_by?: UserRequest;
  updated_by?: UserRequest;
  payer?: PaymentAccountOutSimpleRequest;
  receiver?: PaymentAccountOutSimpleRequest;
  amount?: string;
  currency?: CurrencyEnum;
  additional_info?: string | null;
  due_date?: string | null;
  payment_type?: PaymentTypeEnum;
};
