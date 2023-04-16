import { MaybeRef } from '@vueuse/core';
import camelCase from 'camelcase';
import { unref } from 'vue';

import { Pagination } from '../components/DataTable/DataTable.vue';

import { NestedRecord } from './openapihelpers';

export function callOrGet<T>(value: T | (() => T)): T {
  return value instanceof Function ? value() : value;
}

export function deepCamelCase(object: NestedRecord): void {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      const camelizedKey = camelCase(key);
      if (key !== camelizedKey) {
        object[camelizedKey] = element;
        delete object[key];
      }
      if (typeof element === 'object') {
        deepCamelCase(element);
      }
    }
  }
}

export function queryMaker(
  pagination: MaybeRef<Pagination<Record<string, string>>>
) {
  const pg = unref(pagination);
  const query = {
    limit: pg.limit,
    offset: pg.offset,
    ...pg.filters,
  };
  deepCamelCase(query);
  return query;
}
