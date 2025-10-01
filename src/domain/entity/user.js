import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";

export class User {
  #id;
  #nickname;
  #passwordHash;
  #createdAt;
  #updatedAt;
  #deletedAt;

  constructor({
    id = undefined,
    nickname,
    passwordHash,
    createdAt = new Date(),
    updatedAt = new Date(),
    deletedAt = undefined,
  }) {
    this.#id = id;
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
    return new User({
      nickname,
      passwordHash,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }

  static validateNickname(nickname) {
    if (nickname.length > 10) {
      throw new Exception(
        EXCEPTION_INFO.NICKNAME_TOO_LONG.statusCode,
        EXCEPTION_INFO.NICKNAME_TOO_LONG.message,
      );
    }
  }

  static validatePassword(passwordHash) {
    if (passwordHash.length < 5) {
      throw new Exception(
        EXCEPTION_INFO.PASSWORD_TOO_SHORT.statusCode,
        EXCEPTION_INFO.PASSWORD_TOO_SHORT.message,
      );
    }
  }
  get id() {
    return this.#id;
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
