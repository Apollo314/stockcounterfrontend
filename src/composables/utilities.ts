export function callOrGet<T>(value: T | (() => T)): T {
  return value instanceof Function ? value() : value;
}
