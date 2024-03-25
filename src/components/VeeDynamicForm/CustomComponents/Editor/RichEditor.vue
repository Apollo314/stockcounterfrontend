<template>
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
      ref="editorContentRef"
      class="editor__content"
      spellcheck="false"
      :editor="editor"
    />
    <q-fab
      v-if="isFullscreen"
      v-touch-pan.prevent.mouse="moveFab"
      style="position: absolute"
      :style="{ bottom: `${fabPos[1]}px`, right: `${fabPos[0]}px` }"
      color="accent"
      icon="close"
      :label="$t('commons.close')"
      @click.stop="exit()"
    >
    </q-fab>
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
import { TouchPanValue, useQuasar } from 'quasar';
import { useField } from 'vee-validate';
import { computed, onMounted, ref, toRef, watch } from 'vue';

import { height as maxHeight } from 'src/composables/maxViewportHeight';

import MenuBar from './MenuBar.vue';

const props = defineProps<{
  name: string;
  fullscreenOnClick?: boolean;
  placeholder?: string | (() => string);
}>();

const editorRef = ref();
const fullscrenParent = ref();
const editorContentRef = ref<InstanceType<typeof EditorContent>>();

const contentScale = ref(1);
const contentTranslate = computed(() => {
  return -((1 - contentScale.value) / 2) * (1 / contentScale.value);
});

const fitPage = () => {
  const editorContentEl = editorContentRef.value?.$el as HTMLElement;
  if (editorContentEl) {
    const editableChild = editorContentEl.firstElementChild as HTMLElement;
    if (editableChild) {
      contentScale.value = Math.min(
        editorContentEl.offsetWidth / editableChild.offsetWidth,
        1
      );
      return true;
    }
  }
  return false;
};

onMounted(() => {
  window.addEventListener('resize', fitPage);
  const handle = setInterval(() => {
    const res = fitPage();
    if (res) {
      clearInterval(handle);
    }
  }, 50);
});

const { value } = useField<string | undefined>(toRef(props, 'name'));
const localvaluecopy = ref();

const editor = useEditor({
  content: JSON.parse(value.value || '') || '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    HighlightExt,
    TableExt.configure({
      resizable: false,
    }),
    TableCellExt,
    TableHeaderExt,
    TableRowExt,
    TextAlignExt.configure({
      types: ['heading', 'paragraph'],
    }),
    PlaceholderExt.configure({
      placeholder: toRef(props, 'placeholder').value,
    }),
  ],
  onUpdate: () => {
    const jsonContent = editor.value?.getJSON();
    value.value = JSON.stringify(jsonContent);
    localvaluecopy.value = value.value;
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
  if (editor.value && value.value && localvaluecopy.value !== value.value) {
    editor.value.commands.setContent(value.value);
    localvaluecopy.value = value.value;
  }
});
const fabPos = ref([18, 18]);
const draggingFab = ref(false);
const moveFab: TouchPanValue = (ev) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;
  fabPos.value = [
    fabPos.value[0] - (ev?.delta?.x || 0),
    fabPos.value[1] - (ev?.delta?.y || 0),
  ];
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

.fullscrenParent {
  display: flex;
  justify-content: center;
}

.editor {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  background-color: $grey-3;
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
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    .ProseMirror {
      transform: scale(v-bind(contentScale))
        translate(
          calc(v-bind(contentTranslate) * 100%),
          calc(v-bind(contentTranslate) * 100%)
        );
      background: $almost-white;
      padding: 0;
      outline: none;
      width: 210mm;
      margin-top: 1cm;
      margin-bottom: 1cm;
      box-shadow: 0 0 6px #80808080;
      margin-left: auto;
      margin-right: auto;
      padding-left: 2.5cm;
      padding-right: 2.5cm;
      padding-top: 2.5cm;
      padding-bottom: 2.5cm;
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
    font-weight: bold;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1rem;
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
  font-family: 'Noto Sans';

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border-bottom: 2px solid #000000;
      border-top: 2px solid #000000;
      border-left: 1px dashed #ee000080;
      border-right: 1px dashed #ee000080;
      padding: 1.4em 1em;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
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
