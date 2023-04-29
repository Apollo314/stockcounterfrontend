<template>
  <q-btn-dropdown
    split
    dense
    flat
    no-caps
    title="Tablo Ekle"
    icon="table_chart"
    label="Tablo Ekle"
    @click="
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()
    "
  >
    <q-list dense class="q-py-sm">
      <template v-for="(buttonGroup, i) in buttonGroups" :key="i">
        <q-separator v-if="i > 0" spaced />
        <q-item
          v-for="btn in buttonGroup"
          :key="btn.title"
          :disable="btn.disabled()"
          :title="btn.title"
          clickable
          @click="btn.action()"
        >
          <q-item-section>
            <q-item-label>{{ btn.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import { $t } from 'boot/i18n';

const props = defineProps<{
  editor: Editor;
}>();

const buttonGroups = [
  [
    {
      title: $t('editor.table.add_row_before'),
      action: () => {
        props.editor.chain().focus().addRowBefore().run();
      },
      disabled: () => !props.editor.can().addRowBefore(),
    },
    {
      title: $t('editor.table.add_row_after'),
      action: () => {
        props.editor.chain().focus().addRowAfter().run();
      },
      disabled: () => !props.editor.can().addRowAfter(),
    },
  ],
  [
    {
      title: $t('editor.table.add_column_before'),
      action: () => {
        props.editor.chain().focus().addColumnBefore().run();
      },
      disabled: () => !props.editor.can().addColumnBefore(),
    },
    {
      title: $t('editor.table.add_column_after'),
      action: () => {
        props.editor.chain().focus().addColumnAfter().run();
      },
      disabled: () => !props.editor.can().addColumnAfter(),
    },
  ],
  [
    {
      title: $t('editor.table.delete_column'),
      action: () => {
        props.editor.chain().focus().deleteColumn().run();
      },
      disabled: () => !props.editor.can().deleteColumn(),
    },
    {
      title: $t('editor.table.delete_row'),
      action: () => {
        props.editor.chain().focus().deleteRow().run();
      },
      disabled: () => !props.editor.can().deleteRow(),
    },
  ],
  [
    {
      title: $t('editor.table.merge_cells'),
      action: () => {
        props.editor.chain().focus().mergeCells().run();
      },
      disabled: () => !props.editor.can().mergeCells(),
    },
    {
      title: $t('editor.table.split_cell'),
      action: () => {
        props.editor.chain().focus().splitCell().run();
      },
      disabled: () => !props.editor.can().splitCell(),
    },
  ],
  [
    {
      title: $t('editor.table.delete_table'),
      action: () => {
        props.editor.chain().focus().deleteTable().run();
      },
      disabled: () => !props.editor.can().deleteTable(),
    },
  ],
];
</script>

<style scoped></style>
