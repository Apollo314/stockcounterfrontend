import { MaybeRef } from '@vueuse/core';
import camelCase from 'camelcase';
import { unref } from 'vue';

import { Pagination } from '../components/DataTable/DataTable.vue';

import { NestedRecord } from './openapihelpers';

export function callOrGet<T, Args>(
  value: T | ((...args: Args[]) => T),
  args?: Args[]
): T {
  return value instanceof Function ? value(...(args || [])) : value;
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
      if (typeof element === 'object' && !Array.isArray(element)) {
        deepCamelCase(element);
      }
    }
  }
}

export function queryMaker(
  pagination: MaybeRef<Pagination<Record<string, string | undefined>>>
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
