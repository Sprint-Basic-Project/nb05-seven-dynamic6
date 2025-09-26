import { BaseReqDTO } from "./base.req.dto.js";

export class GetGroupIdReqDto extends BaseReqDTO {
  groupId;

  constructor({
    headers = {},
    body = {},
    params = {},
    query = {},
    file = {},
    files = [],
  }) {
    super({ headers, body, params, query, file, files });
    this.groupId = parseInt(params.groupId, 10); // int 변환 -api 명세에 기재되어있음
  }
}
