import { describe, expect, it } from 'vitest';

import { toTyp } from './tiptapparser';

const CASES = [
  {
    input: {
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
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [441] },
              content: [
                {
                  type: 'paragraph',
                  attrs: { textAlign: 'left' },
                  content: [{ type: 'text', text: 'row 1 col 1' }],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { textAlign: 'center' },
                  content: [{ type: 'text', text: 'this is row 1 col 2' }],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { textAlign: 'left' },
                  content: [{ type: 'text', text: 'this is row 1 col 3' }],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [441] },
              content: [
                {
                  type: 'paragraph',
                  attrs: { textAlign: 'left' },
                  content: [{ type: 'text', text: 'this is row 2 col 1' }],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { textAlign: 'center' },
                  content: [{ type: 'text', text: 'this is row 2 col 2' }],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: null },
              content: [
                {
                  type: 'paragraph',
                  attrs: { textAlign: 'left' },
                  content: [{ type: 'text', text: 'this is row 2 col 3' }],
                },
              ],
            },
          ],
        },
      ],
    },
    output: `tablex(auto-vlines: false, repeat-header: true, inset: 1.4em, columns: (1fr, 1fr, 1fr),
[#par()[#align(left)[#text()[table col 1]]]], [#par()[#align(center)[#text()[table col 2]]]], [#par()[#align(left)[#text()[table col 3]]]],
[#par()[#align(left)[#text()[row 1 col 1]]]], [#par()[#align(center)[#text()[this is row 1 col 2]]]], [#par()[#align(left)[#text()[this is row 1 col 3]]]],
[#par()[#align(left)[#text()[this is row 2 col 1]]]], [#par()[#align(center)[#text()[this is row 2 col 2]]]], [#par()[#align(left)[#text()[this is row 2 col 3]]]])`,
  },
];

describe('fromTiptapToTypst', () => {
  it('should parse tiptap JSONContent to typst tablex', () => {
    for (const testcase of CASES) {
      const output = toTyp(testcase.input);
      expect(output).toStrictEqual(testcase.output);
    }
  });
});
