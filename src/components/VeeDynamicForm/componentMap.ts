import { api } from 'boot/axios';
import { $t } from 'boot/i18n';
import {
  Bank,
  CancelablePromise,
  Category,
  Group,
  ItemOut,
  PaymentAccountOut,
  PaymentTypeEnum,
  Permission,
  Stakeholder,
  StockUnit,
  User,
  Warehouse,
} from 'src/client';
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
  'bank-selector',
  'stakeholder-selector',
  'warehouse-selector',
  'enum-selector',
  'checkbox',
  'single-image-selector',
  'money-input',
  'money-range',
  'barcode-scanner',
  'date-time-range',
  'multi-stockunit-selector',
  'payment-account-select',
  'payment-type-select',
  'permissions-selector',
  'group-selector',
  'hidden',
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
          optionLabel: <T>(option: T) => string;
        };
  };
};

export const componentMap: ComponentMap = {
  'text-input': { component: DefaultField },
  'payment-account-select': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory(
        'payments',
        'paymentsPaymentAccountsList'
      ),
      optionLabel: (option: PaymentAccountOut) => option.name,
    },
  },
  'payment-type-select': {
    component: EnumSelector,
    props: {
      options: ['cash', 'cheque'] as PaymentTypeEnum[],
      optionLabel: (option) => option,
      clearable: true,
    },
  },
  'category-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryCategoryList'),
      optionLabel: (option: Category) => option?.name,
    },
  },
  'multi-category-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryCategoryList'),
      optionLabel: (option: Category) => option?.name,
      multiple: true,
      useChips: true,
    },
  },
  'unit-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryStockUnitList'),
      optionLabel: (option: StockUnit) => option?.name,
    },
  },
  'multi-stockunit-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryStockUnitList'),
      optionLabel: (option: StockUnit) => option?.name,
      multiple: true,
      useChips: true,
    },
  },
  'user-select': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('user', 'userAccountsList'),
      optionLabel: (option: User) => option?.username,
    },
  },
  'item-select': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryItemList'),
      optionLabel: (option: ItemOut) => option?.name,
    },
  },
  'warehouse-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('inventory', 'inventoryWarehouseList'),
      optionLabel: (option: Warehouse) => option.name,
    },
  },
  'bank-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('payments', 'paymentsBanksList'),
      optionLabel: (option: Bank) => option.name,
    },
  },
  'stakeholder-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory(
        'stakeholder',
        'stakeholderStakeholdersList'
      ),
      optionLabel: (option: Stakeholder) => option.name,
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
  'permissions-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('user', 'userPermissionsList'),
      optionLabel: (option: Permission) => {
        return `${option.content_type.app_label} / ${option.content_type.name} / ${option.name}`;
      },
    },
  },
  'group-selector': {
    component: SearchSelector,
    props: {
      queryService: queryServiceFactory('user', 'userGroupsList'),
      optionLabel: (option: Group) => {
        return option.name;
      },
    },
  },
  hidden: {
    component: DefaultField,
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

export const getProps = <FC extends FormComponent>(
  formComponent: FC | undefined
) => {
  if (formComponent === undefined) return { label: 'unknown' };
  let componentDefinition = componentMap[formComponent.componentString];
  if (componentDefinition === undefined) {
    componentDefinition = componentMap['undefined'];
  }
  return { ...componentDefinition.props, ...formComponent.props };
};
