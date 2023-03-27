export type TouchPanEvent = {
  evt: Event;
  touch: boolean;
  mouse: boolean;
  position: {
    top: number;
    left: number;
  };
  direction: 'up' | 'right' | 'down' | 'top';
  isFirst: boolean;
  isFinal: boolean;
  duration: number;
  distance: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
};
