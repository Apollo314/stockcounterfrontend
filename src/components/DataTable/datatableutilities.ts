import { BaseColumn, ColumnsOverride, BaseRow } from './DataTable.vue';

export function ColumnsGenerator<
  Column extends BaseColumn<Row>,
  Row extends BaseRow
>(columnsOverride: ColumnsOverride<Column, Row>) {
  const columns = [];
  for (const key in columnsOverride) {
    const co = columnsOverride[key];
    const column: Column = {
      field: key as string,
      id: key as string,
      label: key as string,
    } as Column;
    Object.assign(column, co);
    columns.push(column);
  }
  return columns;
}
