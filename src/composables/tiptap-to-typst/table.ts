import { JSONContent } from '@tiptap/vue-3';

import { InvalidTiptapObjectError } from './error';
import { repr } from './repr';
import { toTyp } from './tiptapparser';
import { Fraction, Length } from './types';

type Auto = 'auto';

type TablexOptions = {
  columns?: number | (Auto | Fraction)[];
  rows?: number | Auto | (Auto | Fraction)[];
  'auto-vlines'?: boolean;
  'auto-hlines'?: boolean;
  'repeat-header'?: boolean;
  inset?: Length;
};

export class Tablex {
  tiptapContent: JSONContent;
  options?: TablexOptions;
  defaultOptions: TablexOptions = {
    'auto-vlines': false,
    'repeat-header': true,
    inset: new Length(1.4, 'em'),
  };

  constructor(tiptapContent: JSONContent, options?: TablexOptions) {
    if (tiptapContent.type !== 'table') {
      throw new InvalidTiptapObjectError("object's type isn't table");
    }
    this.tiptapContent = tiptapContent;
    this.options = options;
  }

  headerCount(): number {
    return (
      this.tiptapContent.content?.filter((row) => {
        return row.content?.[0].type === 'tableHeader';
      }).length || 0
    );
  }

  columns(): number {
    return this.tiptapContent.content?.[0].content?.length || 0;
  }

  toTyp(inBlock = false) {
    const contents = (this.tiptapContent.content || [])
      .map((content) => toTyp(content))
      .join(',\n');

    const columns = Array(this.columns()).fill(new Fraction(1));
    const options = {
      ...this.defaultOptions,
      columns,
      ...this.options,
    };
    const hasOptions = Object.values(options).length > 0;
    const maybeComma = hasOptions ? ',' : '';
    const maybeHash = inBlock ? '#' : '';
    const entries = Object.entries(options);
    const keyVal = entries.map(([key, value]) => {
      return `${key}: ${repr(value)}`;
    });
    const optionsText = keyVal.join(', ');
    const output = `${maybeHash}tablex(${optionsText}${maybeComma}\n${contents})`;
    return output;
  }
}

export class TableRow {
  tiptapContent: JSONContent;

  constructor(tiptapContent: JSONContent) {
    if (tiptapContent.type !== 'tableRow') {
      throw new InvalidTiptapObjectError("object's type isn't tableRow");
    }
    this.tiptapContent = tiptapContent;
  }

  isHeader() {
    for (const cell of this.tiptapContent.content || []) {
      if (cell.type === 'tableHeader') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  toTyp() {
    const contents = (this.tiptapContent.content || [])
      .map((content) => toTyp(content))
      .join(', ');
    return `${contents}`;
  }
}

type TableCellAttrs = {
  colspan?: number;
  rowspan?: number;
  colwidth?: number;
};

export class TableCell {
  tiptapContent: JSONContent;
  attrs?: TableCellAttrs;

  constructor(tiptapContent: JSONContent) {
    if (
      !(
        tiptapContent.type === 'tableHeader' ||
        tiptapContent.type === 'tableCell'
      )
    ) {
      throw new InvalidTiptapObjectError("object's type isn't tableRow");
    }
    this.tiptapContent = tiptapContent;
    this.attrs = tiptapContent.attrs;
  }

  toTyp() {
    let content = toTyp(this.tiptapContent.content || [], true);
    if (
      this.attrs?.colspan &&
      this.attrs.colspan > 1 &&
      this.attrs?.rowspan &&
      this.attrs.rowspan > 1
    ) {
      content = `colspanx(${this.attrs.colspan}, rowspanx(${this.attrs.rowspan})[${content}])`;
    } else if (this.attrs?.colspan && this.attrs.colspan > 1) {
      content = `colspanx(${this.attrs.colspan})[${content}]`;
    } else if (this.attrs?.rowspan && this.attrs.rowspan > 1) {
      content = `colspanx(${this.attrs.rowspan})[${content}]`;
    } else {
      content = `[${content}]`;
    }
    return content;
  }
}
