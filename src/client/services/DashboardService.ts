/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Dashboard } from '../models/Dashboard';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DashboardService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns Dashboard
   * @throws ApiError
   */
  public dashboardList(): CancelablePromise<Array<Dashboard>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/dashboard/',
    });
  }
}
