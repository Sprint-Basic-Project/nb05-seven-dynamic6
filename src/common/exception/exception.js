export class Exception extends Error {
  statusCode;
  message;

  constructor(statusCode, message, path) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (path) this.path = path; //path추가
  }
}
