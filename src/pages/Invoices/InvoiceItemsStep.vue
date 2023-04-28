<template>
  <div>
    <draggable
      ref="draggableRef"
      v-model="fields"
      class="list-group"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      handle=".handle"
      v-bind="dragOptions"
      item-key="key"
      @change="handleMove"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element, index }">
        <div class="list-group-item row items-center">
          <div class="row handle full-width justify-end q-pt-md q-px-sm">
            <div class="handle-bar" />
            <div>
              <q-btn color="positive" icon="refresh" flat />
            </div>
            <div>
              <q-btn
                color="negative"
                icon="delete"
                flat
                @click="deleteLine(index)"
              />
            </div>
            <div>
              <q-btn
                v-if="(element.value as InvoiceItemType)?.stock_movement?.warehouse_item_stock?.item?.id"
                color="primary"
                icon="conveyor_belt"
                :to="{
                  name: 'items-update',
                  params: { id: (element.value as InvoiceItemType)?.stock_movement.warehouse_item_stock.item.id },
                }"
                flat
              />
            </div>
          </div>
          <InvoiceItem
            class="col-xs-12 q-pa-sm"
            :name="`items[${index}]`"
            @delete="remove(index)"
          ></InvoiceItem>
        </div>
      </template>
    </draggable>
    <q-btn
      icon="add"
      :title="$t('invoice_labels.new_line')"
      @click="pushNewLine"
    />
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate';
import { ref, onActivated, nextTick } from 'vue';
import draggable from 'vuedraggable';

// import InvoiceItem from './InvoiceItem.vue';

import {
  InvoiceItem as InvoiceItemType,
  InvoiceItemRequest,
} from '../../client';

import InvoiceItem from './InvoiceItem.vue';

import type {
  CheckStepErrors,
  FormComponents,
  ValidateField,
  TypeOfInvoiceType,
} from './DetailView.vue';

const props = defineProps<{
  formComponents: FormComponents;
}>();

const emit = defineEmits<{
  (e: 'update:shown', value: boolean): void;
}>();

onActivated(() => {
  emit('update:shown', true);
});

const handleMove = ({
  moved,
}: {
  moved: { oldIndex: number; newIndex: number };
}) => {
  move(moved.oldIndex, moved.newIndex);
};

const draggableRef = ref<InstanceType<typeof draggable>>();

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
};

const drag = ref(false);

const { remove, push, fields, move } = useFieldArray('items');
// if (!fields.value.length) {
//   push(defaultItem());
// }

const pushNewLine = () => {
  push(undefined);

  nextTick(() => {
    const draggableEl = draggableRef.value?.$el as HTMLElement;
    const scrollableEl =
      draggableEl.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement;
    scrollableEl?.scrollBy({ top: 2000, behavior: 'smooth' });
  });
};

const deleteLine = (lineIndex: number) => {
  remove(lineIndex);
};
</script>

<style scoped lang="scss">
@import 'src/css/app.scss';
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: $primary;
}
.list-group-item {
  border-radius: $generic-border-radius;
  position: relative;
  @include generic-coolshadow();
  @include generic-border();
  .handle {
    cursor: move;
  }
  .handle-bar {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: $generic-border-radius;
    width: 50%;
    height: 4px;
    border-radius: 4px;
    background: $primary;
  }
  & + & {
    margin-top: $generic-border-radius;
  }
}
.list-group-item i {
  cursor: pointer;
}
</style>
