/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SubscribedWidget } from './SubscribedWidget';

export type PaginatedSubscribedWidgetList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<SubscribedWidget>;
};

