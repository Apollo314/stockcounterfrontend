/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContentType } from './ContentType';

export type Permission = {
    readonly id: number;
    name: string;
    content_type: ContentType;
    codename: string;
};

