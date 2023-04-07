/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { LoginRequest } from '../models/LoginRequest';
import type { LogoutRequest } from '../models/LogoutRequest';
import type { PaginatedGroupList } from '../models/PaginatedGroupList';
import type { PaginatedUserList } from '../models/PaginatedUserList';
import type { PatchedUserRequest } from '../models/PatchedUserRequest';
import type { User } from '../models/User';
import type { UserRequest } from '../models/UserRequest';
import type { UserWithGroupDetail } from '../models/UserWithGroupDetail';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns PaginatedUserList
   * @throws ApiError
   */
  public userAccountsList({
    search,
    usernameIcontains,
    firstNameIcontains,
    groupsIn,
    isStaff,
    isSuperuser,
    isActive,
    dateJoinedRange,
    limit,
    offset,
  }: {
    /**
     * Ara: adı, soyadı, e-posta adresi, kullanıcı adı
     */
    search?: string;
    /**
     * username__icontains
     */
    usernameIcontains?: string;
    /**
     * first_name__icontains
     */
    firstNameIcontains?: string;
    /**
     * groups__in
     */
    groupsIn?: string;
    /**
     * is_staff
     */
    isStaff?: string;
    /**
     * is_superuser
     */
    isSuperuser?: string;
    /**
     * is_active
     */
    isActive?: string;
    /**
     * date_joined__range
     */
    dateJoinedRange?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
  }): CancelablePromise<PaginatedUserList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/accounts/',
      query: {
        search: search,
        username__icontains: usernameIcontains,
        first_name__icontains: firstNameIcontains,
        groups__in: groupsIn,
        is_staff: isStaff,
        is_superuser: isSuperuser,
        is_active: isActive,
        date_joined__range: dateJoinedRange,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns User
   * @throws ApiError
   */
  public userAccountsCreate({
    requestBody,
  }: {
    requestBody: UserRequest;
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/user/accounts/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns User
   * @throws ApiError
   */
  public userAccountsRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this kullanıcı.
     */
    id: number;
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/accounts/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns User
   * @throws ApiError
   */
  public userAccountsUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this kullanıcı.
     */
    id: number;
    requestBody: UserRequest;
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/user/accounts/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns User
   * @throws ApiError
   */
  public userAccountsPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this kullanıcı.
     */
    id: number;
    requestBody?: PatchedUserRequest;
  }): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/user/accounts/{id}/',
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
  public userAccountsDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this kullanıcı.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/user/accounts/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedGroupList
   * @throws ApiError
   */
  public userGroupsList({
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
  }): CancelablePromise<PaginatedGroupList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/groups/',
      query: {
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns Login
   * @throws ApiError
   */
  public userLoginCreate({
    requestBody,
  }: {
    requestBody: LoginRequest;
  }): CancelablePromise<Login> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/user/login/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any No response body
   * @throws ApiError
   */
  public userLogoutCreate({
    requestBody,
  }: {
    requestBody?: LogoutRequest;
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/user/logout/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Log the user out of all sessions
   * I.E. deletes all auth tokens for the user
   * @returns any No response body
   * @throws ApiError
   */
  public userLogoutallCreate(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/user/logoutall/',
    });
  }

  /**
   * @returns UserWithGroupDetail
   * @throws ApiError
   */
  public userMeRetrieve(): CancelablePromise<UserWithGroupDetail> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/me/',
    });
  }
}
