export class NumberConversionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "NumberConversionError";
  }
}
