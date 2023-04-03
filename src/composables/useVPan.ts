import {
  unrefElement,
  useEventListener,
  useMouse,
  watchThrottled,
} from '@vueuse/core';
import { computed, nextTick, ref, unref } from 'vue';

import type {
  MaybeComputedRef,
  MaybeElementRef,
  MaybeRef,
  UseMouseOptions,
} from '@vueuse/core';

type XY = {
  x: number;
  y: number;
};

export type VTouchEvent = {
  isFirst: boolean;
  delta: XY;
};

export type VPanOptions = {
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

export function useVPan(options: VPanOptions) {
  const { x, y } = useMouse(options.mouse);
  const isFirst = ref<boolean>(true);
  const threshold = computed(() => unref(options.threshold) || 10);
  const target = computed(() => unrefElement(options.target));
  const pressed = ref<boolean>(false);
  let pressType: 'left' | 'right' | null = null;

  const startpos = ref<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const deltastartpos = ref<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  function onPressed(evt: MouseEvent) {
    pressType = evt.button === 0 ? 'left' : 'right';
    pressed.value = true;
    isFirst.value = true;
    startpos.value.x = x.value;
    startpos.value.y = y.value;
    deltastartpos.value.x = x.value;
    deltastartpos.value.y = y.value;
  }

  function onReleased(evt: MouseEvent) {
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

  useEventListener(target, 'mousedown', onPressed, {});
  useEventListener(window, 'mouseup', onReleased, {});
  useEventListener(target, 'click', onClick, { capture: true });

  watchThrottled(
    () => [x.value, y.value],
    (xy) => {
      if (pressed.value && pressType === 'left') {
        nextTick(() => {
          options.callback({
            isFirst: isFirst.value,
            delta: {
              x: x.value - deltastartpos.value.x,
              y: y.value - deltastartpos.value.y,
            },
          });
          isFirst.value = false;
          deltastartpos.value.x = xy[0];
          deltastartpos.value.y = xy[1];
        });
      }
    },
    { throttle: options.throttle }
  );

  return {
    mousePos: { x, y },
  };
}
