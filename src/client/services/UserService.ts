/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConciseUser } from '../models/ConciseUser';
import type { Group } from '../models/Group';
import type { GroupDetail } from '../models/GroupDetail';
import type { GroupRequest } from '../models/GroupRequest';
import type { Login } from '../models/Login';
import type { LoginRequest } from '../models/LoginRequest';
import type { LogoutRequest } from '../models/LogoutRequest';
import type { PaginatedGroupDetailList } from '../models/PaginatedGroupDetailList';
import type { PaginatedPermissionList } from '../models/PaginatedPermissionList';
import type { PaginatedUserList } from '../models/PaginatedUserList';
import type { PatchedConciseUserRequest } from '../models/PatchedConciseUserRequest';
import type { PatchedGroupRequest } from '../models/PatchedGroupRequest';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserCreateRequest } from '../models/UserCreateRequest';
import type { UserUpdate } from '../models/UserUpdate';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';
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
   * @returns UserCreate
   * @throws ApiError
   */
  public userAccountsCreate({
    requestBody,
  }: {
    requestBody: UserCreateRequest;
  }): CancelablePromise<UserCreate> {
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
   * @returns UserUpdate
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
    requestBody: UserUpdateRequest;
  }): CancelablePromise<UserUpdate> {
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
   * @returns ConciseUser
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
    requestBody?: PatchedConciseUserRequest;
  }): CancelablePromise<ConciseUser> {
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
   * @returns void
   * @throws ApiError
   */
  public userBulkAccountsDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/user/bulk/accounts/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public userBulkGroupsDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/user/bulk/groups/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns PaginatedGroupDetailList
   * @throws ApiError
   */
  public userGroupsList({
    search,
    limit,
    offset,
  }: {
    /**
     * Ara: adı, adı
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
  }): CancelablePromise<PaginatedGroupDetailList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/groups/',
      query: {
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * @returns Group
   * @throws ApiError
   */
  public userGroupsCreate({
    requestBody,
  }: {
    requestBody: GroupRequest;
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/user/groups/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns GroupDetail
   * @throws ApiError
   */
  public userGroupsRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this grup.
     */
    id: number;
  }): CancelablePromise<GroupDetail> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/groups/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Group
   * @throws ApiError
   */
  public userGroupsUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this grup.
     */
    id: number;
    requestBody: GroupRequest;
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/user/groups/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Group
   * @throws ApiError
   */
  public userGroupsPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this grup.
     */
    id: number;
    requestBody?: PatchedGroupRequest;
  }): CancelablePromise<Group> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/user/groups/{id}/',
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
  public userGroupsDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this grup.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/user/groups/{id}/',
      path: {
        id: id,
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

  /**
   * @returns PaginatedPermissionList
   * @throws ApiError
   */
  public userPermissionsList({
    search,
    limit,
    offset,
  }: {
    /**
     * Ara: adı, kod adı
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
  }): CancelablePromise<PaginatedPermissionList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/user/permissions/',
      query: {
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }
}
