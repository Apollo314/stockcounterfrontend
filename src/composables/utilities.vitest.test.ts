import { describe, expect, it } from 'vitest';

import { Pagination } from '../components/DataTable/DataTable.vue';

import { NestedRecord } from './openapihelpers';
import { deepCamelCase, queryMaker } from './utilities';

describe('deepCamelCase', () => {
  it('should camelize deeply nested object', () => {
    const myobj: NestedRecord = {
      limit: 10,
      value_one: 1,
      value_two: { value_three: 2 },
    };
    deepCamelCase(myobj);
    expect(myobj).toStrictEqual({
      limit: 10,
      valueOne: 1,
      valueTwo: { valueThree: 2 },
    });
  });
});

describe('queryMaker', () => {
  it('should convert a pagination to query', () => {
    const pg: Pagination<Record<string, string>> = {
      count: 10,
      filters: { created_at: '20' },
      limit: 15,
      offset: 0,
    };
    const query = queryMaker(pg);
    expect(query).toStrictEqual({
      createdAt: '20',
      limit: 15,
      offset: 0,
    });
  });
});
