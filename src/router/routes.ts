import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

type Extension = {
  meta?: {
    key?: string | number | symbol;
    /**
     * a function that will return the key to use in <router-view>'s
     * <Component>
     */
    keyFunc?: (
      route: RouteLocationNormalizedLoaded
    ) => string | number | symbol;
    /**
     * key in <router-view>'s <Component> will be route.path
     */
    pathAsKey?: boolean;
  };
  children?: RouteRecordRawExtended[];
};

type RouteRecordRawExtended = RouteRecordRaw & Extension;
export type RouteLocationNormalizedLoadedExtended =
  RouteLocationNormalizedLoaded & Extension;

const routes: RouteRecordRawExtended[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index/IndexPage.vue'),
        name: 'home',
        meta: { key: 'Index' },
      },
      {
        path: '/login',
        component: () => import('pages/Login/LoginPage.vue'),
        name: 'home',
      },

      // Item
      {
        path: 'items/',
        component: () => import('src/pages/Items/ListView.vue'),
        name: 'items-list',
        meta: { key: 'items-list' },
      },
      {
        path: 'items/create',
        component: () => import('pages/Items/DetailView.vue'),
        name: 'items-create',
        meta: {
          key: 'items-create',
        },
      },
      {
        path: 'items/update/:id(\\d+)',
        component: () => import('pages/Items/DetailView.vue'),
        name: 'items-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Item

      // Stockunit
      {
        path: 'stockunits/',
        component: () => import('src/pages/StockUnits/ListView.vue'),
        name: 'stockunit-list',
        meta: { key: 'stockunit-list' },
      },
      {
        path: 'stockunit/create',
        component: () => import('pages/StockUnits/DetailView.vue'),
        name: 'stockunit-create',
        meta: {
          key: 'stockunit-create',
        },
      },
      {
        path: 'stockunit/update/:name(\\w+)',
        component: () => import('pages/StockUnits/DetailView.vue'),
        name: 'stockunit-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Stockunit

      // Category
      {
        path: 'categories/',
        component: () => import('src/pages/Categories/ListView.vue'),
        name: 'category-list',
        meta: { key: 'category-list' },
      },
      {
        path: 'category/create',
        component: () => import('pages/Categories/DetailView.vue'),
        name: 'category-create',
        meta: {
          key: 'category-create',
        },
      },
      {
        path: 'category/update/:name(\\w+)',
        component: () => import('pages/Categories/DetailView.vue'),
        name: 'category-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Category

      // Warehouse
      {
        path: 'warehouses/',
        component: () => import('src/pages/Warehouses/ListView.vue'),
        name: 'warehouse-list',
        meta: { key: 'warehouse-list' },
      },
      {
        path: 'warehouses/create',
        component: () => import('pages/Warehouses/DetailView.vue'),
        name: 'warehouse-create',
        meta: {
          key: 'warehouse-create',
        },
      },
      {
        path: 'warehouses/update/:id(\\d+)',
        component: () => import('pages/Warehouses/DetailView.vue'),
        name: 'warehouse-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Warehouse

      // Stakeholder / Customer
      {
        path: 'customers/',
        component: () => import('src/pages/Customers/ListView.vue'),
        name: 'customer-list',
        meta: { key: 'customer-list' },
      },
      {
        path: 'customer/create',
        component: () => import('pages/Customers/DetailView.vue'),
        name: 'customer-create',
        meta: {
          key: 'customer-create',
        },
      },
      {
        path: 'customer/update/:id(\\d+)',
        component: () => import('pages/Customers/DetailView.vue'),
        name: 'customer-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Stakeholder / Customer

      // Stakeholder / Supplier
      {
        path: 'suppliers/',
        component: () => import('src/pages/Suppliers/ListView.vue'),
        name: 'supplier-list',
        meta: { key: 'supplier-list' },
      },
      {
        path: 'supplier/create',
        component: () => import('pages/Suppliers/DetailView.vue'),
        name: 'supplier-create',
        meta: {
          key: 'supplier-create',
        },
      },
      {
        path: 'supplier/update/:id(\\d+)',
        component: () => import('pages/Suppliers/DetailView.vue'),
        name: 'supplier-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Stakeholder / Supplier

      // Invoice
      {
        path: 'sale-invoices/',
        component: () => import('pages/Invoices/ListView.vue'),
        name: 'sale-invoice-list',
        meta: { key: 'sale-invoice-list' },
        props() {
          return {
            invoiceType: 'sale',
          };
        },
      },
      {
        path: 'sale-invoices/create',
        component: () => import('pages/Invoices/DetailView.vue'),
        name: 'sale-invoice-create',
        meta: {
          key: 'sale-invoice-create',
        },
        props() {
          return {
            invoiceType: 'sale',
          };
        },
      },
      {
        path: 'purchase-invoices/',
        component: () => import('pages/Invoices/ListView.vue'),
        name: 'purchase-invoice-list',
        meta: { key: 'purchase-invoice-list' },
        props() {
          return {
            invoiceType: 'purchase',
          };
        },
      },
      {
        path: 'purchase-invoices/create',
        component: () => import('pages/Invoices/DetailView.vue'),
        name: 'purchase-invoice-create',
        meta: {
          key: 'purchase-invoice-create',
        },
        props() {
          return {
            invoiceType: 'purchase',
          };
        },
      },
      {
        path: 'refund-sale-invoices/',
        component: () => import('pages/Invoices/ListView.vue'),
        name: 'refund-sale-invoice-list',
        meta: { key: 'refund-sale-invoice-list' },
        props() {
          return {
            invoiceType: 'refund-sale',
          };
        },
      },
      {
        path: 'refund-sale-invoices/create',
        component: () => import('pages/Invoices/DetailView.vue'),
        name: 'refund-sale-invoice-create',
        meta: {
          key: 'refund-sale-invoice-create',
        },
        props() {
          return {
            invoiceType: 'refund-sale',
          };
        },
      },
      {
        path: 'refund-purchase-invoices/',
        component: () => import('pages/Invoices/ListView.vue'),
        name: 'refund-purchase-invoice-list',
        meta: { key: 'refund-purchase-invoice-list' },
        props() {
          return {
            invoiceType: 'refund-purchase',
          };
        },
      },
      {
        path: 'refund-purchase-invoices/create',
        component: () => import('pages/Invoices/DetailView.vue'),
        name: 'refund-purchase-invoice-create',
        meta: {
          key: 'refund-purchase-invoice-create',
        },
        props() {
          return {
            invoiceType: 'refund-purchase',
          };
        },
      },
      {
        path: 'invoices/:id(\\d+)',
        component: () => import('pages/Invoices/DetailView.vue'),
        name: 'invoice-detail',
        meta: { pathAsKey: true },
        props: true,
      },
      // Invoice

      // invoice condition
      {
        path: 'invoice/conditions',
        component: () =>
          import('src/pages/Invoices/InvoiceConditions/ListView.vue'),
        name: 'invoice-condition-list',
        meta: { key: 'invoice-condition-list' },
      },
      {
        path: 'invoice/conditions/create',
        component: () =>
          import('pages/Invoices/InvoiceConditions/DetailView.vue'),
        name: 'invoice-condition-create',
        meta: {
          key: 'invoice-condition-create',
        },
      },
      {
        path: 'invoice/conditions/:id([\\w-]+)',
        component: () =>
          import('pages/Invoices/InvoiceConditions/DetailView.vue'),
        name: 'invoice-condition-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // invoice condition

      // payments
      // payment accounts
      {
        path: 'payment/accounts',
        component: () =>
          import('src/pages/Payments/PaymentAccounts/ListView.vue'),
        name: 'payment-accounts-list',
        meta: { key: 'payment-accounts-list' },
      },
      {
        path: 'payment/accounts/create',
        component: () =>
          import('src/pages/Payments/PaymentAccounts/DetailView.vue'),
        name: 'payment-accounts-create',
        meta: {
          key: 'payment-accounts-create',
        },
      },
      {
        path: 'payment/accounts/:id([\\w-]+)',
        component: () =>
          import('src/pages/Payments/PaymentAccounts/DetailView.vue'),
        name: 'payment-account-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // payment accounts
      // banks
      {
        path: 'banks',
        component: () => import('src/pages/Payments/Banks/ListView.vue'),
        name: 'bank-list',
        meta: { key: 'bank-list' },
      },
      {
        path: 'banks/create',
        component: () => import('src/pages/Payments/Banks/DetailView.vue'),
        name: 'bank-create',
        meta: {
          key: 'bank-create',
        },
      },
      {
        path: 'banks/:id([\\w-]+)',
        component: () => import('src/pages/Payments/Banks/DetailView.vue'),
        name: 'bank-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // banks
      // {
      //   path: 'invoice/conditions/:id([\\w-]+)',
      //   component: () =>
      //     import('pages/Invoices/InvoiceConditions/DetailView.vue'),
      //   name: 'invoice-condition-update',
      //   meta: { pathAsKey: true },
      //   props: true,
      // },
      // payments

      {
        path: '/:id(\\d+)',
        component: () => import('pages/Index/IndexPage.vue'),
        name: 'nest',
      },
      {
        path: 'another/',
        component: () => import('pages/Index/IndexPage2.vue'),
        name: 'another',
      },
      {
        path: 'settings/',
        component: () => import('pages/Settings/SettingsPage.vue'),
        name: 'settings',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound/ErrorNotFound.vue'),
  },
];

export default routes;
