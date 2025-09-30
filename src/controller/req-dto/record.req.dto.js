//DTO는 입력값 모양 확인 + 타입변환 / 도메인 규칙검증은 entity에서 함.

import { BaseReqDTO } from "./base.req.dto.js";
import { Exception } from "../../common/exception/exception.js";

export class RecordReqDTO extends BaseReqDTO {
  validate() {
    const {
      exerciseType,
      description,
      time,
      distance,
      images = [],
      nickname,
      password,
    } = this.body || {};
    const { groupId } = this.params || {};

    if (!groupId) {
      throw new Exception(400, "그룹ID가 필요");
    }
    if (!exerciseType) {
      throw new Exception(400, "운동 종류를 입력");
    }

    const desc = description ? String(description).trim() : "";
    if (!desc) {
      throw new Exception(400, "설명은 필수");
    }

    if (time === undefined || !Number.isFinite(Number(time))) {
      throw new Exception(400, "시간을 입력");
    }
    if (distance === undefined || !Number.isFinite(Number(distance))) {
      throw new Exception(400, "거리를 입력");
    }
    if (images.length > 3) {
      throw new Exception(400, "사진은 최대 3장까지 등록 가능");
    }
    if (!nickname) {
      throw new Exception(400, "닉네임은 필수");
    }
    if (!password) {
      throw new Exception(400, "패스워드는 필수");
    }

    return {
      groupId,
      exerciseType,
      description: desc,
      time: Number(time),
      distance: Number(distance),
      images,
      nickname: String(nickname).trim(),
      password: String(password).trim(),
    };
  }
}
