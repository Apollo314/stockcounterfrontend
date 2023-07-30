/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bank } from '../models/Bank';
import type { BankRequest } from '../models/BankRequest';
import type { InvoicePayment } from '../models/InvoicePayment';
import type { InvoicePaymentRequest } from '../models/InvoicePaymentRequest';
import type { PaginatedBankOutList } from '../models/PaginatedBankOutList';
import type { PaginatedInvoicePaymentList } from '../models/PaginatedInvoicePaymentList';
import type { PaginatedPaymentAccountOutList } from '../models/PaginatedPaymentAccountOutList';
import type { PaginatedPaymentOutList } from '../models/PaginatedPaymentOutList';
import type { PatchedBankRequest } from '../models/PatchedBankRequest';
import type { PatchedInvoicePaymentRequest } from '../models/PatchedInvoicePaymentRequest';
import type { PatchedPaymentAccountOutRequest } from '../models/PatchedPaymentAccountOutRequest';
import type { PatchedPaymentOutRequest } from '../models/PatchedPaymentOutRequest';
import type { PaymentAccountIn } from '../models/PaymentAccountIn';
import type { PaymentAccountInRequest } from '../models/PaymentAccountInRequest';
import type { PaymentAccountOut } from '../models/PaymentAccountOut';
import type { PaymentOut } from '../models/PaymentOut';
import type { PaymentOutRequest } from '../models/PaymentOutRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PaymentsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns PaginatedBankOutList
   * @throws ApiError
   */
  public paymentsBanksList({
    search,
    limit,
    offset,
  }: {
    /**
     * Ara: Banka adı
     */
    search?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedBankOutList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/banks/',
      query: {
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns Bank
   * @throws ApiError
   */
  public paymentsBanksCreate({
    requestBody,
  }: {
    requestBody: BankRequest;
  }): CancelablePromise<Bank> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/payments/banks/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Bank
   * @throws ApiError
   */
  public paymentsBanksRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this bank.
     */
    id: number;
  }): CancelablePromise<Bank> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/banks/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Bank
   * @throws ApiError
   */
  public paymentsBanksUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this bank.
     */
    id: number;
    requestBody: BankRequest;
  }): CancelablePromise<Bank> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/payments/banks/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Bank
   * @throws ApiError
   */
  public paymentsBanksPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this bank.
     */
    id: number;
    requestBody?: PatchedBankRequest;
  }): CancelablePromise<Bank> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/payments/banks/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsBanksDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this bank.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/banks/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsBulkBanksDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/bulk/banks/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsBulkPaymentAccountsDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/bulk/payment-accounts/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsBulkPaymentsDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/bulk/payments/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns PaginatedInvoicePaymentList
   * @throws ApiError
   */
  public paymentsInvoicePaymentsList({
    limit,
    offset,
  }: {
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedInvoicePaymentList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/invoice-payments/',
      query: {
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns InvoicePayment
   * @throws ApiError
   */
  public paymentsInvoicePaymentsCreate({
    requestBody,
  }: {
    requestBody: InvoicePaymentRequest;
  }): CancelablePromise<InvoicePayment> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/payments/invoice-payments/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns InvoicePayment
   * @throws ApiError
   */
  public paymentsInvoicePaymentsRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this invoice payment.
     */
    id: number;
  }): CancelablePromise<InvoicePayment> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/invoice-payments/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns InvoicePayment
   * @throws ApiError
   */
  public paymentsInvoicePaymentsUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this invoice payment.
     */
    id: number;
    requestBody: InvoicePaymentRequest;
  }): CancelablePromise<InvoicePayment> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/payments/invoice-payments/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns InvoicePayment
   * @throws ApiError
   */
  public paymentsInvoicePaymentsPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this invoice payment.
     */
    id: number;
    requestBody?: PatchedInvoicePaymentRequest;
  }): CancelablePromise<InvoicePayment> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/payments/invoice-payments/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsInvoicePaymentsDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this invoice payment.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/invoice-payments/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedPaymentAccountOutList
   * @throws ApiError
   */
  public paymentsPaymentAccountsList({
    nameIcontains,
    createdAtRange,
    updatedAtRange,
    createdBy,
    updatedBy,
    stakeholder,
    accountNumberContains,
    bank,
    ordering,
    search,
    limit,
    offset,
  }: {
    /**
     * name__icontains
     */
    nameIcontains?: string;
    /**
     * created_at__range
     */
    createdAtRange?: string;
    /**
     * updated_at__range
     */
    updatedAtRange?: string;
    /**
     * created_by
     */
    createdBy?: string;
    /**
     * updated_by
     */
    updatedBy?: string;
    /**
     * stakeholder
     */
    stakeholder?: string;
    /**
     * account_number__contains
     */
    accountNumberContains?: string;
    /**
     * bank
     */
    bank?: string;
    /**
     * Which field to use when ordering the results.
     */
    ordering?:
      | 'id'
      | 'name'
      | 'created_at'
      | 'updated_at'
      | 'created_by'
      | 'updated_by'
      | '-id'
      | '-name'
      | '-created_at'
      | '-updated_at'
      | '-created_by'
      | '-updated_by';
    /**
     * Ara: Ödeme hesabı adı
     */
    search?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedPaymentAccountOutList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/payment-accounts/',
      query: {
        name__icontains: nameIcontains,
        created_at__range: createdAtRange,
        updated_at__range: updatedAtRange,
        created_by: createdBy,
        updated_by: updatedBy,
        stakeholder: stakeholder,
        account_number__contains: accountNumberContains,
        bank: bank,
        ordering: ordering,
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns PaymentAccountIn
   * @throws ApiError
   */
  public paymentsPaymentAccountsCreate({
    requestBody,
  }: {
    requestBody: PaymentAccountInRequest;
  }): CancelablePromise<PaymentAccountIn> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/payments/payment-accounts/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaymentAccountOut
   * @throws ApiError
   */
  public paymentsPaymentAccountsRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this payment account.
     */
    id: number;
  }): CancelablePromise<PaymentAccountOut> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/payment-accounts/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaymentAccountIn
   * @throws ApiError
   */
  public paymentsPaymentAccountsUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this payment account.
     */
    id: number;
    requestBody: PaymentAccountInRequest;
  }): CancelablePromise<PaymentAccountIn> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/payments/payment-accounts/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaymentAccountOut
   * @throws ApiError
   */
  public paymentsPaymentAccountsPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this payment account.
     */
    id: number;
    requestBody?: PatchedPaymentAccountOutRequest;
  }): CancelablePromise<PaymentAccountOut> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/payments/payment-accounts/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsPaymentAccountsDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this payment account.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/payment-accounts/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedPaymentOutList
   * @throws ApiError
   */
  public paymentsPaymentsList({
    payer,
    receiver,
    createdAtRange,
    updatedAtRange,
    createdBy,
    updatedBy,
    dueDateRange,
    additionalInfoIcontains,
    paymentType,
    ordering,
    search,
    limit,
    offset,
  }: {
    /**
     * payer
     */
    payer?: string;
    /**
     * receiver
     */
    receiver?: string;
    /**
     * created_at__range
     */
    createdAtRange?: string;
    /**
     * updated_at__range
     */
    updatedAtRange?: string;
    /**
     * created_by
     */
    createdBy?: string;
    /**
     * updated_by
     */
    updatedBy?: string;
    /**
     * due_date__range
     */
    dueDateRange?: string;
    /**
     * additional_info__icontains
     */
    additionalInfoIcontains?: string;
    /**
     * payment_type
     */
    paymentType?: 'cash' | 'cheque';
    /**
     * Which field to use when ordering the results.
     */
    ordering?:
      | 'id'
      | 'amount'
      | 'currency'
      | 'payer'
      | 'receiver'
      | 'created_at'
      | 'updated_at'
      | 'created_by'
      | 'updated_by'
      | '-id'
      | '-amount'
      | '-currency'
      | '-payer'
      | '-receiver'
      | '-created_at'
      | '-updated_at'
      | '-created_by'
      | '-updated_by';
    /**
     * Ara: Ödeme hesabı adı, Tam ad, IBAN, Ödeyen, Tam ad, IBAN, Hesap numarası
     */
    search?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedPaymentOutList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/payments/',
      query: {
        payer: payer,
        receiver: receiver,
        created_at__range: createdAtRange,
        updated_at__range: updatedAtRange,
        created_by: createdBy,
        updated_by: updatedBy,
        due_date__range: dueDateRange,
        additional_info__icontains: additionalInfoIcontains,
        payment_type: paymentType,
        ordering: ordering,
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns PaymentOut
   * @throws ApiError
   */
  public paymentsPaymentsCreate({
    requestBody,
  }: {
    requestBody: PaymentOutRequest;
  }): CancelablePromise<PaymentOut> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/payments/payments/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaymentOut
   * @throws ApiError
   */
  public paymentsPaymentsRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this payment.
     */
    id: number;
  }): CancelablePromise<PaymentOut> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/payments/payments/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaymentOut
   * @throws ApiError
   */
  public paymentsPaymentsUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this payment.
     */
    id: number;
    requestBody: PaymentOutRequest;
  }): CancelablePromise<PaymentOut> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/payments/payments/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaymentOut
   * @throws ApiError
   */
  public paymentsPaymentsPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this payment.
     */
    id: number;
    requestBody?: PatchedPaymentOutRequest;
  }): CancelablePromise<PaymentOut> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/payments/payments/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public paymentsPaymentsDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this payment.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/payments/payments/{id}/',
      path: {
        id: id,
      },
    });
  }
}
