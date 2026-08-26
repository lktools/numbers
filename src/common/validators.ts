export function assertFiniteNumber(value: number): void {
  if (!Number.isFinite(value)) {
    throw new TypeError("Value must be a finite number");
  }
}

export function assertInteger(value: number): void {
  if (!Number.isInteger(value)) {
    throw new TypeError("Value must be an integer");
  }
}

export function assertSafeInteger(value: number): void {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`Value must be a safe integer between -${Number.MAX_SAFE_INTEGER} and ${Number.MAX_SAFE_INTEGER}`);
  }
}
