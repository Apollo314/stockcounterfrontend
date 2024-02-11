import { JSONContent } from '@tiptap/vue-3';

import { InvalidTiptapObjectError } from './error';
import { renderFunction } from './repr';
import { Color, Gradient, Length, Pattern, Ratio, Relative } from './types';

type Mark = 'bold' | 'strike' | 'highlight';
type Style = 'normal' | 'italic' | 'oblique';

type TextOptions = {
  font?: string[];
  fallback?: boolean;
  style?: Style;
  weight?: number | string;
  stretch?: Ratio;
  size?: Length;
  fill?: Color | Gradient | Pattern;
  /**
   * The amount of space that should be added between characters.
   * Default: 0pt
   * */
  tracking?: Length;
  spacing?: Relative;
};

export class Text {
  tiptapContent: JSONContent;
  options?: TextOptions;
  marks?: Mark[];

  constructor(tiptapContent: JSONContent, options?: TextOptions) {
    if (tiptapContent.type !== 'text' || tiptapContent.text === undefined) {
      throw new InvalidTiptapObjectError(
        "object's type isn't text and/or it doesn't have text property"
      );
    }
    this.tiptapContent = tiptapContent;
    this.options = options;
  }

  toTyp(inBlock = false) {
    let textContent = this.tiptapContent.text;

    const marks: Mark[] = [];
    for (const mark of this.tiptapContent.marks || []) {
      if (mark.type === 'highlight') {
        marks.push('highlight');
      } else if (mark.type === 'strike') {
        marks.push('strike');
      } else if ((mark.type = 'bold')) {
        marks.push('bold');
      }
    }

    for (const mark of marks) {
      if (mark === 'bold') {
        textContent = `*${textContent}*`;
      } else if (mark === 'strike') {
        textContent = `#strike[${textContent}]`;
      } else if (mark === 'highlight') {
        textContent = `#highlight[${textContent}]`;
      }
    }

    const output = `${renderFunction(
      'text',
      this.options || {},
      inBlock
    )}[${textContent}]`;
    return output;
  }
}
