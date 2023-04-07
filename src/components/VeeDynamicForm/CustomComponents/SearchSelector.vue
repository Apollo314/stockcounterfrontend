<template>
  <q-select
    ref="selectRef"
    :multiple="multiple"
    use-input
    :standout="standout"
    class="label-top limit-max-height-input"
    v-model="value"
    @update:model-value="$emit('select', $event)"
    :options="options"
    @filter="onFilter"
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
    @blur="validate()"
    :hide-bottom-space="hideBottomSpace"
    :bg-color="highlight ? 'primary' : undefined"
  >
    <template #after-options>
      <div
        v-if="!endOfItems"
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
  </q-select>
</template>

<script setup lang="ts">
import { QSelectProps } from 'quasar';
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
});

defineEmits<{
  (e: 'select', value: Record<string, string | object>): void;
}>();

const { value, errorMessage, validate } = useField(toRef(props, 'name'));

const selectRef = ref();

const options = ref();

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

const onFilter: QSelectProps['onFilter'] = (val, update, abort) => {
  offset.value = 0;
  searchFilter.value = val;
  loading.value = true;
  endOfItems.value = false;
  props
    .queryService({ search: val, limit: props.limit })
    .then(
      (response) => {
        if (!response.next) {
          endOfItems.value = true;
        }
        update(() => {
          options.value = response.results;
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
      })
      .then((response) => {
        if (!response.next) {
          endOfItems.value = true;
        }
        options.value = [...options.value, ...(response?.results || [])];
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>

<style lang="scss">
.limit-max-height-input {
  .q-field__control-container {
    max-height: 100px;
    overflow: auto;
  }
}
</style>
