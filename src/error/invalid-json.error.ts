export class InvalidJsonError extends Error {
  public constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
