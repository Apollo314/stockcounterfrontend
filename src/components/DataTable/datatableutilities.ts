import { Ref, ref } from 'vue';

import { BaseColumn, ColumnsOverride, BaseRow } from './DataTable.vue';

export function ColumnsGenerator<
  Column extends BaseColumn<Row>,
  Row extends BaseRow
>(columnsOverride: ColumnsOverride<Column, Row>) {
  const columns = ref<Column[]>([]) as Ref<Column[]>;
  for (const key in columnsOverride) {
    const co = columnsOverride[key];
    const column: Column = {
      field: key as string,
      id: key as string,
      label: key as string,
    } as Column;
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
