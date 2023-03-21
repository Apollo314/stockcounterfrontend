/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvoiceItemWithDetailedInvoiceRequest } from './InvoiceItemWithDetailedInvoiceRequest';
import type { WarehouseItemStockInfoRequest } from './WarehouseItemStockInfoRequest';

export type StockMovementWithoutItemRequest = {
  warehouse_item_stock: WarehouseItemStockInfoRequest;
  amount: string;
  invoice_item: InvoiceItemWithDetailedInvoiceRequest;
};
