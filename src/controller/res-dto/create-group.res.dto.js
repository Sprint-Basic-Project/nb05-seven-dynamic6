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
    this.owner = group.owner;
    this.participants = group.participants;
    this.badges = group.badges;
    this.createdAt = group.createdAt;
    this.updatedAt = group.updatedAt;
    this.deletedAt = group.deletedAt;
  }
}
