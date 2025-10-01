import { BaseReqDTO } from "./base.req.dto.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import { Exception } from "../../common/exception/exception.js";

const normalizeExerciseType = (rawType) => {
  if (!rawType == null) return undefined;

  const key = String(rawType)
    .normalize("NFC")            
    .trim()
    .toLowerCase()
    .replace(/[\s\u200B\u00A0]+/g, "");

  const map = {
    run: "RUNNING",
    running: "RUNNING",
    러닝: "RUNNING",
    swim: "SWIMMING",
    swimming: "SWIMMING",
    수영: "SWIMMING",
    cycle: "CYCLING",
    cycling: "CYCLING",
    bike: "CYCLING",
    사이클링: "CYCLING",
    
  };
  const result = map[key];
  return result;
};

export class RecordReqDTO extends BaseReqDTO {
  validate() {
    const reqBody = this.body ?? {};
    const reqParams = this.params ?? {};
    const { groupId } = reqParams;
    const groupIdNum = Number(groupId);
    const isNumber = Number.isInteger(groupIdNum);

    const rawType = reqBody.exerciseType ?? reqBody.type ?? reqBody.kind;
    const exerciseType = normalizeExerciseType(rawType);
    const description = String(reqBody.description ?? "").trim();
    const time = Number(reqBody.time);
    const distance = Number(reqBody.distance);
    const images = Array.isArray(reqBody.images)
      ? reqBody.images
      : Array.isArray(reqBody.photos)
        ? reqBody.photos
        : [];
    const nickname = (reqBody.nickname ?? reqBody.authorNickname)
      ?.toString()
      .trim();
    const password = (reqBody.password ?? reqBody.authorPassword)
      ?.toString()
      .trim();

    if (!isNumber) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_ID_INVALID.statusCode,
        EXCEPTION_INFO.GROUP_ID_INVALID.message,
        "groupId",
      );
    }
    if (!exerciseType) {
      throw new Exception(
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.statusCode,
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.message,
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.path,
      );
    }

    if (!description) {
      throw new Exception(
        EXCEPTION_INFO.DESCRIPTION_INVALID.statusCode,
        EXCEPTION_INFO.DESCRIPTION_INVALID.message,
        EXCEPTION_INFO.DESCRIPTION_INVALID.path,
      );
    }

    if (time === undefined || !Number.isFinite(time)) {
      throw new Exception(
        EXCEPTION_INFO.TIME_INVALID.statusCode,
        EXCEPTION_INFO.TIME_INVALID.message,
        EXCEPTION_INFO.TIME_INVALID.path,
      );
    }
    if (distance === undefined || !Number.isFinite(distance)) {
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
      groupId: groupIdNum,
      exerciseType,
      description,
      time,
      distance,
      images,
      nickname,
      password,
    };
  }
}
