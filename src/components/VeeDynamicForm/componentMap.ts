import { api } from 'boot/axios';
import { $t } from 'boot/i18n';
import { CancelablePromise } from 'src/client';
import { FormComponent } from 'src/composables/openapihelpers';

import BarcodeScanner from './CustomComponents/BarcodeScanner.vue';
import CheckBox from './CustomComponents/CheckBox.vue';
import DateRange from './CustomComponents/DateRange.vue';
import DefaultField from './CustomComponents/DefaultField.vue';
import EnumSelector from './CustomComponents/EnumSelector.vue';
import ImageSelector from './CustomComponents/ImageSelector.vue';
import NumberInput from './CustomComponents/NumberInput.vue';
import NumberRange from './CustomComponents/NumberRange.vue';
import SearchSelector from './CustomComponents/SearchSelector.vue';
import UndefinedWarningComponent from './CustomComponents/UndefinedWarningComponent.vue';

import type { Component } from 'vue';

export const componentStrings = [
  'text-input',
  'category-selector',
  'multi-category-selector',
  'unit-selector',
  'user-select',
  'item-select',
  'enum-selector',
  'checkbox',
  'single-image-selector',
  'money-input',
  'money-range',
  'barcode-scanner',
  'date-time-range',
  'undefined',
] as const;

export type ComponentStrings = (typeof componentStrings)[number];

type Query = {
  limit?: number;
  offset?: number;
  ordering?: string;
  search?: string;
};

export type PaginatedResult = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<unknown>;
};

export type QueryService = (query: Query) => CancelablePromise<PaginatedResult>;

export function queryServiceFactory<
  S extends Exclude<keyof typeof api, 'request'>,
  O extends Extract<keyof (typeof api)[S], `${string}List`>
>(service: S, operation: O) {
  return (query: Query) => {
    return (api[service][operation] as QueryService)(query);
  };
}

type ComponentMap = {
  [key in ComponentStrings]: {
    /**
     * A vue component
     */
    component: Component;
    props?:
      | Record<string, unknown>
      | {
          queryService: ReturnType<typeof queryServiceFactory>;
          optionLabel: (option: Record<string, unknown>) => string;
        };
  };
};

export const componentMap: ComponentMap = {
  'text-input': { component: DefaultField },
  'category-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryCategoryList'),
      optionLabel: (option) => option?.name as string,
    },
  },
  'multi-category-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryCategoryList'),
      optionLabel: (option) => option?.name as string,
      multiple: true,
      useChips: true,
    },
  },
  'unit-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryStockUnitList'),
      optionLabel: (option) => option?.name as string,
    },
  },
  'user-select': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('user', 'userAccountsList'),
      optionLabel: (option) => option?.username as string,
    },
  },
  'item-select': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryItemList'),
      optionLabel: (option) => option?.name as string,
    },
  },
  'enum-selector': {
    component: EnumSelector,
  },
  checkbox: {
    component: CheckBox,
  },
  'money-range': {
    component: NumberRange,
    props: {
      leftLabel: $t('labels.minimum'),
      rightLabel: $t('labels.maximum'),
    },
  },
  'date-time-range': {
    component: DateRange,
    props: {},
  },
  'money-input': {
    component: NumberInput,
    props: {},
  },
  'single-image-selector': {
    component: ImageSelector,
    props: {},
  },
  'barcode-scanner': {
    component: BarcodeScanner,
    props: {},
  },
  undefined: {
    component: UndefinedWarningComponent,
    props: {},
  },
};

export const getComponent = (formComponent: FormComponent) => {
  let componentDefinition = componentMap[formComponent.componentString];
  if (componentDefinition === undefined) {
    componentDefinition = componentMap['undefined'];
  }
  return componentDefinition.component;
};

export const getProps = (formComponent: FormComponent) => {
  let componentDefinition = componentMap[formComponent.componentString];
  if (componentDefinition === undefined) {
    componentDefinition = componentMap['undefined'];
  }
  return { ...componentDefinition.props, ...formComponent.props };
};
