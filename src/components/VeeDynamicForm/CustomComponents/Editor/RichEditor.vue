<template>
  <div ref="fullscrenParent">
    <div
      v-if="editor"
      ref="editorRef"
      class="editor"
      style="height: 100%; position: relative"
      :style="{
        maxHeight: `${maxHeight}px`,
        minHeight: isFullscreen ? `${maxHeight}px` : '500px',
      }"
      @click="
        if (fullscreenOnClick && !isFullscreen && $q.platform.is.mobile) {
          enter();
        }
      "
    >
      <MenuBar class="editor__header" :editor="editor">
        <template v-if="$slots['extra-buttons-before']" #extra-buttons-before>
          <slot name="extra-buttons-before"></slot>
        </template>
        <template v-if="$slots['extra-buttons-after']" #extra-buttons-after>
          <slot name="extra-buttons-after"></slot>
        </template>
      </MenuBar>
      <editor-content
        v-model="value"
        class="editor__content"
        spellcheck="false"
        :editor="editor"
      />
      <q-fab
        v-if="isFullscreen"
        v-touch-pan.prevent.mouse="moveFab"
        style="position: absolute; bottom: 20px; right: 20px"
        color="accent"
        icon="close"
        :label="$t('commons.close')"
        @click.stop="exit()"
      >
      </q-fab>
    </div>
  </div>
</template>

<script setup lang="ts">
import HighlightExt from '@tiptap/extension-highlight';
import PlaceholderExt from '@tiptap/extension-placeholder';
import TableExt from '@tiptap/extension-table';
import TableCellExt from '@tiptap/extension-table-cell';
import TableHeaderExt from '@tiptap/extension-table-header';
import TableRowExt from '@tiptap/extension-table-row';
import TextAlignExt from '@tiptap/extension-text-align';
import { StarterKit } from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { useFullscreen, useEventListener } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { useField } from 'vee-validate';
import { ref, toRef, watch } from 'vue';

import { height as maxHeight } from 'src/composables/maxViewportHeight';

import MenuBar from './MenuBar.vue';

const props = defineProps<{
  name: string;
  fullscreenOnClick?: boolean;
  placeholder?: string | (() => string);
}>();

const editorRef = ref();
const fullscrenParent = ref();

const { value } = useField<string | undefined>(toRef(props, 'name'));

const editor = useEditor({
  content: value.value || '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [4, 5, 6],
      },
    }),
    HighlightExt,
    TableExt.configure({
      resizable: true,
    }),
    TableCellExt,
    TableHeaderExt,
    TableRowExt,
    TextAlignExt.configure({
      types: ['heading', 'paragraph'],
    }),
    PlaceholderExt.configure({
      placeholder: props.placeholder,
    }),
  ],
  onUpdate: () => {
    value.value = editor.value?.getHTML();
  },
});

const $q = useQuasar();

const { isSupported, enter, exit, isFullscreen } =
  useFullscreen(fullscrenParent);

if (isSupported) {
  useEventListener(document, 'fullscreenchange', () => {
    isFullscreen.value = document.fullscreenElement === fullscrenParent.value;
  });
}

watch(value, () => {
  if (editor.value && value.value) {
    editor.value.commands.setContent(value.value);
  }
});

const fabPos = ref([18, 18]);
const draggingFab = ref(false);
const moveFab = (ev: {
  isFirst: boolean;
  isFinal: boolean;
  delta: { x: number; y: number };
}) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;
  fabPos.value = [fabPos.value[0] - ev.delta.x, fabPos.value[1] - ev.delta.y];
};
</script>

<style lang="scss">
$border-style: 2px solid $grey-8;

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #787c80;
  pointer-events: none;
  height: 0;
}

.editor {
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  background-color: $almost-white;
  border: $border-style;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: $border-style;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .ProseMirror {
      height: 100%;
      padding: 0.5rem 1rem;
      outline: none;
    }
  }

  &__footer {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
    border-top: $border-style;
    font-size: 12px;
    font-weight: 600;
    color: #0d0d0d;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;
  }

  /* Some information about the status */
}
</style>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: $almost-white;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type='taskList'] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}

.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
