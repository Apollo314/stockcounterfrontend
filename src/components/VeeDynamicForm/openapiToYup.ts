import { ErrorObject } from 'ajv';
import { TypedSchema, TypedSchemaError } from 'vee-validate';

import { ajv } from 'boot/ajv-validator';
import { $t } from 'boot/i18n';
import { NestedRecord, SchemaObject } from 'src/composables/openapihelpers';

/**
 * to translate ajv errors to any locale
 * @param base string like "invoiceLabels", "itemLabels", depends on the path you translated your fields
 * @param errors errors from ajv passed on directly
 */
const translator = (base: string, errors: ErrorObject[]) => {
  for (const error of errors) {
    const params: Record<string, string> = {};
    for (const [key, value] of Object.entries(error.params)) {
      if (key === 'missingProperty') {
        params[key] = `${base}.${value}`;
      } else {
        params[key] = value;
      }
    }
    error.message = $t(`ajv-errors.${error.keyword}`, params) || error.message;
  }
};

export function openapiToVeeValidateValidator<
  S extends SchemaObject,
  TInput extends NestedRecord
>(componentSchema: S, base: string): TypedSchema<TInput, TInput> {
  const validateFunc = ajv.compile(componentSchema);
  const schema: TypedSchema = {
    __type: 'VVTypedSchema',
    async parse(values: TInput) {
      const haserrors = validateFunc(values);
      const ajvErrors: ErrorObject[] = validateFunc.errors
        ? validateFunc.errors
        : [];
      translator(base, ajvErrors);
      const errors: TypedSchemaError[] =
        ajvErrors.map((error) => {
          return {
            path: joinPath(error),
            errors: error.message ? [error.message] : [],
          };
        }) || [];
      const value = haserrors ? undefined : values;
      return {
        errors,
        value,
      };
    },
  };
  return schema;
}

/**
 * outer.0.inner.2.amount => outer[0].inner[2].amount
 */
export const dotIndexToBrackets = (path: string): string => {
  const regex = /\.(\d+)\./gm;
  const subst = `[$1].`;
  return path.replace(regex, subst);
};

function joinPath(
  error: ErrorObject<string, Record<string, unknown>, unknown>
) {
  let path = '';
  let pathArray: string[] = [];
  if (error.instancePath.startsWith('/')) {
    path = error.instancePath.slice(1);
    pathArray = path.split('/');
  }
  if (error.params.missingProperty) {
    pathArray.push(error.params.missingProperty as string);
  }
  return dotIndexToBrackets(pathArray.join('.'));
}
