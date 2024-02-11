import { Fraction, Length } from './types';

const customTypstUnits = [Length, Fraction];

type X =
  | X[]
  | object
  | number
  | string
  | boolean
  | null
  | undefined
  | Length
  | Fraction;

export function renderDictionary(obj: object): string {
  const entries = Object.entries(obj);
  const keyVal = entries.map(([key, value]) => {
    return `${key}: ${repr(value)}`;
  });
  return `(${keyVal.join(', ')})`;
}

export function renderFunction(
  function_name: string,
  options: Record<string, unknown>,
  inBlock = false
) {
  return `${inBlock ? '#' : ''}${function_name}${renderDictionary(options)}`;
}

export function renderArray(arr: X[]): string {
  return `(${arr.map(repr).join(', ')})`;
}

export function repr(x: X) {
  if (x === undefined || x === null) {
    return 'none';
  } else if (typeof x === 'number') {
    return x;
  } else if (typeof x === 'string' || typeof x === 'boolean') {
    return JSON.stringify(x);
  } else if (customTypstUnits.some((unit) => x instanceof unit)) {
    return x.toString();
  } else if (Array.isArray(x)) {
    return renderArray(x);
  } else if (typeof x === 'object') {
    return renderDictionary(x);
  } else {
    return '';
  }
}
