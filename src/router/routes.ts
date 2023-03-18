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
