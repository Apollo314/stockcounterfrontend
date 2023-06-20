import { defineStore } from 'pinia';
import { Notify } from 'quasar';

import { api } from 'boot/axios';
import { $t } from 'boot/i18n';

type State = {
  loggedIn: boolean;
  rememberMe: boolean;
};

export const useAuthStore = defineStore('AuthStore', {
  state: (): State => ({
    loggedIn: false,
    rememberMe: false,
  }),
  getters: {},
  actions: {
    login(
      username: string,
      password: string,
      remember_me: boolean,
      successCallback: () => void
    ) {
      api.user
        .userLoginCreate({
          requestBody: { username, password, remember_me },
        })
        .then((value) => {
          this.loggedIn = true;
          Notify.create({
            message: $t('messages.loggedIn'),
            caption: $t('messages.welcome', [value.user.username || '']),
            color: 'positive',
          });
          successCallback();
        })
        .catch((reason) => {
          Notify.create({
            message: $t('messages.failedToLogIn'),
            caption: reason?.body?.non_field_errors?.[0],
            color: 'negative',
          });
        });
    },
    logout() {
      this.loggedIn = false;
      this.router.push({ name: 'login' });
    },
  },
});
