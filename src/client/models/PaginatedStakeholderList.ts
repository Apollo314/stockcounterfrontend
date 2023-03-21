/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Stakeholder } from './Stakeholder';

export type PaginatedStakeholderList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<Stakeholder>;
};
