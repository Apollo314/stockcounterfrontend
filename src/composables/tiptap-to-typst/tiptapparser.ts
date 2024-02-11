import { JSONContent } from '@tiptap/vue-3';

import { Doc } from './doc';
import { Heading } from './heading';
import { Paragraph } from './paragraph';
import { TableCell, TableRow, Tablex } from './table';
import { Text } from './text';

const typeParserMap = {
  paragraph: Paragraph,
  text: Text,
  table: Tablex,
  tableRow: TableRow,
  tableCell: TableCell,
  tableHeader: TableCell,
  doc: Doc,
  heading: Heading,
};

export function toTyp(
  content: JSONContent | JSONContent[],
  inBlock = false
): string | null {
  if (Array.isArray(content)) {
    let results = content.map((cntnt) => toTyp(cntnt, inBlock));
    results = results.filter((res) => res !== null);
    return results.join('');
  } else if (content.type !== undefined && content.type in typeParserMap) {
    const key = content.type as keyof typeof typeParserMap;
    const parser = new typeParserMap[key](content);
    return parser.toTyp(inBlock);
  } else {
    return null;
  }
}
