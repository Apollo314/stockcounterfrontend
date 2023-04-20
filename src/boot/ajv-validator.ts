import Ajv from 'ajv';

const ajv = new Ajv({
  strict: false,
  allErrors: true,
  strictSchema: false,
  strictTypes: false,
});
ajv.addFormat('decimal', true);
ajv.addFormat('date-time', true);
ajv.addFormat('binary', true);

export { ajv };
