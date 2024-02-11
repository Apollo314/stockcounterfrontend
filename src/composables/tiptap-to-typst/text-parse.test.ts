import { describe, expect, it } from 'vitest';

import { Text } from './text';

const CASES = [
  {
    input: { type: 'text', text: 'normal text' },
    output: 'text()[normal text]',
  },
  {
    input: {
      type: 'text',
      marks: [{ type: 'highlight' }],
      text: 'highlighted text',
    },
    output: 'text()[#highlight[highlighted text]]',
  },
  {
    input: {
      type: 'text',
      marks: [{ type: 'strike' }],
      text: 'strike through text',
    },
    output: 'text()[#strike[strike through text]]',
  },
  {
    input: { type: 'text', marks: [{ type: 'bold' }], text: 'bold text' },
    output: 'text()[*bold text*]',
  },
  {
    input: {
      type: 'text',
      marks: [{ type: 'bold' }, { type: 'strike' }],
      text: 'bold and striked text',
    },
    output: 'text()[#strike[*bold and striked text*]]',
  },
];

describe('fromTiptapToTypst', () => {
  it('should parse tiptap JSONContent to typst string', () => {
    for (const testcase of CASES) {
      const text = new Text(testcase.input);
      if (text) {
        const output = text.toTyp();
        expect(output).toStrictEqual(testcase.output);
      }
    }
  });
});
