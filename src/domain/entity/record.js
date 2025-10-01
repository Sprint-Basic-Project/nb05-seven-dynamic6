// 비즈니스 규칙 최종보스 , DTO에서 넘어온 값이 도메인규칙을 만족하는지 확인
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";

export class Record {
  #id;
  #exerciseType;
  #description;
  #time;
  #distance;
  #createdAt;
  #updatedAt;
  #deletedAt;
  #groupId;
  #userId;
  #userJoinGroupId;
  #images;

  constructor({
    id,
    exerciseType,
    description,
    time,
    distance,
    createdAt = new Date(),
    updatedAt = new Date(),
    deletedAt = null,
    groupId,
    userId,
    userJoinGroupId,
    images = [],
  }) {
    this.#id = id;
    this.#exerciseType = exerciseType;
    this.#description = description;
    this.#time = time;
    this.#distance = distance;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
    this.#groupId = groupId;
    this.#userId = userId;
    this.#userJoinGroupId = userJoinGroupId;
    this.#images = images;
  }

  get id() {
    return this.#id;
  }
  get exerciseType() {
    return this.#exerciseType;
  }
  get description() {
    return this.#description;
  }
  get time() {
    return this.#time;
  }
  get distance() {
    return this.#distance;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }
  get deletedAt() {
    return this.#deletedAt;
  }
  get groupId() {
    return this.#groupId;
  }
  get userId() {
    return this.#userId;
  }
  get userJoinGroupId() {
    return this.#userJoinGroupId;
  }
  get images() {
    return this.#images;
  }
  toJSON() {
    return {
      id: this.id,
      exerciseType: this.exerciseType,
      description: this.description,
      time: this.time,
      distance: this.distance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      groupId: this.groupId,
      userId: this.userId,
      userJoinGroupId: this.userJoinGroupId,
      images: this.images ?? [],
    };
  }
  
  static forCreate({
    exerciseType,
    description,
    time,
    distance,
    groupId,
    userId,
    userJoinGroupId,
    images,
  }) {
    const allowedExercise = ["RUNNING", "SWIMMING", "CYCLING"];
    if (!allowedExercise.includes(exerciseType)) {
      throw new Exception(
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.statusCode,
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.message,
        EXCEPTION_INFO.EXERCISE_TYPE_INVALID.path,
      );
    }
    const desc = description ? String(description).trim() : "";
    if (!desc) {
      throw new Exception(
        EXCEPTION_INFO.DESCRIPTION_INVALID.statusCode,
        EXCEPTION_INFO.DESCRIPTION_INVALID.message,
        EXCEPTION_INFO.DESCRIPTION_INVALID.path,
      );
    }
    if (!Number.isInteger(time) || time < 0) {
      throw new Exception(
        EXCEPTION_INFO.TIME_INVALID.statusCode,
        EXCEPTION_INFO.TIME_INVALID.message,
        EXCEPTION_INFO.TIME_INVALID.path,
      );
    }
    if (
      typeof distance !== "number" ||
      Number.isNaN(distance) ||
      distance < 0
    ) {
      throw new Exception(
        EXCEPTION_INFO.DISTANCE_INVALID.statusCode,
        EXCEPTION_INFO.DISTANCE_INVALID.message,
        EXCEPTION_INFO.DISTANCE_INVALID.path,
      );
    }

    if (images && images.length > 3) {
      throw new Exception(
        EXCEPTION_INFO.PHOTOS_COUNT_EXCEEDED.statusCode,
        EXCEPTION_INFO.PHOTOS_COUNT_EXCEEDED.message,
        EXCEPTION_INFO.PHOTOS_COUNT_EXCEEDED.path,
      );
    }

    return new Record({
      exerciseType,
      description: desc,
      time,
      distance,
      groupId,
      userId,
      userJoinGroupId,
      images,
    });
  }
}
