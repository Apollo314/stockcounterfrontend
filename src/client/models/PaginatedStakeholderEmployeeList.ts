/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StakeholderEmployee } from './StakeholderEmployee';

export type PaginatedStakeholderEmployeeList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<StakeholderEmployee>;
};
