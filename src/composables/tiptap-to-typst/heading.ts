import { JSONContent } from '@tiptap/vue-3';

import { InvalidTiptapObjectError } from './error';
import { toTyp } from './tiptapparser';

type HeadingOptions = {
  level: number;
};

export class Heading {
  tiptapContent: JSONContent;
  options: HeadingOptions;

  constructor(tiptapContent: JSONContent) {
    if (tiptapContent.type !== 'heading') {
      throw new InvalidTiptapObjectError("object's type isn't heading");
    }
    if (tiptapContent.attrs?.level === undefined) {
      throw new InvalidTiptapObjectError('heading should have a level');
    }
    this.tiptapContent = tiptapContent;
    this.options = { level: tiptapContent.attrs.level };
  }

  toTyp() {
    let textContent = toTyp(this.tiptapContent.content || [], true);

    for (const [key, value] of Object.entries(this.tiptapContent.attrs || {})) {
      if (key === 'textAlign') {
        textContent = `#align(${value})[${textContent}]`;
      }
    }

    const heading = Array(this.options.level).fill('=').join('');

    const output = `${heading} ${textContent}`;
    return output;
  }
}
