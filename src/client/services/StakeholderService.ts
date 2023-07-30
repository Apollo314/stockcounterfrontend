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
  public stakeholderStakeholdersList({
    search,
    roleIn,
    shortnameIcontains,
    vkntcknIcontains,
    emailIcontains,
    phoneIcontains,
    limit,
    offset,
  }: {
    /**
     * Ara: Tam ad, Telefon, Eposta, VKN/TCKN
     */
    search?: string;
    /**
     * role__in
     */
    roleIn?: string;
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
      url: '/stakeholder/stakeholders/',
      query: {
        search: search,
        role__in: roleIn,
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
  public stakeholderStakeholdersCreate({
    requestBody,
  }: {
    requestBody: StakeholderRequest;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/stakeholder/stakeholders/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderStakeholdersRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
  }): CancelablePromise<Stakeholder> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/stakeholder/stakeholders/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Stakeholder
   * @throws ApiError
   */
  public stakeholderStakeholdersUpdate({
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
      url: '/stakeholder/stakeholders/{id}/',
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
  public stakeholderStakeholdersPartialUpdate({
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
      url: '/stakeholder/stakeholders/{id}/',
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
  public stakeholderStakeholdersDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this stakeholder.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/stakeholder/stakeholders/{id}/',
      path: {
        id: id,
      },
    });
  }
}
