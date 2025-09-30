export class UpdateGroupResDto {
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
  badges;
  createdAt;
  updatedAt;

  constructor(group) {
    this.id = group.id;
    this.name = group.name;
    this.description = group.description;
    this.photoUrl = group.photoUrl;
    this.goalRep = group.goalRep;
    this.discordWebhookUrl = group.discordWebhookUrl;
    this.discordInviteUrl = group.discordInviteUrl;
    this.likeCount = group.likeCount;
    this.tags = group.tags;
    this.owner = group.owner; // { id, nickname, createdAt, updatedAt }
    this.participants = group.participants; // [{ id, nickname, createdAt, updatedAt }]
    this.badges = group.badges;
    this.createdAt = group.createdAt;
    this.updatedAt = group.updatedAt;
  }
}