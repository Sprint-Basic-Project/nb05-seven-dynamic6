export class Exception extends Error {
  statusCode;
  message;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
