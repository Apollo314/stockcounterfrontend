/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceItemWithDetailedInvoice } from './InvoiceItemWithDetailedInvoice';
import type { WarehouseItemStockInfo } from './WarehouseItemStockInfo';

export type StockMovementWithoutItem = {
  readonly id: number;
  warehouse_item_stock: WarehouseItemStockInfo;
  amount: string;
  invoice_item: InvoiceItemWithDetailedInvoice;
};
