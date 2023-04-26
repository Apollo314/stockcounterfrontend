<template>
  <div>
    <div class="expander" :class="{ 'height-zero': !cropperSrc }">
      <div v-if="cropperSrc">
        <Cropper
          ref="cropper"
          class="cropper"
          :src="cropperSrc"
          :stencil-props="{
            aspectRatio: aspectRatio,
            movable: false,
            resizable: false,
            handlers: {},
          }"
          :resize-image="{
            adjustStencil: false,
          }"
          image-restriction="stencil"
          @change="updateModelValue"
        />
        <div
          style="
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
          "
        >
          <div>
            <q-btn flat color="white" icon="rotate_left" @click="rotate(-90)" />
          </div>
          <div>
            <q-btn flat color="white" icon="rotate_right" @click="rotate(90)" />
          </div>
          <div>
            <q-btn flat color="white" icon="flip" @click="flip(true, false)" />
          </div>
          <div>
            <q-btn flat color="white" @click="flip(false, true)">
              <q-icon name="flip" class="rotate-90" />
            </q-btn>
          </div>
        </div>

        <q-btn-group class="btngroup" push>
          <q-btn
            class="bg-dark text-positive"
            push
            icon="check"
            :label="$t('commons.ok')"
            @click="cropperSrc = undefined"
          />
          <q-btn
            v-close-popup
            class="bg-dark text-negative"
            push
            icon="clear"
            :label="$t('commons.cancel')"
            @click="clear()"
          />
        </q-btn-group>
      </div>
    </div>
    <q-file
      v-model="inputImage"
      :standout="standout"
      class="label-top hide-file-slot"
      :stack-label="!!(imgUrl || value)"
      :label="label"
      accept="image/*"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hide-bottom-space="!errorMessage"
    >
      <template #prepend>
        <q-icon name="image"></q-icon>
      </template>
      <template v-if="imgUrl || value" #default>
        <div
          class="q-pa-sm bg-grey-1 coolshadowmore pictureframe"
          style="border-radius: 5px"
        >
          <q-img
            width="200px"
            :src="value || imgUrl || ''"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
      </template>
      <template v-if="imgUrl || value" #append>
        <q-icon class="cursor-pointer" name="clear" @click="clear()" />
      </template>
      <template #file> </template>
    </q-file>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { ref, toRef, watch } from 'vue';
import { Cropper } from 'vue-advanced-cropper';

import 'vue-advanced-cropper/dist/style.css';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    standout?: boolean | string;
    title?: string;
    aspectRatio?: number;
  }>(),
  {
    standout: true,
    aspectRatio: 1,
  }
);

const inputImage = ref<File>();
const cropper = ref<InstanceType<typeof Cropper>>();
const cropperSrc = ref<string | ArrayBuffer | null>();

const imgUrl = ref<string>();

const { value, errorMessage, setValue } = useField<string | null | undefined>(
  toRef(props, 'name')
);

const setCropperImage = () => {
  const reader = new FileReader();
  reader.onload = () => {
    cropperSrc.value = reader?.result;
  };
  if (inputImage.value) {
    reader.readAsDataURL(inputImage.value);
  }
};

watch(inputImage, (newval) => {
  if (newval) {
    setCropperImage();
  } else {
    cropperSrc.value = undefined;
    setValue(undefined);
  }
});

watch(value, () => {
  if (!value.value) {
    inputImage.value = undefined;
  } else if (value.value.startsWith('http')) {
    imgUrl.value = value.value;
    value.value = undefined;
  }
});

const updateModelValue = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  setValue(canvas.toDataURL('image/jpeg'));
};

const clear = () => {
  setValue(undefined);
  inputImage.value = undefined;
  imgUrl.value = undefined;
  value.value = null; // otherwise json just ignores undefined, doesn't send the field and image doesn't get deleted
};

const rotate = (angle: number) => {
  if (cropper.value) {
    cropper.value.rotate(angle);
  }
};

const flip = (x: boolean, y: boolean) => {
  if (cropper.value) {
    cropper.value.flip(x, y);
  }
};
</script>

<style lang="scss">
.expander {
  position: relative;
  transition: height 0.3s ease;
  &.height-zero {
    height: 0;
    margin-bottom: 0;
  }
  .cropper {
    max-height: 380px;
  }
  .btngroup {
    position: absolute;
    right: $generic-border-radius;
    bottom: $generic-border-radius;
  }
  .vue-advanced-cropper__background,
  .vue-advanced-cropper__foreground {
    border-radius: $generic-border-radius;
  }
  .vue-advanced-cropper__boundaries {
    width: 100% !important;
  }
  .vue-advanced-cropper__stretcher {
    width: 100% !important;
  }
}

@keyframes wiggle {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: -2deg;
  }
  50% {
    rotate: 2deg;
  }
  75% {
    rotate: -2deg;
  }
  100% {
    rotate: 0deg;
    translate: 25% 25%;
    scale: 1.5;
  }
}

.hide-file-slot {
  .q-field__control-container {
    padding-bottom: 12px;
    .pictureframe {
      &:hover {
        body.desktop & {
          z-index: 1000;
          animation: wiggle 0.3s ease forwards;
        }
      }
    }
  }
  .q-field__native {
    max-width: 0px;
  }
}
</style>
