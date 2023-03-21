/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CategoryRequest } from '../models/CategoryRequest';
import type { ItemDetail } from '../models/ItemDetail';
import type { ItemIn } from '../models/ItemIn';
import type { ItemInRequest } from '../models/ItemInRequest';
import type { PaginatedCategoryList } from '../models/PaginatedCategoryList';
import type { PaginatedItemOutList } from '../models/PaginatedItemOutList';
import type { PaginatedStockMovementWithoutItemList } from '../models/PaginatedStockMovementWithoutItemList';
import type { PaginatedStockUnitList } from '../models/PaginatedStockUnitList';
import type { PaginatedWarehouseItemStockInfoList } from '../models/PaginatedWarehouseItemStockInfoList';
import type { PaginatedWarehouseList } from '../models/PaginatedWarehouseList';
import type { PatchedCategoryRequest } from '../models/PatchedCategoryRequest';
import type { PatchedItemInRequest } from '../models/PatchedItemInRequest';
import type { PatchedStockMovementWithoutItemRequest } from '../models/PatchedStockMovementWithoutItemRequest';
import type { PatchedStockUnitRequest } from '../models/PatchedStockUnitRequest';
import type { PatchedWarehouseRequest } from '../models/PatchedWarehouseRequest';
import type { StockMovementWithoutItem } from '../models/StockMovementWithoutItem';
import type { StockMovementWithoutItemRequest } from '../models/StockMovementWithoutItemRequest';
import type { StockUnit } from '../models/StockUnit';
import type { StockUnitRequest } from '../models/StockUnitRequest';
import type { Warehouse } from '../models/Warehouse';
import type { WarehouseItemStockInfo } from '../models/WarehouseItemStockInfo';
import type { WarehouseRequest } from '../models/WarehouseRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InventoryService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryBulkCategoryDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/bulk/category/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryBulkItemPartialUpdate({
    pk,
    requestBody,
  }: {
    pk: Array<string>;
    requestBody: Array<PatchedItemInRequest>;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/bulk/item/',
      query: {
        pk: pk,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryBulkItemDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/bulk/item/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryBulkStockUnitDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/bulk/stock-unit/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryBulkWarehouseDestroy({
    pk,
  }: {
    pk: Array<string>;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/bulk/warehouse/',
      query: {
        pk: pk,
      },
    });
  }

  /**
   * @returns PaginatedCategoryList
   * @throws ApiError
   */
  public inventoryCategoryList({
    limit,
    offset,
    ordering,
    search,
  }: {
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Which field to use when ordering the results.
     */
    ordering?: 'id' | 'name' | '-id' | '-name';
    /**
     * Ara: Kategori
     */
    search?: string;
  }): CancelablePromise<PaginatedCategoryList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/category/',
      query: {
        limit: limit,
        offset: offset,
        ordering: ordering,
        search: search,
      },
    });
  }

  /**
   * @returns Category
   * @throws ApiError
   */
  public inventoryCategoryCreate({
    requestBody,
  }: {
    requestBody: CategoryRequest;
  }): CancelablePromise<Category> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/inventory/category/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Category
   * @throws ApiError
   */
  public inventoryCategoryRetrieve({
    name,
  }: {
    name: string;
  }): CancelablePromise<Category> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/category/{name}/',
      path: {
        name: name,
      },
    });
  }

  /**
   * @returns Category
   * @throws ApiError
   */
  public inventoryCategoryUpdate({
    name,
    requestBody,
  }: {
    name: string;
    requestBody: CategoryRequest;
  }): CancelablePromise<Category> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/category/{name}/',
      path: {
        name: name,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Category
   * @throws ApiError
   */
  public inventoryCategoryPartialUpdate({
    name,
    requestBody,
  }: {
    name: string;
    requestBody?: PatchedCategoryRequest;
  }): CancelablePromise<Category> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/category/{name}/',
      path: {
        name: name,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryCategoryDestroy({
    name,
  }: {
    name: string;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/category/{name}/',
      path: {
        name: name,
      },
    });
  }

  /**
   * @returns PaginatedItemOutList
   * @throws ApiError
   */
  public inventoryItemList({
    buypriceRange,
    categoryIn,
    categoryIsnull,
    createdAtRange,
    createdBy,
    inactivated,
    limit,
    offset,
    ordering,
    search,
    sellpriceRange,
    updatedAtRange,
    updatedBy,
  }: {
    /**
     * buyprice__range
     */
    buypriceRange?: string;
    /**
     * category__in
     */
    categoryIn?: string;
    /**
     * category__isnull
     */
    categoryIsnull?: string;
    /**
     * created_at__range
     */
    createdAtRange?: string;
    /**
     * created_by
     */
    createdBy?: string;
    /**
     * inactivated
     */
    inactivated?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Which field to use when ordering the results.
     */
    ordering?:
      | 'id'
      | 'name'
      | 'created_at'
      | 'buyprice'
      | 'sellprice'
      | 'updated_at'
      | 'category'
      | '-id'
      | '-name'
      | '-created_at'
      | '-buyprice'
      | '-sellprice'
      | '-updated_at'
      | '-category';
    /**
     * Ara: Ürün/Hizmet, Açıklama
     */
    search?: string;
    /**
     * sellprice__range
     */
    sellpriceRange?: string;
    /**
     * updated_at__range
     */
    updatedAtRange?: string;
    /**
     * updated_by
     */
    updatedBy?: string;
  }): CancelablePromise<PaginatedItemOutList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/item/',
      query: {
        buyprice__range: buypriceRange,
        category__in: categoryIn,
        category__isnull: categoryIsnull,
        created_at__range: createdAtRange,
        created_by: createdBy,
        inactivated: inactivated,
        limit: limit,
        offset: offset,
        ordering: ordering,
        search: search,
        sellprice__range: sellpriceRange,
        updated_at__range: updatedAtRange,
        updated_by: updatedBy,
      },
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryItemCreate({
    requestBody,
  }: {
    requestBody: ItemInRequest;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/inventory/item/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaginatedItemOutList
   * @throws ApiError
   */
  public inventoryItemHistoryList({
    buypriceRange,
    categoryIn,
    categoryIsnull,
    createdAtRange,
    createdBy,
    inactivated,
    limit,
    offset,
    ordering,
    search,
    sellpriceRange,
    updatedAtRange,
    updatedBy,
  }: {
    /**
     * buyprice__range
     */
    buypriceRange?: string;
    /**
     * category__in
     */
    categoryIn?: string;
    /**
     * category__isnull
     */
    categoryIsnull?: string;
    /**
     * created_at__range
     */
    createdAtRange?: string;
    /**
     * created_by
     */
    createdBy?: string;
    /**
     * inactivated
     */
    inactivated?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Which field to use when ordering the results.
     */
    ordering?:
      | 'id'
      | 'name'
      | 'created_at'
      | 'updated_at'
      | 'buyprice'
      | 'sellprice'
      | 'category'
      | '-id'
      | '-name'
      | '-created_at'
      | '-updated_at'
      | '-buyprice'
      | '-sellprice'
      | '-category';
    /**
     * Ara: Ürün/Hizmet, Açıklama
     */
    search?: string;
    /**
     * sellprice__range
     */
    sellpriceRange?: string;
    /**
     * updated_at__range
     */
    updatedAtRange?: string;
    /**
     * updated_by
     */
    updatedBy?: string;
  }): CancelablePromise<PaginatedItemOutList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/item-history/',
      query: {
        buyprice__range: buypriceRange,
        category__in: categoryIn,
        category__isnull: categoryIsnull,
        created_at__range: createdAtRange,
        created_by: createdBy,
        inactivated: inactivated,
        limit: limit,
        offset: offset,
        ordering: ordering,
        search: search,
        sellprice__range: sellpriceRange,
        updated_at__range: updatedAtRange,
        updated_by: updatedBy,
      },
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryItemHistoryCreate({
    requestBody,
  }: {
    requestBody: ItemInRequest;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/inventory/item-history/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns ItemDetail
   * @throws ApiError
   */
  public inventoryItemHistoryRetrieve({
    historyId,
  }: {
    /**
     * A unique integer value identifying this historical item.
     */
    historyId: number;
  }): CancelablePromise<ItemDetail> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/item-history/{history_id}/',
      path: {
        history_id: historyId,
      },
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryItemHistoryUpdate({
    historyId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this historical item.
     */
    historyId: number;
    requestBody: ItemInRequest;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/item-history/{history_id}/',
      path: {
        history_id: historyId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryItemHistoryPartialUpdate({
    historyId,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this historical item.
     */
    historyId: number;
    requestBody?: PatchedItemInRequest;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/item-history/{history_id}/',
      path: {
        history_id: historyId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryItemHistoryDestroy({
    historyId,
  }: {
    /**
     * A unique integer value identifying this historical item.
     */
    historyId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/item-history/{history_id}/',
      path: {
        history_id: historyId,
      },
    });
  }

  /**
   * @returns ItemDetail
   * @throws ApiError
   */
  public inventoryItemRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this item.
     */
    id: number;
  }): CancelablePromise<ItemDetail> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/item/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryItemUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this item.
     */
    id: number;
    requestBody: ItemInRequest;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/item/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns ItemIn
   * @throws ApiError
   */
  public inventoryItemPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this item.
     */
    id: number;
    requestBody?: PatchedItemInRequest;
  }): CancelablePromise<ItemIn> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/item/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryItemDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this item.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/item/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedStockMovementWithoutItemList
   * @throws ApiError
   */
  public inventoryStockMovementList({
    createdAtRange,
    createdBy,
    limit,
    offset,
    ordering,
    search,
    updatedAtRange,
    updatedBy,
    warehouseItemStockItemId,
  }: {
    /**
     * created_at__range
     */
    createdAtRange?: string;
    /**
     * created_by
     */
    createdBy?: string;
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Which field to use when ordering the results.
     */
    ordering?:
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'created_by'
      | 'updated_by'
      | '-id'
      | '-created_at'
      | '-updated_at'
      | '-created_by'
      | '-updated_by';
    /**
     * Ara: Ürün/Hizmet
     */
    search?: string;
    /**
     * updated_at__range
     */
    updatedAtRange?: string;
    /**
     * updated_by
     */
    updatedBy?: string;
    /**
     * warehouse_item_stock__item__id
     */
    warehouseItemStockItemId?: string;
  }): CancelablePromise<PaginatedStockMovementWithoutItemList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/stock-movement/',
      query: {
        created_at__range: createdAtRange,
        created_by: createdBy,
        limit: limit,
        offset: offset,
        ordering: ordering,
        search: search,
        updated_at__range: updatedAtRange,
        updated_by: updatedBy,
        warehouse_item_stock__item__id: warehouseItemStockItemId,
      },
    });
  }

  /**
   * @returns StockMovementWithoutItem
   * @throws ApiError
   */
  public inventoryStockMovementCreate({
    requestBody,
  }: {
    requestBody: StockMovementWithoutItemRequest;
  }): CancelablePromise<StockMovementWithoutItem> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/inventory/stock-movement/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns StockMovementWithoutItem
   * @throws ApiError
   */
  public inventoryStockMovementRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this stock movement.
     */
    id: number;
  }): CancelablePromise<StockMovementWithoutItem> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/stock-movement/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns StockMovementWithoutItem
   * @throws ApiError
   */
  public inventoryStockMovementUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stock movement.
     */
    id: number;
    requestBody: StockMovementWithoutItemRequest;
  }): CancelablePromise<StockMovementWithoutItem> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/stock-movement/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns StockMovementWithoutItem
   * @throws ApiError
   */
  public inventoryStockMovementPartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this stock movement.
     */
    id: number;
    requestBody?: PatchedStockMovementWithoutItemRequest;
  }): CancelablePromise<StockMovementWithoutItem> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/stock-movement/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryStockMovementDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this stock movement.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/stock-movement/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns PaginatedStockUnitList
   * @throws ApiError
   */
  public inventoryStockUnitList({
    limit,
    offset,
    ordering,
    search,
  }: {
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Which field to use when ordering the results.
     */
    ordering?: 'id' | 'name' | '-id' | '-name';
    /**
     * Ara: Birim
     */
    search?: string;
  }): CancelablePromise<PaginatedStockUnitList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/stock_unit/',
      query: {
        limit: limit,
        offset: offset,
        ordering: ordering,
        search: search,
      },
    });
  }

  /**
   * @returns StockUnit
   * @throws ApiError
   */
  public inventoryStockUnitCreate({
    requestBody,
  }: {
    requestBody: StockUnitRequest;
  }): CancelablePromise<StockUnit> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/inventory/stock_unit/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns StockUnit
   * @throws ApiError
   */
  public inventoryStockUnitRetrieve({
    name,
  }: {
    name: string;
  }): CancelablePromise<StockUnit> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/stock_unit/{name}/',
      path: {
        name: name,
      },
    });
  }

  /**
   * @returns StockUnit
   * @throws ApiError
   */
  public inventoryStockUnitUpdate({
    name,
    requestBody,
  }: {
    name: string;
    requestBody: StockUnitRequest;
  }): CancelablePromise<StockUnit> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/stock_unit/{name}/',
      path: {
        name: name,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns StockUnit
   * @throws ApiError
   */
  public inventoryStockUnitPartialUpdate({
    name,
    requestBody,
  }: {
    name: string;
    requestBody?: PatchedStockUnitRequest;
  }): CancelablePromise<StockUnit> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/stock_unit/{name}/',
      path: {
        name: name,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryStockUnitDestroy({
    name,
  }: {
    name: string;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/stock_unit/{name}/',
      path: {
        name: name,
      },
    });
  }

  /**
   * @returns PaginatedWarehouseList
   * @throws ApiError
   */
  public inventoryWarehouseList({
    limit,
    offset,
    search,
  }: {
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Ara: Depo adı, Adress (varsa), Telefon, Plaka (varsa)
     */
    search?: string;
  }): CancelablePromise<PaginatedWarehouseList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/warehouse/',
      query: {
        limit: limit,
        offset: offset,
        search: search,
      },
    });
  }

  /**
   * @returns Warehouse
   * @throws ApiError
   */
  public inventoryWarehouseCreate({
    requestBody,
  }: {
    requestBody: WarehouseRequest;
  }): CancelablePromise<Warehouse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/inventory/warehouse/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaginatedWarehouseItemStockInfoList
   * @throws ApiError
   */
  public inventoryWarehouseItemStockList({
    limit,
    offset,
    search,
  }: {
    /**
     * Number of results to return per page.
     */
    limit?: number;
    /**
     * The initial index from which to return the results.
     */
    offset?: number;
    /**
     * Ara: Ürün/Hizmet
     */
    search?: string;
  }): CancelablePromise<PaginatedWarehouseItemStockInfoList> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/warehouse-item-stock/',
      query: {
        limit: limit,
        offset: offset,
        search: search,
      },
    });
  }

  /**
   * @returns WarehouseItemStockInfo
   * @throws ApiError
   */
  public inventoryWarehouseItemStockRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this warehouse item stock.
     */
    id: number;
  }): CancelablePromise<WarehouseItemStockInfo> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/warehouse-item-stock/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Warehouse
   * @throws ApiError
   */
  public inventoryWarehouseRetrieve({
    id,
  }: {
    /**
     * A unique integer value identifying this warehouse.
     */
    id: number;
  }): CancelablePromise<Warehouse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/inventory/warehouse/{id}/',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Warehouse
   * @throws ApiError
   */
  public inventoryWarehouseUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this warehouse.
     */
    id: number;
    requestBody: WarehouseRequest;
  }): CancelablePromise<Warehouse> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/inventory/warehouse/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Warehouse
   * @throws ApiError
   */
  public inventoryWarehousePartialUpdate({
    id,
    requestBody,
  }: {
    /**
     * A unique integer value identifying this warehouse.
     */
    id: number;
    requestBody?: PatchedWarehouseRequest;
  }): CancelablePromise<Warehouse> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/inventory/warehouse/{id}/',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public inventoryWarehouseDestroy({
    id,
  }: {
    /**
     * A unique integer value identifying this warehouse.
     */
    id: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/inventory/warehouse/{id}/',
      path: {
        id: id,
      },
    });
  }
}
