export class BaseReqDTO {
  headers;
  body;
  params;
  query;
  file;
  files;

  constructor({
    headers = {},
    body = {},
    params = {},
    query = {},
    file = {},
    files = [],
  }) {
    this.headers = headers;
    this.body = body;
    this.params = params;
    this.query = query;
    this.file = file;
    this.files = files;
  }

  validate() {
    throw new Error("validate 메소드를 구현하세요.");
  }

  isString(value) {
    return typeof value === "string";
  }
  isNumber(value) {
    return typeof value === "number";
  }
  isBoolean(value) {
    return typeof value === "boolean";
  }
  isEmail(email) {
    if (!this.isString(email)) {
      return false;
    }
    if (!email.includes("@")) {
      return false;
    }
    return true;
  }
}
