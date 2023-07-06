/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bank } from '../models/Bank';
import type { BankRequest } from '../models/BankRequest';
import type { PaginatedBankOutList } from '../models/PaginatedBankOutList';
import type { PaginatedPaymentAccountOutList } from '../models/PaginatedPaymentAccountOutList';
import type { PatchedBankRequest } from '../models/PatchedBankRequest';
import type { PatchedPaymentAccountOutRequest } from '../models/PatchedPaymentAccountOutRequest';
import type { PaymentAccountIn } from '../models/PaymentAccountIn';
import type { PaymentAccountInRequest } from '../models/PaymentAccountInRequest';
import type { PaymentAccountOut } from '../models/PaymentAccountOut';

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
     * Ara: Bank name
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
     * Ara: Payment account name
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
}
