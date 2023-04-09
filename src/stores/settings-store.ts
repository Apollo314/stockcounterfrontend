import { defineStore } from 'pinia';

type State = {
  ui: {
    showTransitionAnimations: boolean;
    genericAnimation:
      | 'zoom-out-in'
      | 'zoom-out-out'
      | 'rotate-around-z'
      | 'rotate-around-x'
      | 'rotate-around-y'
      | 'rotate-around-corner'
      | 'swipe-left'
      | 'swipe-right';
    negativeMenuGutter: boolean;
  };
};

export const useSettingsStore = defineStore('SettingsStore', {
  state: (): State => ({
    ui: {
      showTransitionAnimations: true,
      genericAnimation: 'zoom-out-in',
      negativeMenuGutter: false,
    },
  }),
  getters: {},
  actions: {},
});
