import RecordImage from "./record.image.js";

export class Record {
  #recordId;
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
    recordId = null,
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
    this.#recordId = recordId;
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

  
  get recordId() { return this.#recordId; }
  get exerciseType() { return this.#exerciseType; }
  get description() { return this.#description; }
  get time() { return this.#time; }
  get distance() { return this.#distance; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }
  get deletedAt() { return this.#deletedAt; }
  get groupId() { return this.#groupId; }
  get userId() { return this.#userId; }
  get userJoinGroupId() { return this.#userJoinGroupId; }
  get images() { return this.#images; }

  // 검증 + 생성
  // 운동종류 / 설명 / 시간 / 거리 / 사진 / 
  static forCreate({
    exerciseType,
    description,
    time,
    distance,
    groupId,
    userId,
    userJoinGroupId,
    images = [],
  }) {
    const allowedExercise = ["RUNNING", "SWIMMING", "CYCLING"];
    if (!allowedExercise.includes(exerciseType)) {
      throw Error("운동 종류는 RUNNING, SWIMMING, CYCLING 중 하나여야 한다.");
    }
    if (!description || description.trim().length === 0) {
      throw Error("운동에 대한 설명 입력해야 한다.");
    }
    if (!Number.isInteger(time) || time < 0) {
      throw Error("시간은 0이상의 정수여야 한다.");
    }
    if (typeof distance !== "number" || distance < 0) {
      throw Error("거리는 0이상의 실수여야 한다.");
    }
    if (images.length > 3) {
      throw Error("사진은 최대 3장까지만 등록 가능.");
    }

    return new Record({
      exerciseType,
      description,
      time,
      distance,
      groupId,
      userId,
      userJoinGroupId,
      images,
    });
  }

  toJSON() {
    return {
      recordId: this.#recordId,
      exerciseType: this.#exerciseType,
      description: this.#description,
      time: this.#time,
      distance: this.#distance,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deletedAt: this.#deletedAt,
      groupId: this.#groupId,
      userId: this.#userId,
      userJoinGroupId: this.#userJoinGroupId,
      images: this.#images.map(img => img.toJSON?.() ?? img),
    };
  }
}
