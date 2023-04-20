import { Ref, ref } from 'vue';

import {
  CorrectResponseObject,
  ExtendedParameterObject,
  OperationObject,
  SchemaObject,
  dereference,
} from 'src/composables/openapihelpers';

import { BaseColumn, ColumnsOverride, BaseRow } from './DataTable.vue';

export const FILTER_SUFFIXES = [
  'iexact',
  'contains',
  'icontains',
  'in',
  'gt',
  'gte',
  'lt',
  'lte',
  'startswith',
  'istartswith',
  'endswith',
  'iendswith',
  'date',
  'year',
  'iso_year',
  'month',
  'day',
  'week',
  'week_day',
  'iso_week_day',
  'quarter',
  'time',
  'hour',
  'minute',
  'second',
  'regex',
  'iregex',
  'range',
  'isnull',
];

const getOrderableColumns = (
  operation: OperationObject,
  ordering_parameter_name = 'ordering'
) => {
  const parameters = operation.parameters as ExtendedParameterObject[];
  for (const parameter of parameters) {
    if (parameter.name === ordering_parameter_name) {
      return parameter.schema?.enum?.filter(
        (column) => !(column as string).startsWith('-')
      ) as string[];
    }
  }
};

const isOrderable = <Row extends BaseRow, Column extends BaseColumn<Row>>(
  orderableColumns: ReturnType<typeof getOrderableColumns>,
  column: Column
) => {
  return orderableColumns?.includes(column.id);
};

const isFilterable = <Row extends BaseRow, Column extends BaseColumn<Row>>(
  operation: OperationObject,
  column: Column
) => {
  const parameters = operation.parameters as ExtendedParameterObject[];
  for (const parameter of parameters) {
    if (parameter.name === column.id) {
      return true;
    } else if (parameter.name.startsWith(column.id)) {
      const remainder = parameter.name.slice(column.id.length + 2);
      if (FILTER_SUFFIXES.includes(remainder)) {
        return true;
      }
    }
  }
  return false;
};

const extractSchemaFromOperation = (operation: OperationObject) => {
  const responseSchema = (operation.responses[200] as CorrectResponseObject)
    .content?.['application/json'].schema;
  if (responseSchema) {
    const derefedSchema = dereference(responseSchema) as Extract<
      SchemaObject,
      { type: 'object' }
    >;
    const properties = derefedSchema.properties;
    if (!properties) {
      return;
    }
    const results = properties['results'] as Extract<
      SchemaObject,
      { type: 'array' }
    >;
    if (!results) {
      return;
    }
    const items = results.items;
    if (!items) {
      return;
    }
    return items as Extract<SchemaObject, { type: 'object' }>;
  }
  return;
};

export function ColumnsGenerator<
  Column extends BaseColumn<Row>,
  Row extends BaseRow
>(columnsOverride: ColumnsOverride<Column, Row>, operation?: OperationObject) {
  const columns = ref<Column[]>([]) as Ref<Column[]>;
  const operationSchema =
    operation !== undefined ? extractSchemaFromOperation(operation) : undefined;
  for (const key in columnsOverride) {
    const co = columnsOverride[key];

    const schemaField = operationSchema?.properties?.[key] as
      | SchemaObject
      | undefined;

    const column: Column = {
      field: key as string,
      id: key as string,
      label: schemaField?.title || (key as string),
    } as Column;
    if (operation) {
      const orderableColumns = getOrderableColumns(operation, 'ordering');
      column.orderable = isOrderable<Row, Column>(orderableColumns, column);
      column.filterable = isFilterable<Row, Column>(operation, column);
    }
    Object.assign(column, co);
    columns.value.push(column);
  }
  return columns;
}

export function getAlignClass(align?: 'left' | 'center' | 'right') {
  return {
    'text-left': align === 'left' || align === undefined,
    'text-right': align === 'right',
    'text-center': align === 'center',
  };
}
