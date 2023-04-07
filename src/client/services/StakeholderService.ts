/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedStakeholderEmployeeList } from '../models/PaginatedStakeholderEmployeeList';
import type { PaginatedStakeholderList } from '../models/PaginatedStakeholderList';
import type { PatchedStakeholderEmployeeRequest } from '../models/PatchedStakeholderEmployeeRequest';
import type { PatchedStakeholderRequest } from '../models/PatchedStakeholderRequest';
import type { Stakeholder } from '../models/Stakeholder';
import type { StakeholderEmployee } from '../models/StakeholderEmployee';
import type { StakeholderEmployeeRequest } from '../models/StakeholderEmployeeRequest';
import type { StakeholderRequest } from '../models/StakeholderRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StakeholderService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns void
   * @throws ApiError
   */
  public stakeholderBulkStakeholderDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/stakeholder/bulk/stakeholder/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns PaginatedStakeholderList
   * @throws ApiError
   */
  public stakeholderCustomersList({
    search,
    shortnameIcontains,
    vkntcknIcontains,
    emailIcontains,
    phoneIcontains,
    limit,
    offset,
  }: {
    /**
     * Ara: Tam Adı, Telefon, E-Posta, VKN/TCKN
     */
    search?: string;
    /**
     * shortname__icontains
     */
    shortnameIcontains?: string;
    /**
     * vkntckn__icontains
     */
    vkntcknIcontains?: string;
    /**
     * email__icontains
     */
    emailIcontains?: string;
    /**
     * phone__icontains
     */
    phoneIcontains?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedStakeholderList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/customers/',
      query: {
        search: search,
        shortname__icontains: shortnameIcontains,
        vkntckn__icontains: vkntcknIcontains,
        email__icontains: emailIcontains,
        phone__icontains: phoneIcontains,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderCustomersCreate({
    requestBody,
  }: {
    requestBody: StakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/stakeholder/customers/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderCustomersRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/customers/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderCustomersUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
    requestBody: StakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/stakeholder/customers/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderCustomersPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
    requestBody?: PatchedStakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/stakeholder/customers/{id}/',
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
  public stakeholderCustomersDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/stakeholder/customers/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedStakeholderEmployeeList
   * @throws ApiError
   */
  public stakeholderStakeholderEmployeeList({
    search,
    limit,
    offset,
  }: {
    /**
     * A search term.
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
  }): CancelablePromise<PaginatedStakeholderEmployeeList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/stakeholder-employee/',
      query: {
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns StakeholderEmployee
   * @throws ApiError
   */
  public stakeholderStakeholderEmployeeCreate({
    requestBody,
  }: {
    requestBody: StakeholderEmployeeRequest;
  }): CancelablePromise<StakeholderEmployee> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/stakeholder/stakeholder-employee/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns StakeholderEmployee
   * @throws ApiError
   */
  public stakeholderStakeholderEmployeeRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder employee.
     */
    id: number;
  }): CancelablePromise<StakeholderEmployee> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/stakeholder-employee/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns StakeholderEmployee
   * @throws ApiError
   */
  public stakeholderStakeholderEmployeeUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stakeholder employee.
     */
    id: number;
    requestBody: StakeholderEmployeeRequest;
  }): CancelablePromise<StakeholderEmployee> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/stakeholder/stakeholder-employee/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns StakeholderEmployee
   * @throws ApiError
   */
  public stakeholderStakeholderEmployeePartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stakeholder employee.
     */
    id: number;
    requestBody?: PatchedStakeholderEmployeeRequest;
  }): CancelablePromise<StakeholderEmployee> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/stakeholder/stakeholder-employee/{id}/',
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
  public stakeholderStakeholderEmployeeDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder employee.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/stakeholder/stakeholder-employee/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedStakeholderList
   * @throws ApiError
   */
  public stakeholderSuppliersList({
    search,
    shortnameIcontains,
    vkntcknIcontains,
    emailIcontains,
    phoneIcontains,
    limit,
    offset,
  }: {
    /**
     * Ara: Tam Adı, Telefon, E-Posta, VKN/TCKN
     */
    search?: string;
    /**
     * shortname__icontains
     */
    shortnameIcontains?: string;
    /**
     * vkntckn__icontains
     */
    vkntcknIcontains?: string;
    /**
     * email__icontains
     */
    emailIcontains?: string;
    /**
     * phone__icontains
     */
    phoneIcontains?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedStakeholderList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/suppliers/',
      query: {
        search: search,
        shortname__icontains: shortnameIcontains,
        vkntckn__icontains: vkntcknIcontains,
        email__icontains: emailIcontains,
        phone__icontains: phoneIcontains,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderSuppliersCreate({
    requestBody,
  }: {
    requestBody: StakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/stakeholder/suppliers/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderSuppliersRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/suppliers/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderSuppliersUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
    requestBody: StakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/stakeholder/suppliers/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderSuppliersPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
    requestBody?: PatchedStakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/stakeholder/suppliers/{id}/',
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
  public stakeholderSuppliersDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/stakeholder/suppliers/{id}/',
      path: {
        id: id,
      },
    });
  }
}
