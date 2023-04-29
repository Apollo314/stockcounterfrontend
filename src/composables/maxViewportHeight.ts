// this allows to get visual viewport height on mobile devices when
// virtual keyboard is open and visual viewport is smaller.
// 100vh isn't same as this, it includes the virtual keyboard, this does not.

import { ref } from 'vue';

export const height = ref<number>(window.innerHeight);

if (window.visualViewport) {
  window.visualViewport.onresize = () => {
    height.value = window.visualViewport?.height || window.innerHeight;
  };
}
