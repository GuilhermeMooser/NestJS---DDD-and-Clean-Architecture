export class InvalidCrendialsError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'InvalidCrendialsError';
  }
}
