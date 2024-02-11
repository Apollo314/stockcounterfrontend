import { describe, expect, it } from 'vitest';

import { toTyp } from './tiptapparser';

const CASES = [
  {
    input: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: 'left' },
          content: [{ type: 'text', text: "here's a title:" }],
        },
        {
          type: 'heading',
          attrs: { textAlign: 'left', level: 6 },
          content: [{ type: 'text', text: 'this text is a title' }],
        },
        {
          type: 'table',
          content: [
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: { colspan: 1, rowspan: 1, colwidth: [441] },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: { textAlign: 'left' },
                      content: [{ type: 'text', text: 'table col 1' }],
                    },
                  ],
                },
                {
                  type: 'tableHeader',
                  attrs: { colspan: 1, rowspan: 1, colwidth: null },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: { textAlign: 'center' },
                      content: [{ type: 'text', text: 'table col 2' }],
                    },
                  ],
                },
                {
                  type: 'tableHeader',
                  attrs: { colspan: 1, rowspan: 1, colwidth: null },
                  content: [
                    {
                      type: 'paragraph',
                      attrs: { textAlign: 'left' },
                      content: [{ type: 'text', text: 'table col 3' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    output: `#par()[#align(left)[#text()[here's a title:]]]
====== #align(left)[#text()[this text is a title]]
#tablex(auto-vlines: false, repeat-header: true, inset: 1.4em, columns: (1fr, 1fr, 1fr),
[#par()[#align(left)[#text()[table col 1]]]], [#par()[#align(center)[#text()[table col 2]]]], [#par()[#align(left)[#text()[table col 3]]]])`,
  },
];

describe('fromTiptapToTypst', () => {
  it('should parse tiptap JSONContent to typst doc', () => {
    for (const testcase of CASES) {
      const output = toTyp(testcase.input);
      expect(output).toStrictEqual(testcase.output);
    }
  });
});
