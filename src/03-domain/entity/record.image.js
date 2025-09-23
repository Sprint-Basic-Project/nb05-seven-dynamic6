import { Exception } from "../../common/exception/exception";

export class RecordImage {
  #imageId;
  #imageUrl;
  #recordId;

  constructor({ imageId, imageUrl, recordId }) {
    this.#imageId = imageId;
    this.#imageUrl = imageUrl;
    this.#recordId = recordId;
  }
  get imageId() {
    return this.#imageId;
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
