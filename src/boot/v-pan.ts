import { MaybeElementRef } from '@vueuse/core';
import { boot } from 'quasar/wrappers';
import { DirectiveBinding } from 'vue';

import { useVPan } from 'src/composables/useVPan';

import type { VPanOptions } from 'src/composables/useVPan';

type Options = DirectiveBinding<Omit<VPanOptions, 'target'>>;

export default boot(({ app }) => {
  app.directive('pan', (el: MaybeElementRef, options: Options) => {
    useVPan({ ...options.value, target: el });
  });
});
