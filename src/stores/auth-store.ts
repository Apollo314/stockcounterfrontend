import { defineStore } from 'pinia';
import { Notify } from 'quasar';

import { $t } from 'boot/i18n';
import { api } from 'src/boot/axios';

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
    login(username: string, password: string, successCallback: () => void) {
      api.user
        .userLoginCreate({ requestBody: { username, password } })
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
