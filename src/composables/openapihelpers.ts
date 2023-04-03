import {
  DiscriminatorObject,
  ExternalDocumentationObject,
  MediaTypeObject,
  OperationObject as WrongOperationObject,
  ReferenceObject,
  ResponseObject,
  XMLObject,
  ParameterObject,
} from 'openapi-typescript';

import { components, paths } from 'src/client/schema.json';

type XComponent = {
  component: string;
  props?: {
    [key: string]: string | number;
  };
};

// this supports type: 'string', pattern?: string
// the openapi-typescript currently does that wrong.
// also I extended it a bit for my needs.
type SchemaObject = {
  discriminator?: DiscriminatorObject;
  xml?: XMLObject;
  externalDocs?: ExternalDocumentationObject;
  example?: unknown;
  title?: string;
  description?: string;
  $comment?: string;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  enum?: unknown[];
  const?: unknown;
  default?: unknown;
  format?: string;
  nullable?: boolean;
  'x-components': XComponent;
  [key: `x-${string}`]: unknown;
} & (
  | {
      oneOf: (SchemaObject | ReferenceObject)[];
    }
  | {
      type: (
        | 'string'
        | 'number'
        | 'integer'
        | 'array'
        | 'boolean'
        | 'null'
        | 'object'
      )[];
    }
  | {
      type: 'string';
      pattern?: string;
      minLength?: number;
      maxLength?: number;
    }
  | {
      type: 'number';
      minimum?: number;
      maximum?: number;
    }
  | {
      type: 'integer';
      minimum?: number;
      maximum?: number;
    }
  | {
      type: 'array';
      prefixItems?: SchemaObject | ReferenceObject;
      items?: SchemaObject | ReferenceObject;
      minItems?: number;
      maxItems?: number;
    }
  | {
      type: 'boolean';
    }
  | {
      type: 'null';
    }
  | {
      type: 'object';
      properties?: {
        [name: string]: SchemaObject | ReferenceObject;
      };
      additionalProperties?:
        | boolean
        | Record<string, never>
        | SchemaObject
        | ReferenceObject;
      required?: string[];
      allOf?: (SchemaObject | ReferenceObject)[];
      anyOf?: (SchemaObject | ReferenceObject)[];
    }
  | {
      allOf: (SchemaObject | ReferenceObject)[];
      anyOf?: (SchemaObject | ReferenceObject)[];
      required?: string[];
    }
  | {
      allOf?: (SchemaObject | ReferenceObject)[];
      anyOf: (SchemaObject | ReferenceObject)[];
      required?: string[];
    }
);

export type ExtendedParameterObject = Omit<ParameterObject, 'schema'> & {
  schema?: SchemaObject;
};

// this fixes ReferenceObject. schema could be a reference object as well.
type CorrectMediaTypeObject = Omit<MediaTypeObject, 'schema'> & {
  schema?: SchemaObject | ReferenceObject;
};

type CorrectResponseObject = Omit<ResponseObject, 'content'> & {
  content?: {
    [contentType: string]: CorrectMediaTypeObject;
  };
};

type CorrectResponsesObject = {
  [responseCode: string]: CorrectResponseObject | ReferenceObject;
} & {
  default?: CorrectResponseObject | ReferenceObject;
};

export type OperationObject = Omit<
  WrongOperationObject,
  'responses' | 'parameters'
> & {
  responses: CorrectResponsesObject;
  parameters?: (ExtendedParameterObject | ReferenceObject)[];
};

function isReference(
  componentOrRef: SchemaObject | ReferenceObject
): componentOrRef is ReferenceObject {
  return '$ref' in componentOrRef;
}

function isObject(
  component: SchemaObject
): component is Extract<SchemaObject, { type: 'object' }> {
  return (
    (component as Extract<SchemaObject, { type: 'object' }>).type === 'object'
  );
}

function isArray(
  component: SchemaObject
): component is Extract<SchemaObject, { type: 'array' }> {
  return (
    (component as Extract<SchemaObject, { type: 'array' }>).type === 'array'
  );
}

function hasOneOf(
  schema: SchemaObject
): schema is Extract<
  SchemaObject,
  { oneOf: (SchemaObject | ReferenceObject)[] }
> {
  return (
    (
      schema as Extract<
        SchemaObject,
        { oneOf: (SchemaObject | ReferenceObject)[] }
      >
    ).oneOf !== undefined
  );
}

function hasAnyOf(
  schema: SchemaObject
): schema is Extract<
  SchemaObject,
  { anyOf: (SchemaObject | ReferenceObject)[] }
> {
  return (
    (
      schema as Extract<
        SchemaObject,
        { anyOf: (SchemaObject | ReferenceObject)[] }
      >
    ).anyOf !== undefined
  );
}

function hasAllOf(
  schema: SchemaObject
): schema is Extract<
  SchemaObject,
  { allOf: (SchemaObject | ReferenceObject)[] }
> {
  return (
    (
      schema as Extract<
        SchemaObject,
        { allOf: (SchemaObject | ReferenceObject)[] }
      >
    ).allOf !== undefined
  );
}

/**
 * goes and gets $ref: #/components/schemas/InvoiceTypeEnum etc and puts it in place.
 * @param schema SchemaObject or ReferenceObject
 * @returns Recursively Dereferenced SchemaObject
 */
export function dereference(
  schema: SchemaObject | ReferenceObject
): SchemaObject {
  if (isReference(schema)) {
    // this assumes all refs are under /components/schemas/refkey
    // it is not necessarily correct and may not work with other projects.
    // for my drf-spectacular setup, it is always correct.
    // one could actually write a recursive access function.
    // that is how I did that before but meh. this is fine.
    schema = get_component(
      schema.$ref.split('/').slice(-1)[0] as keyof typeof components.schemas
    );
    return dereference(schema);
  }
  if (isObject(schema)) {
    for (const key in schema.properties) {
      schema.properties[key] = dereference(schema.properties[key]);
    }
  } else if (isArray(schema)) {
    if (schema.items) {
      schema.items = dereference(schema.items);
    }
  }
  if (hasOneOf(schema)) {
    for (const schemakey in schema.oneOf) {
      schema.oneOf[schemakey] = dereference(schema.oneOf[schemakey]);
    }
  }
  if (hasAnyOf(schema)) {
    for (const schemakey in schema.anyOf) {
      schema.anyOf[schemakey] = dereference(schema.anyOf[schemakey]);
    }
  }
  if (hasAllOf(schema)) {
    for (const schemakey in schema.allOf) {
      schema.allOf[schemakey] = dereference(schema.allOf[schemakey]);
    }
  }
  return schema;
}

export function get_component(
  component_name: keyof typeof components.schemas
): SchemaObject {
  return components.schemas[component_name] as SchemaObject;
}

export function get_operation<
  P extends keyof typeof paths,
  O extends keyof (typeof paths)[P]
>(path_name: P, operation: O) {
  return paths[path_name][operation] as OperationObject;
}
