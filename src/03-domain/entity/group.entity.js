import { EXCEPTION_INFO } from "../../common/exception-info";
import { Exception } from "../../common/exception/exception";

export class Group {
  #id;
  #name;
  #description;
  #imageUrl;
  #goalRep;
  #discordWebhookUrl;
  #discordInviteUrl;
  #likeCount;
  #memberCount;
  #recordCount;
  #tags;
  #owner;
  #participants;
  #createdAt;
  #updatedAt;
  #deletedAt;
  #badges;
  #ownerPassword;

  constructor({
    id,
    name,
    description,
    imageUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    likeCount,
    memberCount,
    recordCount,
    tags,
    owner,
    participants,
    createdAt,
    updatedAt,
    deletedAt,
    ownerPassword,
  }) {
    this.#id = id;
    this.#description = description;
    this.#imageUrl = imageUrl;
    this.#goalRep = goalRep;
    this.#discordWebhookUrl = discordWebhookUrl;
    this.#discordInviteUrl = discordInviteUrl;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#deletedAt = deletedAt;
    this.#name = name;
    this.#likeCount = likeCount ?? 0;
    this.#recordCount = recordCount ?? 0;
    this.#memberCount = memberCount ?? 1;
    this.#tags = tags;
    this.#owner = owner;
    this.#participants = participants;
    this.#badges = [];
    this.#ownerPassword = ownerPassword;
    this.evaluateBadges();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get imageUrl() {
    return this.#imageUrl;
  }

  get goalRep() {
    return this.#goalRep;
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

  get likeCount() {
    return this.#likeCount;
  }

  get recordCount() {
    return this.#recordCount;
  }

  get tags() {
    return this.#tags;
  }

  get owner() {
    return this.#owner;
  }

  get participants() {
    return this.#participants;
  }

  get discordWebhookUrl() {
    return this.#discordWebhookUrl;
  }

  get discordInviteUrl() {
    return this.#discordInviteUrl;
  }

  get badges() {
    return this.#badges;
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
    if (this.#memberCount >= 10 && !this.#badges.includes("PARTICIPATION_10"))
      this.#badges.push("PARTICIPATION_10");
    if (this.#recordCount >= 100 && !this.#badges.includes("RECORD_100"))
      this.#badges.push("RECORD_100");
    if (this.#likeCount >= 100 && !this.#badges.includes("LIKE_100"))
      this.#badges.push("LIKE_100");
  }

  //create

  static forCreate({
    name,
    description,
    imageUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    tags,
    userId,
    existingGroupNames = [],
  }) {
    this.validateNameRule(name, existingGroupNames);
    this.validateDescriptionRule(description);
    this.validateGoalRepRule(goalRep);

    return new Group({
      name,
      description,
      imageUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      owner: userId,
    });
  }

  static validateNameRule(name, existingGroupNames) {
    if (!name || name.length <= 1) {
      throw new Exception(
        EXCEPTION_INFO.NAME_INVALID_LENGTH.statusCode,
        EXCEPTION_INFO.NAME_INVALID_LENGTH.message,
        "name"
      );
    }
    if (existingGroupNames.includes(name)) {
      throw new Exception(
        EXCEPTION_INFO.NAME_CONFLICT.statusCode,
        EXCEPTION_INFO.NAME_CONFLICT.message,
        "name"
      );
    }
  }
  static validateDescriptionRule(description) {
    if (!description || description.length <= 5) {
      throw new Exception(
        EXCEPTION_INFO.DESCRIPTION_INVALID_LENGTH.statusCode,
        EXCEPTION_INFO.DESCRIPTION_INVALID_LENGTH.message,
        "description"
      );
    }
  }
  static validateGoalRepRule(goalRep) {
    if (typeof goalRep !== "number" || goalRep < 1 || goalRep > 100) {
      throw new Exception(
        EXCEPTION_INFO.GOAL_REP_INVALID_RANGE.statusCode,
        EXCEPTION_INFO.GOAL_REP_INVALID_RANGE.message,
        "goalRep"
      );
    }
  }
}
