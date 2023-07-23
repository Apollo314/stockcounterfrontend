/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { PaymentTypeEnum } from './PaymentTypeEnum';

export type PaymentRequest = {
  payer: number;
  receiver: number;
  amount?: string;
  currency?: CurrencyEnum;
  additional_info?: string | null;
  due_date?: string | null;
  payment_type?: PaymentTypeEnum;
};
