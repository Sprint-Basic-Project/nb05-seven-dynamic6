export class User {
  #userId;
  #nickname;
  #passwordHash;
  #createdAt;
  #updatedAt;
  #deletedAt;

  constructor({
    userId = undefined,
    nickname,
    passwordHash,
    createdAt = new Date(),
    updatedAt = new Date(),
    deletedAt = undefined,
  }) {
    this.#userId = userId;
    this.#nickname = nickname;
    this.#passwordHash = passwordHash;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
  }
 static forCreate({
    nickname,
    passwordHash,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.validateNickname(nickname);
    this.validatePassword(passwordHash);
    return new participant({
      nickname,
      passwordHash,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }
    static validateNickname(nickname) {
    if (nickname.length > 10) {
      throw new Exception({
        info: EXCEPTION_INFO.NICKNAME_TOO_LONG,
      });
    }
  }

  static validatePassword(passwordHash) {
    if (passwordHash.length > 5) {
      throw new Exception({
        info: EXCEPTION_INFO.PASSWORD_TOO_SHORT,
      });
    }
  }
  get userId() {
    return this.#userId;
  }
    get nickname() {
    return this.#nickname;
  }
  get passwordHash() {
    return this.#passwordHash;
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
}
