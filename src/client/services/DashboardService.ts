/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Dashboard } from '../models/Dashboard';
import type { PaginatedSubscribedWidgetList } from '../models/PaginatedSubscribedWidgetList';
import type { PatchedSubscribedWidgetRequest } from '../models/PatchedSubscribedWidgetRequest';
import type { SubscribedWidget } from '../models/SubscribedWidget';
import type { SubscribedWidgetRequest } from '../models/SubscribedWidgetRequest';

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

    /**
     * @returns PaginatedSubscribedWidgetList
     * @throws ApiError
     */
    public dashboardSubscribedWidgetsList({
        limit,
        offset,
    }: {
        /**
         * Number of results to return per page.
         */
        limit?: number,
        /**
         * The initial index from which to return the results.
         */
        offset?: number,
    }): CancelablePromise<PaginatedSubscribedWidgetList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/dashboard/subscribed_widgets/',
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @returns SubscribedWidget
     * @throws ApiError
     */
    public dashboardSubscribedWidgetsCreate({
        requestBody,
    }: {
        requestBody: SubscribedWidgetRequest,
    }): CancelablePromise<SubscribedWidget> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/dashboard/subscribed_widgets/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns SubscribedWidget
     * @throws ApiError
     */
    public dashboardSubscribedWidgetsRetrieve({
        id,
    }: {
        /**
         * A unique integer value identifying this subscribed widget.
         */
        id: number,
    }): CancelablePromise<SubscribedWidget> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/dashboard/subscribed_widgets/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns SubscribedWidget
     * @throws ApiError
     */
    public dashboardSubscribedWidgetsUpdate({
        id,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this subscribed widget.
         */
        id: number,
        requestBody: SubscribedWidgetRequest,
    }): CancelablePromise<SubscribedWidget> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/dashboard/subscribed_widgets/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns SubscribedWidget
     * @throws ApiError
     */
    public dashboardSubscribedWidgetsPartialUpdate({
        id,
        requestBody,
    }: {
        /**
         * A unique integer value identifying this subscribed widget.
         */
        id: number,
        requestBody?: PatchedSubscribedWidgetRequest,
    }): CancelablePromise<SubscribedWidget> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/dashboard/subscribed_widgets/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns void
     * @throws ApiError
     */
    public dashboardSubscribedWidgetsDestroy({
        id,
    }: {
        /**
         * A unique integer value identifying this subscribed widget.
         */
        id: number,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/dashboard/subscribed_widgets/{id}/',
            path: {
                'id': id,
            },
        });
    }

}
