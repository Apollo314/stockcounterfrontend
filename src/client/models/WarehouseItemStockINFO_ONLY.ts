/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * this exists so that warehouseitemstock is available in ItemNestedSerializer has access
 * to warehouseitemstock if it exists, so there won't be an unnecessary query to database
 * to get the warehouseitemstock
 */
export type WarehouseItemStockINFO_ONLY = {
  id: number;
};
