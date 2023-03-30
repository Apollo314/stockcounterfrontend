<template>
  <q-page :padding="padding" :style-fn="styleFn || defaultStlyeFn">
    <div :class="{ 'full-height': fit }" class="flex column">
      <div v-if="!hideBackButton" class="col-shrink q-pa-sm">
        <div class="row full-width">
          <q-btn
            flat
            icon="chevron_left"
            :label="$t('buttons.back')"
            no-caps
            @click="$router.back()"
          />
          <q-space />
          <slot name="top-right"></slot>
        </div>
      </div>
      <div class="col">
        <slot></slot>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const props = defineProps<{
  hideBackButton?: boolean;
  /**
   * whether or not fit the whole page to viewport
   */
  fit?: boolean;
  padding?: boolean;
  /**
   * Override default CSS style applied to the component (sets minHeight); Function(offset: Number) => CSS props/value: Object; For best performance, reference it from your scope and do not define it inline
   * Default value: (see source code)
   * @param offset Header + Footer height (in pixels)
   * @param height Value in pixels of container height (if containerized) or window height otherwise
   * @returns Object with CSS properties to apply to Page DOM element
   */
  styleFn?: ((offset: number, height: number) => void) | undefined;
}>();

function defaultStlyeFn(offset: number, height: number) {
  if (props.fit) {
    return {
      minHeight: `${height - offset}px`,
      height: `${height - offset}px`,
    };
  }
}
</script>

<style scoped></style>
