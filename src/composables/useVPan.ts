import {
  unrefElement,
  useEventListener,
  useMouse,
  watchThrottled,
} from '@vueuse/core';
import { computed, ref, unref } from 'vue';

import type {
  MaybeComputedRef,
  MaybeElementRef,
  MaybeRef,
  UseMouseOptions,
} from '@vueuse/core';

type Offset = {
  x: number;
  y: number;
};

type VTouchEvent = {
  isFirst: boolean;
  offset: Offset;
};

type VTouchOptions = {
  target: MaybeElementRef;
  /**
   * threshold to prevent click event in terms of pixel.
   * @default 10
   */
  threshold?: MaybeRef<number>;
  mouse: UseMouseOptions;
  callback: (evt: VTouchEvent) => void;
  throttle?: MaybeComputedRef<number>;
};

export function useVPan(options: VTouchOptions) {
  const { x, y } = useMouse(options.mouse);
  const isFirst = ref<boolean>(true);
  const threshold = computed(() => unref(options.threshold) || 10);
  const target = computed(() => unrefElement(options.target));
  const pressed = ref<boolean>(false);

  const startpos = ref<{ x: number; y: number }>({
    x: options.mouse.initialValue?.x || 0,
    y: options.mouse.initialValue?.y || 0,
  });

  function onPressed() {
    pressed.value = true;
    isFirst.value = true;
    startpos.value.x = x.value;
    startpos.value.y = y.value;
  }

  function onReleased() {
    pressed.value = false;
  }

  function onClick(evt: MouseEvent) {
    const distance = Math.sqrt(
      (x.value - startpos.value.x) ** 2 + (y.value - startpos.value.y) ** 2
    );
    if (distance > threshold.value) {
      evt.preventDefault();
    }
  }

  useEventListener(target, 'mousedown', onPressed, { capture: true });
  useEventListener(window, 'mouseup', onReleased, { capture: true });
  useEventListener(target, 'click', onClick, { capture: true });

  watchThrottled(
    () => [x.value, y.value],
    (xy) => {
      if (pressed.value) {
        options.callback({
          isFirst: isFirst.value,
          offset: {
            x: xy[0] - startpos.value.x,
            y: xy[1] - startpos.value.y,
          },
        });
        isFirst.value = false;
      }
    },
    { throttle: options.throttle }
  );

  return {
    mousePos: { x, y },
  };
}
