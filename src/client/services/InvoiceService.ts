/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceConditionTemplateIn } from '../models/InvoiceConditionTemplateIn';
import type { InvoiceConditionTemplateInRequest } from '../models/InvoiceConditionTemplateInRequest';
import type { InvoiceConditionTemplateOut } from '../models/InvoiceConditionTemplateOut';
import type { InvoiceDetailIn } from '../models/InvoiceDetailIn';
import type { InvoiceDetailInRequest } from '../models/InvoiceDetailInRequest';
import type { InvoiceDetailOut } from '../models/InvoiceDetailOut';
import type { InvoiceList } from '../models/InvoiceList';
import type { PaginatedInvoiceConditionTemplateOutList } from '../models/PaginatedInvoiceConditionTemplateOutList';
import type { PaginatedInvoiceListList } from '../models/PaginatedInvoiceListList';
import type { PatchedInvoiceConditionTemplateOutRequest } from '../models/PatchedInvoiceConditionTemplateOutRequest';
import type { PatchedInvoiceListRequest } from '../models/PatchedInvoiceListRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvoiceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns void
   * @throws ApiError
   */
  public invoiceBulkInvoiceDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/invoice/bulk/invoice/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public invoiceBulkInvoiceConditionsDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/invoice/bulk/invoice/conditions/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns PaginatedInvoiceListList
   * @throws ApiError
   */
  public invoiceInvoiceList({
    createdAtRange,
    updatedAtRange,
    createdBy,
    updatedBy,
    invoiceType,
    itemsStockMovementWarehouseItemStockItemId,
    ordering,
    search,
    limit,
    offset,
  }: {
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
     * invoice_type
     */
    invoiceType?: 'purchase' | 'sale' | 'refund-purchase' | 'refund-sale';
    /**
     * items__stock_movement__warehouse_item_stock__item__id
     */
    itemsStockMovementWarehouseItemStockItemId?: string;
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
      | 'total_with_tax'
      | '-id'
      | '-name'
      | '-created_at'
      | '-updated_at'
      | '-created_by'
      | '-updated_by'
      | '-total_with_tax';
    /**
     * Ara: Fatura adı
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
  }): CancelablePromise<PaginatedInvoiceListList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/invoice/invoice/',
      query: {
        created_at__range: createdAtRange,
        updated_at__range: updatedAtRange,
        created_by: createdBy,
        updated_by: updatedBy,
        invoice_type: invoiceType,
        items__stock_movement__warehouse_item_stock__item__id:
          itemsStockMovementWarehouseItemStockItemId,
        ordering: ordering,
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns InvoiceDetailIn
   * @throws ApiError
   */
  public invoiceInvoiceCreate({
    requestBody,
  }: {
    requestBody: InvoiceDetailInRequest;
  }): CancelablePromise<InvoiceDetailIn> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/invoice/invoice/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaginatedInvoiceConditionTemplateOutList
   * @throws ApiError
   */
  public invoiceInvoiceConditionsList({
    createdAtRange,
    updatedAtRange,
    createdBy,
    updatedBy,
    conditionNameIcontains,
    conditionsIcontains,
    ordering,
    search,
    limit,
    offset,
  }: {
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
     * condition_name__icontains
     */
    conditionNameIcontains?: string;
    /**
     * conditions__icontains
     */
    conditionsIcontains?: string;
    /**
     * Which field to use when ordering the results.
     */
    ordering?:
      | 'condition_name'
      | 'created_at'
      | 'updated_at'
      | 'created_by'
      | 'updated_by'
      | '-condition_name'
      | '-created_at'
      | '-updated_at'
      | '-created_by'
      | '-updated_by';
    /**
     * Ara: Condition identifier name (ex: Default conditions)
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
  }): CancelablePromise<PaginatedInvoiceConditionTemplateOutList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/invoice/invoice-conditions/',
      query: {
        created_at__range: createdAtRange,
        updated_at__range: updatedAtRange,
        created_by: createdBy,
        updated_by: updatedBy,
        condition_name__icontains: conditionNameIcontains,
        conditions__icontains: conditionsIcontains,
        ordering: ordering,
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns InvoiceConditionTemplateIn
   * @throws ApiError
   */
  public invoiceInvoiceConditionsCreate({
    requestBody,
  }: {
    requestBody: InvoiceConditionTemplateInRequest;
  }): CancelablePromise<InvoiceConditionTemplateIn> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/invoice/invoice-conditions/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns InvoiceConditionTemplateOut
   * @throws ApiError
   */
  public invoiceInvoiceConditionsRetrieve({
    id,
  }: {
    /**
     * A UUID string identifying this invoice condition template.
     */
    id: string;
  }): CancelablePromise<InvoiceConditionTemplateOut> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/invoice/invoice-conditions/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns InvoiceConditionTemplateIn
   * @throws ApiError
   */
  public invoiceInvoiceConditionsUpdate({
    id,
    requestBody,
  }: {
    /**
     * A UUID string identifying this invoice condition template.
     */
    id: string;
    requestBody: InvoiceConditionTemplateInRequest;
  }): CancelablePromise<InvoiceConditionTemplateIn> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/invoice/invoice-conditions/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns InvoiceConditionTemplateOut
   * @throws ApiError
   */
  public invoiceInvoiceConditionsPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A UUID string identifying this invoice condition template.
     */
    id: string;
    requestBody?: PatchedInvoiceConditionTemplateOutRequest;
  }): CancelablePromise<InvoiceConditionTemplateOut> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/invoice/invoice-conditions/{id}/',
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
  public invoiceInvoiceConditionsDestroy({
    id,
  }: {
    /**
     * A UUID string identifying this invoice condition template.
     */
    id: string;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/invoice/invoice-conditions/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns InvoiceDetailOut
   * @throws ApiError
   */
  public invoiceInvoiceRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this invoice.
     */
    id: number;
  }): CancelablePromise<InvoiceDetailOut> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/invoice/invoice/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns InvoiceDetailIn
   * @throws ApiError
   */
  public invoiceInvoiceUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this invoice.
     */
    id: number;
    requestBody: InvoiceDetailInRequest;
  }): CancelablePromise<InvoiceDetailIn> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/invoice/invoice/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns InvoiceList
   * @throws ApiError
   */
  public invoiceInvoicePartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this invoice.
     */
    id: number;
    requestBody?: PatchedInvoiceListRequest;
  }): CancelablePromise<InvoiceList> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/invoice/invoice/{id}/',
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
  public invoiceInvoiceDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this invoice.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/invoice/invoice/{id}/',
      path: {
        id: id,
      },
    });
  }
}
