import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

type RouteRecordRawExtended = RouteRecordRaw & {
  meta?: {
    /**
     * whether or not the layout should hide the header.
     */
    hideHeader?: boolean;
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
        meta: { hideHeader: true },
      },
      {
        path: '/table',
        component: () => import('pages/Invoices/InvoiceList.vue'),
        name: 'invoices',
        meta: { key: 'table' },
      },
      {
        path: '/:id(\\d+)',
        component: () => import('pages/Index/IndexPage.vue'),
        name: 'nest',
        meta: { hideHeader: true },
      },
      {
        path: 'another/',
        component: () => import('pages/Index/IndexPage2.vue'),
        name: 'another',
        meta: { hideHeader: true },
      },
      {
        path: 'settings/',
        component: () => import('pages/Settings/SettingsPage.vue'),
        name: 'settings',
        meta: {
          hideHeader: true,
        },
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
