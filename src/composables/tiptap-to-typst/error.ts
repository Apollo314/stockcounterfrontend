export class InvalidTiptapObjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTiptapObjectError';
  }
}
