import { useMouse, useMousePressed, watchThrottled } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import type {
  MaybeComputedRef,
  MousePressedOptions,
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
  mousePressed: MousePressedOptions;
  mouse: UseMouseOptions;
  callback: (evt: VTouchEvent) => void;
  throttle?: MaybeComputedRef<number>;
};

export function useVTouch(options: VTouchOptions) {
  const { x, y } = useMouse(options.mouse);
  const { pressed, sourceType } = useMousePressed(options.mousePressed);
  const isFirst = ref<boolean>(true);

  const startpos = ref<{ x: number; y: number }>({
    x: options.mouse.initialValue?.x || 0,
    y: options.mouse.initialValue?.y || 0,
  });

  watch(pressed, (isPressed) => {
    if (isPressed) {
      isFirst.value = true;
      startpos.value.x = x.value;
      startpos.value.y = y.value;
    } else {
      startpos.value.x = options.mouse.initialValue?.x || 0;
      startpos.value.y = options.mouse.initialValue?.y || 0;
      isFirst.value = false;
    }
  });

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
    pressed,
    sourceType,
  };
}
