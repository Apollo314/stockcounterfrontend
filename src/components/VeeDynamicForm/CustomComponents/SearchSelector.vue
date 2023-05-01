<template>
  <q-select
    ref="selectRef"
    v-model="value"
    :multiple="multiple"
    use-input
    :standout="standout"
    class="label-top limit-max-height-input"
    :options="options"
    :loading="loading"
    :label="label"
    :option-label="optionLabel"
    :emit-value="!emitFullObject"
    :map-options="!emitFullObject"
    :option-value="primaryKeyField"
    clearable
    clear-icon="clear"
    :use-chips="useChips"
    :error="!!errorMessage"
    :error-message="errorMessage"
    :dense="dense"
    :hide-bottom-space="hideBottomSpace"
    :bg-color="highlight ? 'primary' : undefined"
    @update:model-value="$emit('select', $event)"
    @filter="onFilter"
    @blur="validate()"
  >
    <template v-if="!endOfItems" #after-options>
      <div
        class="full-width q-pt-sm"
        style="display: flex; justify-content: center"
      >
        <q-btn
          :loading="loading"
          color="primary"
          icon="expand_more"
          @click="loadMore"
        />
      </div>
    </template>
    <template v-if="$slots['no-option']" #no-option>
      <slot name="no-option"></slot>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { QSelect, QSelectProps } from 'quasar';
import { useField } from 'vee-validate';
import { PropType, ref, toRef, watch } from 'vue';

import { QueryService } from 'components/VeeDynamicForm/componentMap';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  queryService: {
    type: Function as PropType<QueryService>,
    required: true,
  },
  primaryKeyField: {
    type: String,
    required: false,
    default: 'id',
  },
  optionLabel: {
    type: [String, Function] as PropType<
      string | ((option: Record<string, unknown>) => string)
    >,
    required: false,
    default: 'label',
  },
  hideBottomSpace: {
    type: Boolean,
    required: false,
    default: true,
  },
  standout: {
    type: [String, Boolean],
    required: false,
    default: true,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  useChips: {
    type: Boolean,
    required: false,
    default: false,
  },
  limit: {
    type: Number,
    required: false,
    default: 10,
  },
  dense: {
    type: Boolean,
    required: false,
    default: false,
  },
  nullable: {
    type: Boolean,
    required: false,
    default: false,
  },
  emitFullObject: {
    type: Boolean,
    required: false,
    default: false,
  },
  highlight: {
    type: Boolean,
    required: false,
    default: false,
  },
  minLengthToRequest: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * params added to the query while searching.
   * like {idNotin: '1,2,3,4'} to remove already existing ids from results
   */
  extraParams: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const emit = defineEmits<{
  (e: 'select', value: unknown): void;
  (
    e: 'filter',
    inputValue: string,
    doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
    abortFn: () => void
  ): void;
}>();

const { value, errorMessage, validate } = useField(toRef(props, 'name'));

const selectRef = ref<InstanceType<typeof QSelect>>();

const options = ref<unknown[]>([]);

const searchFilter = ref('');
const offset = ref(0);
const endOfItems = ref(false);
const loading = ref(false);

watch(
  () => value.value,
  (newval: unknown) => {
    // for initial values, return primarykey when updating on Detail views for ex.
    if (newval === null && !props.nullable) {
      value.value = undefined;
    }
    if (
      newval instanceof Object &&
      !Array.isArray(newval) &&
      !props.emitFullObject
    ) {
      options.value = [newval];
      value.value = (newval as Record<string, unknown>)[props.primaryKeyField];
    }
  }
);

watch(
  () => props.highlight,
  () => {
    if (props.highlight) {
      setTimeout(() => {
        selectRef.value?.focus();
      }, 50);
    }
  }
);

const onFilter: QSelectProps['onFilter'] = (val, update, abort) => {
  if (val.length < props.minLengthToRequest) {
    abort();
    return;
  }
  offset.value = 0;
  searchFilter.value = val;
  loading.value = true;
  endOfItems.value = false;
  props
    .queryService({ search: val, limit: props.limit, ...props.extraParams })
    .then(
      (response) => {
        if (!response.next) {
          endOfItems.value = true;
        }
        update(() => {
          options.value = response.results || [];
        });
      },
      (reason: unknown) => {
        console.error(reason);
        abort();
      }
    )
    .finally(() => {
      loading.value = false;
    });
  emit('filter', val, update, abort);
};

const loadMore = () => {
  offset.value += props.limit;
  if (!endOfItems.value && !loading.value) {
    loading.value = true;
    props
      .queryService({
        search: searchFilter.value,
        offset: offset.value,
        limit: props.limit,
        ...props.extraParams,
      })
      .then((response) => {
        if (!response.next) {
          endOfItems.value = true;
        }
        options.value.push(...(response.results || []));
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

defineExpose({ selectRef });
</script>

<style lang="scss">
.limit-max-height-input {
  .q-field__control-container {
    max-height: 100px;
    overflow: auto;
  }
}
</style>
