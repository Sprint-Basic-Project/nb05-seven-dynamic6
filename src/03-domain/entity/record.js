// 비즈니스 규칙 최종보스 , DTO에서 넘어온 값이 도메인규칙을 만족하는지 확인
import { Exception } from "../../common/exception/exception.js";

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
  // 검증 + 생성
  // 1. 운동종류 enum으로 정해져 있음 / 2. 시간 > 0 & 정수 / 3. 거리 > 0, 실수 / 4. 이미지 3장까지만 등록
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
        400,
        "운동 종류는 RUNNING, SWIMMING, CYCLING 중 하나여야 한다.",
      );
    }
    if (!Number.isInteger(time) || time < 0) {
      throw new Exception(400, "시간은 0이상의 정수여야 한다");
    }
    if (typeof distance !== "number" || distance < 0) {
      throw new Exception(400, "거리는 0이상의 실수여야 한다.");
    }
    // 숫자가 DB에 들어가게 변환해야될걸..? 아마도..(거리, 시간)
    if (images && images.length > 3) {
      throw new Exception(400, "사진은 최대 3장까지만 등록 가능");
    }

    return new Record({
      description,
      time,
      distance,
      groupId,
      userId,
      userJoinGroupId,
      images,
    });
  }
}
