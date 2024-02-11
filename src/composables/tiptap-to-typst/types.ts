/** ex: 100%
 *
 * see: https://typst.app/docs/reference/layout/ratio/
 * */
export type Ratio = string;

export class Fraction {
  magnitude: number;
  constructor(magnitude: number) {
    this.magnitude = magnitude;
  }
  toString() {
    return `${this.magnitude}fr`;
  }
}

/** ex: 11pt, 20mm, 10cm, 1.5em
 *
 * see: https://typst.app/docs/reference/layout/length/
 * */
export class Length {
  magnitude: number;
  unit: string;

  constructor(magnitude: number, unit: string) {
    this.magnitude = magnitude;
    this.unit = unit;
  }

  toString() {
    return `${this.magnitude}${this.unit}`;
  }
}

/**
 * https://typst.app/docs/reference/layout/relative/
 * */
export type Relative = string;

/** ex: aqua, rgb("#001f3f")
 *
 * see: https://typst.app/docs/reference/visualize/color/
 * */
export type Color = string;

/** ex: gradient.linear(red, blue)
 *
 * see: https://typst.app/docs/reference/visualize/gradient/
 * */
export type Gradient = string;

/** see: https://typst.app/docs/reference/visualize/pattern/ */
export type Pattern = string;
