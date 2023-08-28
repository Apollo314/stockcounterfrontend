import { Notify } from 'quasar';

import { $t } from 'boot/i18n';

import { ApiError } from '../client';
import { Reason } from '../components/VeeDynamicForm/drfErrorToYup';

export function notifyErrors(reason: ApiError) {
  const reasonBody = reason.body as Reason['body'];
  const errorString = reasonBody.errors.map((err) => err.detail).join(' | ');
  Notify.create({
    message: $t(reasonBody.type),
    caption: errorString,
    color: 'red',
    icon: 'error',
  });
}
