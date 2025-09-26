export class GetGroupidResDto {
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

  constructor(entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.photoUrl = entity.photoUrl;
    this.goalRep = entity.goalRep;
    this.discordWebhookUrl = entity.discordWebhookUrl;
    this.discordInviteUrl = entity.discordInviteUrl;
    this.likeCount = entity.likeCount;
    this.tags = entity.tags;
    this.owner = entity.owner;
    this.participants = entity.participants;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.badges = entity.badges;
  }
}
