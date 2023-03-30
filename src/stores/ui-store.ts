import { defineStore } from 'pinia';
import { VNodeRef, ref } from 'vue';

export const useUIStore = defineStore<
  string,
  {
    replaceHeader: boolean;
    headerTargetReady: boolean;
    replacementHeaderRef: VNodeRef | undefined;
    replacementFooterRef: VNodeRef | undefined;
  }
>('UIStore', {
  state: () => ({
    replaceHeader: false,
    headerTargetReady: false,
    replacementHeaderRef: undefined,
    replacementFooterRef: undefined,
  }),
  getters: {},
  actions: {},
});
