/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceDetailIn } from '../models/InvoiceDetailIn';
import type { InvoiceDetailInRequest } from '../models/InvoiceDetailInRequest';
import type { InvoiceDetailOut } from '../models/InvoiceDetailOut';
import type { InvoiceList } from '../models/InvoiceList';
import type { PaginatedInvoiceListList } from '../models/PaginatedInvoiceListList';
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
   * @returns PaginatedInvoiceListList
   * @throws ApiError
   */
  public invoiceInvoiceList({
    createdAtRange,
    createdBy,
    invoiceType,
    itemsStockMovementWarehouseItemStockItemId,
    limit,
    offset,
    ordering,
    search,
    updatedAtRange,
    updatedBy,
  }: {
    /**
     * created_at__range
     */
    createdAtRange?: string;
    /**
     * created_by
     */
    createdBy?: string;
    /**
     * invoice_type
     */
    invoiceType?: 'purchase' | 'sale' | 'refund-purchase' | 'refund-sale';
    /**
     * items__stock_movement__warehouse_item_stock__item__id
     */
    itemsStockMovementWarehouseItemStockItemId?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
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
     * Ara: Fatura Adı
     */
    search?: string;
    /**
     * updated_at__range
     */
    updatedAtRange?: string;
    /**
     * updated_by
     */
    updatedBy?: string;
  }): CancelablePromise<PaginatedInvoiceListList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/invoice/invoice/',
      query: {
        created_at__range: createdAtRange,
        created_by: createdBy,
        invoice_type: invoiceType,
        items__stock_movement__warehouse_item_stock__item__id:
          itemsStockMovementWarehouseItemStockItemId,
        limit: limit,
        offset: offset,
        ordering: ordering,
        search: search,
        updated_at__range: updatedAtRange,
        updated_by: updatedBy,
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
