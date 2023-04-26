<template>
  <div>
    <q-input
      ref="inputRef"
      v-model="value"
      :standout="standout"
      :outlined="outlined"
      :label="label"
      :clearable="clearable"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-bottom-space="!errorMessage"
      :bg-color="highlight ? 'primary' : undefined"
      clear-icon="clear"
      :dense="dense"
      @blur="validate()"
    >
      <template #before>
        <q-btn flat icon="qr_code_scanner" @click="modalOpen = true" />
      </template>
    </q-input>
    <q-dialog v-model="modalOpen" maximized>
      <div>
        <div class="row items-center justify-center scanner-parent">
          <transition name="fade" appear>
            <div
              ref="scannerRef"
              class="scanner"
              @click="modalOpen = false"
            ></div>
          </transition>
          <div style="position: absolute; top: 20px; right: 20px">
            <q-btn
              v-close-popup
              flat
              class="bg-black text-negative"
              icon="close"
            />
          </div>
          <div
            style="position: absolute; bottom: 10%; width: calc(100% - 50px)"
          >
            <div class="row justify-end q-col-gutter-sm">
              <div v-if="zoom?.isSupported" class="col">
                <q-slider
                  :model-value="Math.round(zoom.value * 10) / 10"
                  :min="zoom.min"
                  :max="zoom.max"
                  :step="zoom.step"
                  label
                  snap
                  markers
                  label-always
                  track-color="white"
                  track-size="10px"
                  thumb-size="30px"
                  @update:model-value="applyZoom($event || 1)"
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
import { QInput, useQuasar } from 'quasar';
import { useField } from 'vee-validate';
import { computed, ref, toRef, watch } from 'vue';

import { Config, useQRScanner } from 'src/composables/useQRScanner';

const props = withDefaults(
  defineProps<{
    name: string;
    standout?: string | boolean;
    outlined?: boolean;
    label: string;
    clearable?: boolean;
    dense?: boolean;
    highlight?: boolean;
  }>(),
  {
    type: 'text',
    standout: true,
    clearable: true,
  }
);

const modalOpen = ref(false);
const scannerRef = ref<HTMLElement>();
const inputRef = ref<InstanceType<typeof QInput>>();

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

watch(
  () => props.highlight,
  () => {
    if (props.highlight) {
      setTimeout(() => {
        inputRef.value?.focus();
      }, 50);
    }
  }
);

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
