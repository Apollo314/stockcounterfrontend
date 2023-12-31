/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { AppClient } from './AppClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { BalanceGraphWidget } from './models/BalanceGraphWidget';
export type { Balances } from './models/Balances';
export type { BalanceWidget } from './models/BalanceWidget';
export type { Bank } from './models/Bank';
export type { BankForStakeholderPaymentAccount } from './models/BankForStakeholderPaymentAccount';
export type { BankForStakeholderPaymentAccountRequest } from './models/BankForStakeholderPaymentAccountRequest';
export type { BankOut } from './models/BankOut';
export type { BankRequest } from './models/BankRequest';
export type { BestCustomerWidget } from './models/BestCustomerWidget';
export type { Category } from './models/Category';
export type { CategoryRequest } from './models/CategoryRequest';
export type { ConciseUser } from './models/ConciseUser';
export type { ConciseUserRequest } from './models/ConciseUserRequest';
export type { ContentType } from './models/ContentType';
export type { CurrencyEnum } from './models/CurrencyEnum';
export type { Dashboard } from './models/Dashboard';
export type { Group } from './models/Group';
export type { GroupDetail } from './models/GroupDetail';
export type { GroupRequest } from './models/GroupRequest';
export type { InvoiceConditionIn } from './models/InvoiceConditionIn';
export type { InvoiceConditionInRequest } from './models/InvoiceConditionInRequest';
export type { InvoiceConditionTemplateIn } from './models/InvoiceConditionTemplateIn';
export type { InvoiceConditionTemplateInRequest } from './models/InvoiceConditionTemplateInRequest';
export type { InvoiceConditionTemplateOut } from './models/InvoiceConditionTemplateOut';
export type { InvoiceConditionTemplateWithId } from './models/InvoiceConditionTemplateWithId';
export type { InvoiceConditionTemplateWithIdRequest } from './models/InvoiceConditionTemplateWithIdRequest';
export type { InvoiceDetailIn } from './models/InvoiceDetailIn';
export type { InvoiceDetailInRequest } from './models/InvoiceDetailInRequest';
export type { InvoiceDetailOut } from './models/InvoiceDetailOut';
export type { InvoiceDetailOutForInvoiceItem } from './models/InvoiceDetailOutForInvoiceItem';
export type { InvoiceDetailOutForInvoiceItemRequest } from './models/InvoiceDetailOutForInvoiceItemRequest';
export type { InvoiceItem } from './models/InvoiceItem';
export type { InvoiceItemRequest } from './models/InvoiceItemRequest';
export type { InvoiceItemWithDetailedInvoice } from './models/InvoiceItemWithDetailedInvoice';
export type { InvoiceItemWithDetailedInvoiceRequest } from './models/InvoiceItemWithDetailedInvoiceRequest';
export type { InvoiceList } from './models/InvoiceList';
export type { InvoiceListRequest } from './models/InvoiceListRequest';
export type { InvoicePayment } from './models/InvoicePayment';
export type { InvoicePaymentRequest } from './models/InvoicePaymentRequest';
export type { InvoiceTypeEnum } from './models/InvoiceTypeEnum';
export type { InvoiceWidget } from './models/InvoiceWidget';
export type { ItemDetail } from './models/ItemDetail';
export type { ItemIn } from './models/ItemIn';
export type { ItemInRequest } from './models/ItemInRequest';
export type { ItemNested } from './models/ItemNested';
export type { ItemNestedRequest } from './models/ItemNestedRequest';
export type { ItemOut } from './models/ItemOut';
export type { ItemWidget } from './models/ItemWidget';
export type { Login } from './models/Login';
export type { LoginRequest } from './models/LoginRequest';
export type { LogoutRequest } from './models/LogoutRequest';
export type { PaginatedBankOutList } from './models/PaginatedBankOutList';
export type { PaginatedCategoryList } from './models/PaginatedCategoryList';
export type { PaginatedGroupDetailList } from './models/PaginatedGroupDetailList';
export type { PaginatedInvoiceConditionTemplateOutList } from './models/PaginatedInvoiceConditionTemplateOutList';
export type { PaginatedInvoiceListList } from './models/PaginatedInvoiceListList';
export type { PaginatedInvoicePaymentList } from './models/PaginatedInvoicePaymentList';
export type { PaginatedItemOutList } from './models/PaginatedItemOutList';
export type { PaginatedPaymentAccountOutList } from './models/PaginatedPaymentAccountOutList';
export type { PaginatedPaymentOutList } from './models/PaginatedPaymentOutList';
export type { PaginatedPermissionList } from './models/PaginatedPermissionList';
export type { PaginatedStakeholderEmployeeList } from './models/PaginatedStakeholderEmployeeList';
export type { PaginatedStakeholderList } from './models/PaginatedStakeholderList';
export type { PaginatedStockMovementWithoutItemList } from './models/PaginatedStockMovementWithoutItemList';
export type { PaginatedStockUnitList } from './models/PaginatedStockUnitList';
export type { PaginatedSubscribedWidgetList } from './models/PaginatedSubscribedWidgetList';
export type { PaginatedUserList } from './models/PaginatedUserList';
export type { PaginatedWarehouseItemStockInfoList } from './models/PaginatedWarehouseItemStockInfoList';
export type { PaginatedWarehouseList } from './models/PaginatedWarehouseList';
export type { PatchedBankRequest } from './models/PatchedBankRequest';
export type { PatchedCategoryRequest } from './models/PatchedCategoryRequest';
export type { PatchedConciseUserRequest } from './models/PatchedConciseUserRequest';
export type { PatchedGroupRequest } from './models/PatchedGroupRequest';
export type { PatchedInvoiceConditionTemplateOutRequest } from './models/PatchedInvoiceConditionTemplateOutRequest';
export type { PatchedInvoiceListRequest } from './models/PatchedInvoiceListRequest';
export type { PatchedInvoicePaymentRequest } from './models/PatchedInvoicePaymentRequest';
export type { PatchedItemInRequest } from './models/PatchedItemInRequest';
export type { PatchedPaymentAccountOutRequest } from './models/PatchedPaymentAccountOutRequest';
export type { PatchedPaymentOutRequest } from './models/PatchedPaymentOutRequest';
export type { PatchedStakeholderEmployeeRequest } from './models/PatchedStakeholderEmployeeRequest';
export type { PatchedStakeholderRequest } from './models/PatchedStakeholderRequest';
export type { PatchedStockMovementWithoutItemRequest } from './models/PatchedStockMovementWithoutItemRequest';
export type { PatchedStockUnitRequest } from './models/PatchedStockUnitRequest';
export type { PatchedSubscribedWidgetRequest } from './models/PatchedSubscribedWidgetRequest';
export type { PatchedWarehouseRequest } from './models/PatchedWarehouseRequest';
export type { Payment } from './models/Payment';
export type { PaymentAccountForStakeholder } from './models/PaymentAccountForStakeholder';
export type { PaymentAccountForStakeholderRequest } from './models/PaymentAccountForStakeholderRequest';
export type { PaymentAccountIn } from './models/PaymentAccountIn';
export type { PaymentAccountInRequest } from './models/PaymentAccountInRequest';
export type { PaymentAccountOut } from './models/PaymentAccountOut';
export type { PaymentAccountOutSimple } from './models/PaymentAccountOutSimple';
export type { PaymentAccountOutSimpleRequest } from './models/PaymentAccountOutSimpleRequest';
export type { PaymentOut } from './models/PaymentOut';
export type { PaymentOutRequest } from './models/PaymentOutRequest';
export type { PaymentRequest } from './models/PaymentRequest';
export type { PaymentTypeEnum } from './models/PaymentTypeEnum';
export type { Permission } from './models/Permission';
export type { RoleEnum } from './models/RoleEnum';
export type { SimpleCategory } from './models/SimpleCategory';
export type { SimpleCategoryRequest } from './models/SimpleCategoryRequest';
export type { Stakeholder } from './models/Stakeholder';
export type { StakeholderBasic } from './models/StakeholderBasic';
export type { StakeholderBasicRequest } from './models/StakeholderBasicRequest';
export type { StakeholderEmployee } from './models/StakeholderEmployee';
export type { StakeholderEmployeeRequest } from './models/StakeholderEmployeeRequest';
export type { StakeholderRequest } from './models/StakeholderRequest';
export type { StockMovementNested } from './models/StockMovementNested';
export type { StockMovementNestedRequest } from './models/StockMovementNestedRequest';
export type { StockMovementWithoutItem } from './models/StockMovementWithoutItem';
export type { StockMovementWithoutItemRequest } from './models/StockMovementWithoutItemRequest';
export type { StockUnit } from './models/StockUnit';
export type { StockUnitNested } from './models/StockUnitNested';
export type { StockUnitNestedRequest } from './models/StockUnitNestedRequest';
export type { StockUnitRequest } from './models/StockUnitRequest';
export type { SubscribedWidget } from './models/SubscribedWidget';
export type { SubscribedWidgetRequest } from './models/SubscribedWidgetRequest';
export type { User } from './models/User';
export type { UserCreate } from './models/UserCreate';
export type { UserCreateRequest } from './models/UserCreateRequest';
export type { UserRequest } from './models/UserRequest';
export type { UserUpdate } from './models/UserUpdate';
export type { UserUpdateRequest } from './models/UserUpdateRequest';
export type { UserWithGroupDetail } from './models/UserWithGroupDetail';
export type { Warehouse } from './models/Warehouse';
export type { WarehouseItemStock } from './models/WarehouseItemStock';
export type { WarehouseItemStockInfo } from './models/WarehouseItemStockInfo';
export type { WarehouseItemStockINFO_ONLY } from './models/WarehouseItemStockINFO_ONLY';
export type { WarehouseItemStockINFO_ONLYRequest } from './models/WarehouseItemStockINFO_ONLYRequest';
export type { WarehouseItemStockInfoRequest } from './models/WarehouseItemStockInfoRequest';
export type { WarehouseItemStockNested } from './models/WarehouseItemStockNested';
export type { WarehouseItemStockNestedRequest } from './models/WarehouseItemStockNestedRequest';
export type { WarehouseItemStockRequest } from './models/WarehouseItemStockRequest';
export type { WarehouseRequest } from './models/WarehouseRequest';
export type { widget_data } from './models/widget_data';
export type { WidgetNameEnum } from './models/WidgetNameEnum';

export { ApiService } from './services/ApiService';
export { DashboardService } from './services/DashboardService';
export { InventoryService } from './services/InventoryService';
export { InvoiceService } from './services/InvoiceService';
export { PaymentsService } from './services/PaymentsService';
export { StakeholderService } from './services/StakeholderService';
export { UserService } from './services/UserService';
