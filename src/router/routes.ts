import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

type RouteRecordRawExtended = RouteRecordRaw & {
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
      {
        path: '/table',
        component: () => import('pages/Invoices/InvoiceList.vue'),
        name: 'invoices',
        meta: { key: 'table' },
      },
      {
        path: '/create',
        component: () => import('pages/Invoices/CreateView.vue'),
        name: 'invoces-create',
        meta: { key: 'create' },
      },
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
