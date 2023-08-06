<template>
  <form
    class="full-height"
    :validation-schema="validator"
    @submit.prevent="handleSubmit(submit)()"
  >
    <AdaptiveCard back-button :class="{ fit }">
      <template #title-sticky>
        <div class="text-h6" :class="{ 'text-positive': props.query }">
          {{ query ? updateTitle : createTitle }}
        </div>
      </template>
      <div class="q-px-md form-parent">
        <DynamicForm :form-components="formComponents">
          <template
            v-for="(slot, slotKey) in $slots"
            #[slotKey]="slotProps"
            :key="slotKey"
          >
            <slot :name="slotKey" v-bind="slotProps"></slot>
          </template>
        </DynamicForm>
      </div>
      <template #action-bottom>
        <div class="row full-width justify-end q-pa-sm">
          <q-btn
            v-if="query !== null"
            flat
            no-caps
            color="negative"
            icon="delete"
            :label="$t('commons.delete')"
            @click="confirmDelete"
          />
          <q-space />
          <q-btn
            flat
            color="negative"
            icon="clear"
            :label="$t('commons.cancel')"
            type="reset"
          />
          <q-btn
            flat
            color="primary"
            icon="save"
            :label="$t('commons.ok')"
            type="submit"
          />
        </div>
      </template>
    </AdaptiveCard>
  </form>
</template>

<script setup lang="ts">
import camelCase from 'camelcase';
import { QDialogOptions, QNotifyCreateOptions, useQuasar } from 'quasar';
import { Path, useForm } from 'vee-validate';
import { PropType, onBeforeMount, ref, toRef } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';

import { api } from 'boot/axios';
import { $t } from 'boot/i18n';
import AdaptiveCard from 'components/Card/AdaptiveCard.vue';
import RepeatTextConfirmation from 'components/Dialogs/RepeatTextConfirmation.vue';
import DynamicForm from 'components/VeeDynamicForm/DynamicForm.vue';
import { CancelablePromise } from 'src/client';
import { paths } from 'src/client/schema.json';
import { parseDRFErrors } from 'src/components/VeeDynamicForm/drfErrorToYup';
import {
  NestedRecord,
  OperationObject,
  create_form,
  extractRequestSchemaFromOperation,
  get_operation,
} from 'src/composables/openapihelpers';
import { callOrGet } from 'src/composables/utilities';

// import type { paths } from 'src/client/schema.json';

const props = defineProps({
  /**
   * Object such as {id: 2} or {name: 'Food'}, identifier to retreive
   * single object for update, retreive and delete operations
   */
  query: {
    type: Object as PropType<Record<string, number | string>>,
    required: false,
    default: null,
  },
  /**
   * could be a function that returns objects like {caption: 'Created Category!'} or just the object.
   * receives response from the create request as argument if it's a function.
   */
  createSuccessNotifyProps: {
    type: [Function, Object] as PropType<
      QNotifyCreateOptions | ((response: unknown) => QNotifyCreateOptions)
    >,
    required: false,
    default: () => {
      return {
        message: $t('notifications.created_successfully'),
      };
    },
  },
  /**
   * could be a function that returns objects like {caption: 'Updated Category!'} or just the object.
   * receives response from the update request as argument if it's a function.
   */
  updateSuccessNotifyProps: {
    type: [Function, Object] as PropType<
      QNotifyCreateOptions | ((response: unknown) => QNotifyCreateOptions)
    >,
    required: false,
    default: () => {
      return {
        message: $t('notifications.updated_successfully'),
      };
    },
  },
  /**
   * could be a function that returns objects like {caption: 'Updated Category!'} or just the object.
   * receives response from the delete request as argument if it's a function.
   */
  deleteSuccessNotifyProps: {
    type: [Function, Object] as PropType<
      QNotifyCreateOptions | ((response: unknown) => QNotifyCreateOptions)
    >,
    required: false,
    default: () => {
      return {
        message: $t('notifications.deleted_successfully'),
      };
    },
  },
  deleteDialogProps: {
    // TODO: make this better when generics are better supported
    type: [Function, Object] as PropType<
      QDialogOptions | ((values: NestedRecord) => QDialogOptions)
    >,
    required: false,
  },
  /**
   * could be a function that returns a route or just a route. receives response from the create
   * request as argument if it's a function.
   */
  createRedirect: {
    type: [Function, Object, String] as PropType<
      RouteLocationRaw | ((response: unknown) => RouteLocationRaw)
    >,
    required: true,
  },
  /**
   * could be a function that returns a route or just a route. receives response from the update
   * request as argument if it's a function.
   */
  updateRedirect: {
    type: [Function, Object, String] as PropType<
      RouteLocationRaw | ((response: unknown) => RouteLocationRaw)
    >,
    required: false,
  },
  /**
   * could be a function that returns a route or just a route. receives response from the delete
   * request as argument if it's a function.
   */
  deleteRedirect: {
    type: [Function, Object, String] as PropType<
      RouteLocationRaw | ((response: unknown) => RouteLocationRaw)
    >,
    required: true,
  },
  updateTitle: {
    type: String,
    required: false,
    default: $t('forms.titles.generic_update'),
  },
  createTitle: {
    type: String,
    required: false,
    default: $t('forms.titles.generic_create'),
  },
  createPath: {
    type: String as PropType<keyof typeof paths>,
    required: true,
  },
  updateRetrieveDestroyPath: {
    type: String as PropType<keyof typeof paths>,
    required: true,
  },
  hiddenFields: {
    type: Array as PropType<string[]>,
    required: false,
  },
  /**
   * whether or not to have fit class in card
   */
  fit: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const initialValues = ref();
const $q = useQuasar();
const router = useRouter();

type QueryService = (query: unknown) => CancelablePromise<unknown>;

function requestService<
  S extends keyof typeof api,
  O extends keyof (typeof api)[S]
>(service: S, operation: O) {
  return (query: unknown) => {
    return (api[service][operation] as QueryService)(query);
  };
}

type Req = Parameters<typeof get_operation>[1];
const postOp = get_operation(toRef(props, 'createPath').value, 'post' as Req);
const createSchema = extractRequestSchemaFromOperation(postOp);

const { formComponents, hiddenFormComponents, validator } = create_form(
  createSchema,
  toRef(props, 'hiddenFields').value
);

const {
  values,
  errors,
  setFieldValue,
  setErrors,
  validate: validateForm,
  validateField,
  handleSubmit,
  useFieldModel,
} = useForm<NestedRecord>({
  validationSchema: validator,
  initialValues: initialValues,
});

function requestServiceFromOp(operation: OperationObject) {
  if (operation.operationId && operation.tags) {
    const operationId = camelCase(operation.operationId);
    const tag = camelCase(operation.tags[0]);
    const service = requestService(
      tag as keyof typeof api,
      operationId as keyof (typeof api)[keyof typeof api]
    );
    return service;
  }
}

const confirmDelete = () => {
  $q.dialog({
    component: RepeatTextConfirmation,
    componentProps: {
      explanation: $t('commons.are-you-sure-you-want-to-delete'),
      icon: 'delete',
      color: 'negative',
    },
    ...callOrGet(props.deleteDialogProps, [values]),
  }).onOk(() => {
    if (props.query) {
      const requester = requestServiceFromOp(
        get_operation(props.updateRetrieveDestroyPath, 'delete' as Req)
      );
      if (requester) {
        requester(props.query)
          .then((response) => {
            $q.notify({
              position: 'bottom-right',
              icon: 'delete',
              color: 'positive',
              ...callOrGet(props.deleteSuccessNotifyProps, [response]),
            });
            router.replace(callOrGet(props.deleteRedirect, [response]));
          })
          .catch((reason) => {
            const errors = parseDRFErrors(reason);
            if (errors) {
              setErrors(
                errors as Partial<
                  Record<Path<NestedRecord>, string | undefined>
                >
              );
            } else {
              $q.notify({
                position: 'bottom-right',
                closeBtn: true,
                icon: 'error',
                message: $t('notifications.request_failed'),
                color: 'negative',
                caption: JSON.stringify(reason),
              });
            }
          });
      }
    }
  });
};

onBeforeMount(() => {
  if (props.query) {
    const requester = requestServiceFromOp(
      get_operation(props.updateRetrieveDestroyPath, 'get' as Req)
    );
    if (requester) {
      requester(props.query).then((result) => {
        initialValues.value = result;
      });
    }
  }
});

function submit(event: NestedRecord) {
  if (!props.query) {
    const requester = requestServiceFromOp(postOp);
    if (requester) {
      requester({ requestBody: event })
        .then((response) => {
          $q.notify({
            position: 'bottom-right',
            icon: 'done',
            color: 'positive',
            ...callOrGet(props.createSuccessNotifyProps, [response]),
          });
          if (props.createRedirect) {
            router.push(callOrGet(props.createRedirect, [response]));
          }
        })
        .catch((reason) => {
          const errors = parseDRFErrors(reason);
          if (errors) {
            setErrors(
              errors as Partial<Record<Path<NestedRecord>, string | undefined>>
            );
          } else {
            $q.notify({
              position: 'bottom-right',
              closeBtn: true,
              icon: 'error',
              message: $t('notifications.request_failed'),
              color: 'negative',
              caption: JSON.stringify(reason),
            });
          }
        });
    }
  } else {
    const requester = requestServiceFromOp(
      get_operation(props.updateRetrieveDestroyPath, 'put' as Req)
    );
    if (requester) {
      requester({ ...props.query, requestBody: event })
        .then((response) => {
          $q.notify({
            position: 'bottom-right',
            icon: 'done',
            color: 'positive',
            ...callOrGet(props.updateSuccessNotifyProps, [response]),
          });
          if (props.updateRedirect) {
            router.push(callOrGet(props.updateRedirect, [response]));
          }
        })
        .catch((reason) => {
          const errors = parseDRFErrors(reason);
          if (errors) {
            setErrors(
              errors as Partial<Record<Path<NestedRecord>, string | undefined>>
            );
          } else {
            $q.notify({
              position: 'bottom-right',
              closeBtn: true,
              icon: 'error',
              message: $t('notifications.request_failed'),
              color: 'negative',
              caption: JSON.stringify(reason),
            });
          }
        });
    }
  }
}

defineExpose({
  values,
  errors,
  setErrors,
  setFieldValue,
  validateForm,
  validateField,
  useFieldModel,
  initialValues,
  formComponents,
  hiddenFormComponents,
  validator,
});
</script>
