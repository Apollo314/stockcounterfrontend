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
        component: () => import('src/pages/Items/ListVİew.vue'),
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

      // Category
      {
        path: 'categories/',
        component: () => import('src/pages/Categories/ListVİew.vue'),
        name: 'category-list',
        meta: { key: 'category-list' },
      },
      {
        path: 'items/create',
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
