import { describe, expect, it } from 'vitest';

import { toTyp } from './tiptapparser';

const CASES = [
  {
    input: {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        {
          type: 'text',
          marks: [{ type: 'highlight' }],
          text: 'highlighted here',
        },
        { type: 'text', text: ' and ' },
        {
          type: 'text',
          marks: [{ type: 'strike' }],
          text: 'strike through here',
        },
        { type: 'text', text: ' and normal here' },
      ],
    },
    output:
      '#par()[#align(left)[#text()[#highlight[highlighted here]]#text()[ and ]#text()[#strike[strike through here]]#text()[ and normal here]]]',
  },
];

describe('fromTiptapToTypst', () => {
  it('should parse tiptap JSONContent to typst par', () => {
    for (const testcase of CASES) {
      const result = toTyp(testcase.input, true);
      expect(result).toStrictEqual(testcase.output);
    }
  });
});
