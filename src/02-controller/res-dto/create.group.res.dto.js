export class CreateGroupResDto {
  id;
  name;
  description;
  photoUrl;
  goalRep;
  discordWebhookUrl;
  discordInviteUrl;
  likeCount;
  tags;
  owner;
  participants;
  createdAt;
  updatedAt;
  badges;

  constructor({
    id,
    name,
    description,
    photoUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    likeCount,
    tags,
    owner,
    participants,
    createdAt,
    updatedAt,
    badges,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photoUrl = photoUrl;
    this.goalRep = goalRep;
    this.discordWebhookUrl = discordWebhookUrl;
    this.discordInviteUrl = discordInviteUrl;
    this.likeCount = likeCount;
    this.tags = tags;
    this.owner = owner;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.badges = badges;
  }
}
