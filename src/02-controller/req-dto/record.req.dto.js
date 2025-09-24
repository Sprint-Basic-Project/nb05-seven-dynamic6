//DTO는 입력값 모양 확인 + 타입변환 / 도메인 규칙검증은 entity에서 함.

import { BaseReqDTO } from "./base.req.dto.js";
import { Exception } from "../../common/exception/exception.js";

export class RecordReqDTO extends BaseReqDTO {
  validate() {
    const { exerciseType, description, time, distance } = this.body || {};
    const { groupId } = this.params || {};
    const files = this.files ?? [];

    if (!groupId) {
      throw new Exception(400, "그룹ID가 필요");
    }
    if (!exerciseType) {
      throw new Exception(400, "운동 종류를 입력");
    }
    if (time === undefined) {
      throw new Exception(400, "시간을 입력");
    }
    if (distance === undefined) {
      throw new Exception(400, "거리를 입력");
    }
    if (files.length > 3) {
      throw new Exception(400, "사진은 최대 3장까지 등록 가능");
    }

    return {
      groupId,
      exerciseType,
      description: description ?? "",
      time: Number(time),
      distance: Number(distance),
      images: files.map((f) => `/images/${f.filename}`),
    };
  }
}
