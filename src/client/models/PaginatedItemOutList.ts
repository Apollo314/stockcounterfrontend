/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemOut } from './ItemOut';

export type PaginatedItemOutList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<ItemOut>;
};
