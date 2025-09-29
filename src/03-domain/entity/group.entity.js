export class Group {
  #id;
  #name;
  #description;
  #imageUrl;
  #goalRep;
  #discordWebhookUrl;
  #discordInviteUrl;
  #likeCount;
  #recordCount;
  #createdAt;
  #updatedAt;
  #deletedAt;
  #memberCount;
  #tags;
  #owner;
  #participants;
  #ownerPassword;

  constructor({
    id,
    name,
    description,
    imageUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    createdAt,
    updatedAt,
    deletedAt,
    likeCount,
    recordCount,
    memberCount,
    tags,
    owner,
    participants,
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
    this.#likeCount = likeCount;
    this.#recordCount = recordCount;
    this.#memberCount = memberCount;
    this.#tags = tags;
    this.#owner = owner;
    this.#participants = participants;
    this.#ownerPassword = ownerPassword;
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

    if (this.#memberCount >= 10) toAdd.push("PARTICIPATION_10");
    if (this.#recordCount >= 100) toAdd.push("RECORD_100");
    if (this.#likeCount >= 100) toAdd.push("LIKE_100");

    return { toAdd };
  }
}
