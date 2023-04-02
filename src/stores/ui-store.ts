import { defineStore } from 'pinia';
import { VNodeRef } from 'vue';

export const useUIStore = defineStore<
  string,
  {
    replaceFooter: boolean;
    replaceHeader: boolean;
    headerTargetReady: boolean;
    replacementHeaderRef: VNodeRef | undefined;
    replacementFooterRef: VNodeRef | undefined;
  }
>('UIStore', {
  state: () => ({
    replaceFooter: false,
    replaceHeader: false,
    headerTargetReady: false,
    replacementHeaderRef: undefined,
    replacementFooterRef: undefined,
  }),
  getters: {},
  actions: {},
});
