/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SimpleCategory } from './SimpleCategory';

export type Category = {
  readonly id: number;
  name: string;
  parent?: number | null;
  readonly children: Array<SimpleCategory>;
};
