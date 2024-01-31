/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WidgetNameEnum } from './WidgetNameEnum';

export type SubscribedWidgetRequest = {
    widget_index?: number;
    user_settings?: Record<string, any> | null;
    widget_name: WidgetNameEnum;
};

