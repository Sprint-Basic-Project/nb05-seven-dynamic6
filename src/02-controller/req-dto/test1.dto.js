import { BaseReqDTO } from "./base.req.dto.js";

export class Test1DTO extends BaseReqDTO {
  constructor(data) {
    super(data);
  }

  validate() {
    const { id, title, content } = this.body;
    if (!id) {
      console.log(id);
      throw Error("아이디를 다시 입력해주세요.");
    }
    if (!title) {
      throw Error("제목을 다시 입력해주세요.");
    }
    if (!content) {
      throw Error("내용을 다시 입력해주세요.");
    }

    return {
      id,
      title,
      content,
    };
  }
}
