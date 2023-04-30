<template>
  <div>
    <slot name="extra-buttons-before"></slot>
    <template v-for="(item, index) in items">
      <div v-if="isDivider(item)" :key="`divider${index}`" class="divider" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
    <TableButtons :editor="editor" />
    <slot name="extra-buttons-after"></slot>
  </div>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { useI18n } from 'vue-i18n';

import MenuItem from './MenuItem.vue';
import TableButtons from './TableButtons.vue';

const props = defineProps<{
  editor: Editor;
}>();

type Item = {
  icon?: string;
  label?: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
};

type Divider = {
  type: 'divider';
};

const { t: $t } = useI18n();

const isDivider = (value: Item | Divider): value is Divider => {
  if ((value as Divider).type === 'divider') {
    return true;
  }
  return false;
};

const items: (Item | Divider)[] = [
  {
    label: 'P',
    title: $t('editor.paragraph'),
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),
  },
  {
    icon: 'format_bold',
    title: $t('editor.bold'),
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: 'format_strikethrough',
    title: $t('editor.strike'),
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
  },
  // {
  //   icon: "code-view",
  //   title: "Code",
  //   action: () => props.editor.chain().focus().toggleCode().run(),
  //   isActive: () => props.editor.isActive("code"),
  // },
  {
    icon: 'border_color',
    title: $t('editor.highlight'),
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive('highlight'),
  },
  {
    type: 'divider',
  },
  {
    label: 'h4',
    title: $t('editor.header4'),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 4 }),
  },
  {
    label: 'h5',
    title: $t('editor.header5'),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 5 }),
  },
  {
    label: 'h6',
    title: $t('editor.header6'),
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 6 }),
  },
  {
    type: 'divider',
  },
  {
    icon: 'format_align_left',
    title: $t('editor.align_left'),
    action: () => props.editor.chain().focus().setTextAlign('left').run(),
    isActive: () => props.editor.isActive({ textAlign: 'left' }),
  },
  {
    icon: 'format_align_center',
    title: $t('editor.align_center'),
    action: () => props.editor.chain().focus().setTextAlign('center').run(),
    isActive: () => props.editor.isActive({ textAlign: 'center' }),
  },
  {
    icon: 'format_align_right',
    title: $t('editor.align_right'),
    action: () => props.editor.chain().focus().setTextAlign('right').run(),
    isActive: () => props.editor.isActive({ textAlign: 'right' }),
  },
  {
    type: 'divider',
  },
  {
    icon: 'list',
    title: $t('editor.unordered_list'),
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: 'format_list_numbered',
    title: $t('editor.numbered_list'),
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
  // {
  //   icon: "list-check-2",
  //   title: "Task List",
  //   action: () => props.editor.chain().focus().toggleTaskList().run(),
  //   isActive: () => props.editor.isActive("taskList"),
  // },
  // {
  //   icon: "code-box-line",
  //   title: "Code Block",
  //   action: () => props.editor.chain().focus().toggleCodeBlock().run(),
  //   isActive: () => props.editor.isActive("codeBlock"),
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   icon: "double-quotes-l",
  //   title: "Blockquote",
  //   action: () => props.editor.chain().focus().toggleBlockquote().run(),
  //   isActive: () => props.editor.isActive("blockquote"),
  // },
  // {
  //   icon: "separator",
  //   title: "Horizontal Rule",
  //   action: () => props.editor.chain().focus().setHorizontalRule().run(),
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   icon: "text-wrap",
  //   title: "Hard Break",
  //   action: () => props.editor.chain().focus().setHardBreak().run(),
  // },
  // {
  //   icon: "format-clear",
  //   title: "Clear Format",
  //   action: () =>
  //     props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   icon: "arrow-go-back-line",
  //   title: "Undo",
  //   action: () => props.editor.chain().focus().undo().run(),
  // },
  // {
  //   icon: "arrow-go-forward-line",
  //   title: "Redo",
  //   action: () => props.editor.chain().focus().redo().run(),
  // },
];
</script>

<style lang="scss">
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
