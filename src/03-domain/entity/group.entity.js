export class Group {
  #id;
  #name;
  #likeCount;
  #recordCount;
  #memberCount;

  constructor({ id, name, likeCount, recordCount, memberCount }) {
    this.#id = id;
    this.#name = name;
    this.#likeCount = likeCount;
    this.#recordCount = recordCount;
    this.#memberCount = memberCount;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get likeCount() {
    return this.#likeCount;
  }

  increaseLike() {
    this.#likeCount += 1;
  }

  decreaseLike() {
    if (this.#likeCount > 0) {
      this.#likeCount -= 1;
    }
  }

  evaluateBadges() {
    const toAdd = [];
    const toRemove = [];

    if (this.#memberCount >= 10) toAdd.push("PARTICIPATION_10");
    if (this.#recordCount >= 100) toAdd.push("RECORD_100");
    if (this.#likeCount >= 100) toAdd.push("LIKE_100");

    return { toAdd, toRemove };
  }
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      likeCount: this.#likeCount,
      recordCount: this.#recordCount,
      memberCount: this.#memberCount,
    };
  }
}
