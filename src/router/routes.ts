import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';

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
        meta: { key: 'home' },
      },
      {
        path: 'login',
        component: () => import('pages/Login/LoginPage.vue'),
        name: 'login',
        meta: { key: 'login' },
      },

      // Item
      {
        path: 'items',
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
        path: 'stockunits',
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
        path: 'categories',
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
        path: 'warehouses',
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
        path: 'customers',
        component: () => import('src/pages/Stakeholders/ListView.vue'),
        name: 'customer-list',
        meta: { key: 'customer-list', role: 'customer' },
      },
      {
        path: 'customer/create',
        component: () => import('pages/Stakeholders/DetailView.vue'),
        name: 'customer-create',
        meta: {
          key: 'customer-create',
          role: 'customer',
        },
      },
      {
        path: 'customer/update/:id(\\d+)',
        component: () => import('pages/Stakeholders/DetailView.vue'),
        name: 'customer-update',
        meta: { pathAsKey: true, role: 'customer' },
        props: true,
      },
      // Stakeholder / Customer

      // Stakeholder / Supplier
      {
        path: 'suppliers',
        component: () => import('src/pages/Stakeholders/ListView.vue'),
        name: 'supplier-list',
        meta: { key: 'supplier-list' },
      },
      {
        path: 'supplier/create',
        component: () => import('pages/Stakeholders/DetailView.vue'),
        name: 'supplier-create',
        meta: {
          key: 'supplier-create',
        },
      },
      {
        path: 'supplier/update/:id(\\d+)',
        component: () => import('pages/Stakeholders/DetailView.vue'),
        name: 'supplier-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // Stakeholder / Supplier

      // Invoice
      {
        path: 'sale-invoices',
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
        path: 'purchase-invoices',
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
        path: 'refund-sale-invoices',
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
        path: 'refund-purchase-invoices',
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
        path: 'payment/accounts/create/:stakeholderId([\\w-]+)?',
        component: () =>
          import('src/pages/Payments/PaymentAccounts/DetailView.vue'),
        name: 'payment-accounts-create',
        meta: {
          key: 'payment-accounts-create',
        },
        props: true,
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
      // payments
      {
        path: 'payments',
        component: () => import('src/pages/Payments/Payments/ListView.vue'),
        name: 'payments-list',
        meta: { key: 'payments-list' },
      },
      // payments

      // Users and Groups
      // groups
      {
        path: 'groups',
        component: () => import('src/pages/UsersAndGroups/Groups/ListView.vue'),
        name: 'group-list',
        meta: { key: 'group-list' },
      },
      {
        path: 'groups/create',
        component: () =>
          import('src/pages/UsersAndGroups/Groups/DetailView.vue'),
        name: 'group-create',
        meta: {
          key: 'group-create',
        },
      },
      {
        path: 'groups/:id([\\w-]+)',
        component: () =>
          import('src/pages/UsersAndGroups/Groups/DetailView.vue'),
        name: 'group-update',
        meta: { pathAsKey: true },
        props: true,
      },
      // groups

      // users
      {
        path: 'accounts',
        component: () => import('src/pages/UsersAndGroups/Users/ListView.vue'),
        name: 'user-account-list',
        meta: { key: 'user-account-list' },
      },
      {
        path: 'accounts/create',
        component: () =>
          import('src/pages/UsersAndGroups/Users/DetailView.vue'),
        name: 'user-account-create',
        meta: {
          key: 'user-account-create',
        },
      },
      {
        path: 'accounts/:id([\\w-]+)',
        component: () =>
          import('src/pages/UsersAndGroups/Users/DetailView.vue'),
        name: 'user-account-update',
        meta: { pathAsKey: true },
        props: true,
      },

      // users

      // Users and Groups

      {
        path: 'settings',
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
