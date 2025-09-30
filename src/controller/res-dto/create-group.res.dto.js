export class CreateGroupResDto {
  name;
  description;
  photoUrl;
  goalRep;
  discordWebhookUrl;
  discordInviteUrl;
  tags;
  userId;
  userPassword;

  constructor(group) {
    this.id = group.id;
    this.name = group.name;
    this.description = group.description;
    this.photoUrl = group.photoUrl;
    this.goalRep = group.goalRep;
    this.discordWebhookUrl = group.discordWebhookUrl;
    this.discordInviteUrl = group.discordInviteUrl;
    this.tags = group.tags;
    this.userId = group.userId;
    this.userPassword = group.userPassword;
    this.createdAt = group.createdAt;
    this.updatedAt = group.updatedAt;
    this.deletedAt = group.deletedAt;
  }
}
