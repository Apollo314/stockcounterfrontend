import axios, { AxiosError, AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

import { AppClient } from 'src/client';

import { useAuthStore } from '../stores/auth-store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' });

const api = new AppClient({
  BASE: process.env.BASE ?? `http://${window.location.hostname}:8000`,
  WITH_CREDENTIALS: true,
});

axios.interceptors.response.use(
  (value) => value,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    } else {
      throw error;
    }
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
