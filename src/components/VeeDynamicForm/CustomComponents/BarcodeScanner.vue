<template>
  <div>
    <q-input
      :standout="standout"
      :outlined="outlined"
      v-model="value"
      :label="label"
      @blur="validate()"
      :clearable="clearable"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-bottom-space="!errorMessage"
      clear-icon="clear"
      :dense="dense"
    >
      <template #prepend>
        <q-btn flat icon="qr_code_scanner" @click="modalOpen = true" />
      </template>
    </q-input>
    <q-dialog maximized v-model="modalOpen">
      <div>
        <div class="row items-center justify-center scanner-parent">
          <transition name="fade" appear>
            <div
              @click="modalOpen = false"
              ref="scannerRef"
              class="scanner"
            ></div>
          </transition>
          <div style="position: absolute; top: 20px; right: 20px">
            <q-btn
              flat
              class="bg-black text-negative"
              icon="close"
              v-close-popup
            />
          </div>
          <div
            style="position: absolute; bottom: 10%; width: calc(100% - 50px)"
          >
            <div class="row justify-end q-col-gutter-sm">
              <div class="col" v-if="zoom?.isSupported">
                <q-slider
                  :model-value="Math.round(zoom.value * 10) / 10"
                  :min="zoom.min"
                  :max="zoom.max"
                  :step="zoom.step"
                  @update:model-value="applyZoom($event || 1)"
                  label
                  snap
                  markers
                  label-always
                  track-color="white"
                  track-size="10px"
                  thumb-size="30px"
                />
              </div>
              <div v-if="torchFeature?.isSupported()" class="col-shrink">
                <q-btn
                  flat
                  class="bg-black text-white"
                  icon="flashlight_on"
                  @click="torchFeature?.apply(!torchFeature.value())"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useField } from 'vee-validate';
import { computed, ref, toRef } from 'vue';

import { Config, useQRScanner } from 'src/composables/useQRScanner';

const props = withDefaults(
  defineProps<{
    name: string;
    standout?: string | boolean;
    outlined?: boolean;
    label: string;
    clearable?: boolean;
    dense?: boolean;
  }>(),
  {
    type: 'text',
    standout: true,
    clearable: true,
  }
);

const modalOpen = ref(false);
const scannerRef = ref<HTMLElement>();

const $q = useQuasar();

const aspectRatio = computed(() => {
  return $q.platform.is.mobile
    ? Math.max(
        $q.screen.height / $q.screen.width,
        $q.screen.width / $q.screen.height
      )
    : $q.screen.width / $q.screen.height;
});

const config = ref<Config>({
  verbose: false,
  useBarCodeDetectorIfSupported: true,
  fps: 5,
  aspectRatio: aspectRatio.value,
  disableFlip: true,
  defaultZoomValueIfSupported: 2,
  reScanInterval: 2000,
});

const { zoom, applyZoom, torchFeature } = useQRScanner(
  scannerRef,
  config,
  (scan) => {
    setValue(scan);
    modalOpen.value = false;
  }
);

const { value, setValue, validate, errorMessage } = useField<string>(
  toRef(props, 'name')
);
</script>

<style lang="scss">
.scanner {
  width: 100%;
  video {
    width: 100% !important;
    height: 100%;
  }
}
</style>
