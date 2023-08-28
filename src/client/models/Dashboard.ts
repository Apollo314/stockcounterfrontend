/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { widget_data } from './widget_data';
import type { WidgetNameEnum } from './WidgetNameEnum';

/**
 * This doesn't really do anything other than hinting openapi.
 */
export type Dashboard = {
  id: number;
  widget_index: number;
  user_settings: Record<string, any>;
  widget_name: WidgetNameEnum;
  readonly widget_data: widget_data;
};
