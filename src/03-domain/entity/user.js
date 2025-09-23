export class User {
  #userId;
  #nickname;
  #passwordHash;
  #createdAt;
  #updatedAt;
  #deletedAt;

  constructor({
    userId,
    nickname,
    passwordHash,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.#userId = userId;
    this.#nickname = nickname;
    this.#passwordHash = passwordHash;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
  }

  static forCreate({ nickname, passwordHash }) {
    this.validateNickname(nickname);
    this.validatePassword(passwordHash);
    return new User({ nickname, passwordHash });
  }

  static validateNickname(nickname) {
    if (nickname > 10) {
      throw Error("닉네임은 10글자 이내로 작성해주세요.");
    }
  }

  static validatePassword(passwordHash) {
    if (passwordHash > 5) {
      throw Error("비밀번호는 5글자 이상입니다.");
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
