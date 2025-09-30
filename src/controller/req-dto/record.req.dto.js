//DTO는 입력값 모양 확인 + 타입변환 / 도메인 규칙검증은 entity에서 함.

import { BaseReqDTO } from "./base.req.dto.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
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
      throw new Exception(
        EXCEPTION_INFO.GROUP_ID_INVALID.statusCode,
        EXCEPTION_INFO.GROUP_ID_INVALID.message,
        EXCEPTION_INFO.GROUP_ID_INVALID.path,
      );
    }
    if (!exerciseType) {
      throw new Exception(
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.statusCode,
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.message,
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.path,
      );
    }

    const desc = description ? String(description).trim() : "";
    if (!desc) {
      throw new Exception(
        XCEPTION_INFO.DESCRIPTION_INVALID.statusCode,
        XCEPTION_INFO.DESCRIPTION_INVALID.message,
        XCEPTION_INFO.DESCRIPTION_INVALID.path,
      );
    }

    if (time === undefined || !Number.isFinite(Number(time))) {
      throw new Exception(
        EXCEPTION_INFO.TIME_INVALID.statusCode,
        EXCEPTION_INFO.TIME_INVALID.message,
        EXCEPTION_INFO.TIME_INVALID.path,
      );
    }
    if (distance === undefined || !Number.isFinite(Number(distance))) {
      throw new Exception(
        EXCEPTION_INFO.DISTANCE_INVALID.statusCode,
        EXCEPTION_INFO.DISTANCE_INVALID.message,
        EXCEPTION_INFO.DISTANCE_INVALID.path,
      );
    }
    if (images.length > 3) {
      throw new Exception(
        EXCEPTION_INFO.PHOTOS_COUNT_EXCEEDED.statusCode,
        EXCEPTION_INFO.PHOTOS_COUNT_EXCEEDED.message,
        EXCEPTION_INFO.PHOTOS_COUNT_EXCEEDED.path,
      );
    }
    if (!nickname) {
      throw new Exception(
        EXCEPTION_INFO.AUTHOR_NICKNAME_REQUIRE.statusCode,
        EXCEPTION_INFO.AUTHOR_NICKNAME_REQUIRE.message,
        EXCEPTION_INFO.AUTHOR_NICKNAME_REQUIRE.path,
      );
    }
    if (!password) {
      throw new Exception(
        EXCEPTION_INFO.AUTHOR_PASSWORD_REQUIRE.statusCode,
        EXCEPTION_INFO.AUTHOR_PASSWORD_REQUIRE.message,
        EXCEPTION_INFO.AUTHOR_PASSWORD_REQUIRE.path,
      );
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
