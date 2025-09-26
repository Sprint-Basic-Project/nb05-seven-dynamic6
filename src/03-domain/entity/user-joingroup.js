export class UserJoinGroup {
  #id;
  #joinedAt;
  #updatedAt;
  #deletedAt;
  #groupId;
  #userId;

  constructor({
    id = undefined,
    joinedAt = new Date(),
    updatedAt = new Date(),
    deletedAt = undefined,
    groupId,
    userId,
  }) {
    this.#id = id;
    this.#joinedAt = joinedAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
    this.#groupId = groupId;
    this.#userId = userId;
  }

  get id() {
    return this.#id;
  }

  get joinedAt() {
    return this.#joinedAt;
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
}
