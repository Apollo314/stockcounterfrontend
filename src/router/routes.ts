import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index/IndexPage.vue'),
        name: 'home',
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
    component: () => import('src/pages/NotFound/ErrorNotFound.vue'),
  },
];

export default routes;
