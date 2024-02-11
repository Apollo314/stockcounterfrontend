import { JSONContent } from '@tiptap/vue-3';

import { InvalidTiptapObjectError } from './error';
import { toTyp } from './tiptapparser';

export class Doc {
  tiptapContent: JSONContent;

  constructor(tiptapContent: JSONContent) {
    if (tiptapContent.type !== 'doc') {
      throw new InvalidTiptapObjectError("object's type isn't doc");
    }
    this.tiptapContent = tiptapContent;
  }

  toTyp() {
    const contents = (this.tiptapContent.content || [])
      .map((content) => toTyp(content, true))
      .join('\n');
    return contents;
  }
}
