<template>
  <q-dialog ref="dialogRef">
    <adaptive-card>
      <q-card-section
        v-if="explanation"
        class="row q-col-gutter-md items-center q-pa-md"
      >
        <slot name="header-section"></slot>
        <div v-if="!$slots['header-section']" class="col-shrink">
          <q-avatar
            v-if="icon"
            :icon="icon"
            :color="color"
            text-color="white"
          />
        </div>
        <div class="col">
          {{ explanation }}
        </div>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="row justify-center full-width">
          <div
            class="text-bold"
            :class="{
              'text-h5': challange.length > 10,
              'text-h4': challange.length <= 10,
            }"
            style="user-select: all"
          >
            {{ challange }}
          </div>
        </div>
        <q-input
          v-model="inputText"
          :rules="[
            () =>
              inputText.length < challange.length || inputText === challange,
          ]"
          standout
          type="text"
          :label="label"
        />
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-gutter-sm">
          <q-btn
            v-close-popup
            color="negative"
            :label="cancelLabel"
            no-caps
            @click="onDialogCancel"
          />
          <q-btn
            v-close-popup
            color="primary"
            :label="okLabel"
            no-caps
            :disable="challange !== inputText"
            @click="onDialogOK"
          />
        </div>
      </q-card-actions>
    </adaptive-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

import { $t } from 'boot/i18n';
import AdaptiveCard from 'src/components/Card/AdaptiveCard.vue';

withDefaults(
  defineProps<{
    explanation?: string;
    label?: string;
    challange?: string;
    icon?: string;
    color?: string;
    okLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    explanation: undefined,
    icon: undefined,
    color: undefined,
    label: $t('confirmations.repeat-text-above'),
    okLabel: $t('commons.ok'),
    cancelLabel: $t('commons.cancel'),
    challange: Array.from(
      Array(5),
      () => `${Math.floor(Math.random() * 10)}`
    ).join(''),
  }
);

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const inputText = ref('');
</script>

<style scoped></style>
