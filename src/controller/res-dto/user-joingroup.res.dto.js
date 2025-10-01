export class UserJoinGroupResDto {
  id;
  name;
  description;
  photoUrl;
  goalRep;
  discordWebhookUrl;
  discordInviteUrl;
  likeCount;
  recordCount;
  memberCount;
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
    this.photoUrl = entity.imageUrl ?? "";
    this.goalRep = entity.goalRep ?? 0;
    this.discordWebhookUrl = entity.discordWebhookUrl;
    this.discordInviteUrl = entity.discordInviteUrl;
    this.likeCount = entity.likeCount ?? 0;
    this.recordCount = entity.recordCount ?? 0;
    this.memberCount = entity.participants?.length ?? 1;
    this.tags = entity.tags;
    this.owner = entity.owner;
    this.participants = entity.participants ?? [];
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.badges = entity.badges ?? [];
  }
}
