import { extend, locale } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/tr';

extend(relativeTime);
extend(updateLocale);
extend(duration);
locale('tr');
