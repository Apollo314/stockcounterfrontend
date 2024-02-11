import { describe, expect, it } from 'vitest';

import { toTyp } from './tiptapparser';

const CASES = [
  {
    input: {
      type: 'heading',
      attrs: { textAlign: 'left', level: 2 },
      content: [{ type: 'text', text: 'this text is a title' }],
    },
    output: '== #align(left)[#text()[this text is a title]]',
  },
];

describe('fromTiptapToTypst', () => {
  it('should parse tiptap JSONContent to typst heading', () => {
    for (const testcase of CASES) {
      const result = toTyp(testcase.input, true);
      expect(result).toStrictEqual(testcase.output);
    }
  });
});
