import { JSONContent } from '@tiptap/vue-3';

import { InvalidTiptapObjectError } from './error';
import { renderFunction } from './repr';
import { toTyp } from './tiptapparser';
import { Length } from './types';

type ParagraphOptions = {
  leading?: Length;
  justify?: boolean;
  linebreaks?: 'simple' | 'optimized';
  firstLineIndent?: Length;
  hangingIndent?: Length;
};

export class Paragraph {
  tiptapContent: JSONContent;
  options?: ParagraphOptions;

  constructor(tiptapContent: JSONContent, options?: ParagraphOptions) {
    if (tiptapContent.type !== 'paragraph') {
      throw new InvalidTiptapObjectError("object's type isn't paragraph");
    }
    this.tiptapContent = tiptapContent;
    this.options = options;
  }

  toTyp(inBlock = false) {
    let textContent = toTyp(this.tiptapContent.content || [], true);

    for (const [key, value] of Object.entries(this.tiptapContent.attrs || {})) {
      if (key === 'textAlign') {
        textContent = `#align(${value})[${textContent}]`;
      }
    }

    const output = `${renderFunction(
      'par',
      this.options || {},
      inBlock
    )}[${textContent}]`;
    return output;
  }
}
