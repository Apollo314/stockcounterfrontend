import { dotIndexToBrackets } from './openapiToYup';

type Reason = {
  body: {
    type: 'validation_error' | 'client_error' | 'server_error';
    errors: {
      code: string;
      detail: string;
      attr: string;
    }[];
  };
};

type CombinedErrors = {
  [path: string]: string[];
};

type VeeValidateCompatibleErrors = {
  [path: string]: string;
};

export const parseDRFErrors = (
  reason: Reason
): VeeValidateCompatibleErrors | undefined => {
  const combinedErrors: CombinedErrors = {};
  if (reason?.body?.type == 'validation_error') {
    for (const { code, detail, attr } of reason.body.errors) {
      if (combinedErrors?.[attr]) {
        combinedErrors[dotIndexToBrackets(attr)].push(`(${code}): ${detail}`);
      } else {
        combinedErrors[dotIndexToBrackets(attr)] = [`(${code}): ${detail}`];
      }
    }
    const errors: VeeValidateCompatibleErrors = {};
    for (const key in combinedErrors) {
      if (Object.prototype.hasOwnProperty.call(combinedErrors, key)) {
        const err_array = combinedErrors[key];
        errors[key] = err_array.join(', ');
      }
    }
    return errors;
  }
};
