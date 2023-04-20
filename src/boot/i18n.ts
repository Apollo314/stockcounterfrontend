import { boot } from 'quasar/wrappers';
import { WritableComputedRef } from 'vue';
import { createI18n, ComposerTranslation } from 'vue-i18n';

import en from 'src/i18n/en';
import tr from 'src/i18n/tr';

const messages = {
  en: en,
  tr: tr,
};

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}

/* eslint-enable @typescript-eslint/no-empty-interface */
const i18n = createI18n<[MessageSchema], MessageLanguages>({
  locale: navigator.language.split('-')?.[0],
  fallbackLocale: 'en',
  legacy: false,
  messages,
});

export const $t = i18n.global.t as ComposerTranslation;
export const $locale = i18n.global
  .locale as unknown as WritableComputedRef<string>;

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
