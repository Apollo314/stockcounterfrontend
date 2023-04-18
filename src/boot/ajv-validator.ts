import Ajv from 'ajv';

import * as schema from 'src/client/schema.json';

const ajv = new Ajv({
  strict: false,
  allErrors: true,
  strictSchema: false,
  strictTypes: false,
});
ajv.addSchema(schema, 'root');
ajv.addFormat('decimal', true);
ajv.addFormat('date-time', true);
ajv.addFormat('binary', true);

export { ajv, schema };
