import { Exception } from "../../common/exception/exception.js";

export class RecordImage {
  #id;
  #imageUrl;
  #recordId;

  constructor({ id, imageUrl, recordId }) {
    this.#id = id;
    this.#imageUrl = imageUrl;
    this.#recordId = recordId;
  }
  get imageId() {
    return this.#id;
  }
  get imageUrl() {
    return this.#imageUrl;
  }
  get recordId() {
    return this.#recordId;
  }

  static forCreate({ imageUrl, recordId }) {
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Exception(400, "imageUrl은 문자열");
    }
    if (!recordId) {
      throw new Exception(400, "recordId는 필수");
    }

    return new RecordImage({ imageUrl, recordId });
  }
}
