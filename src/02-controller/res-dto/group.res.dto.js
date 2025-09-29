export class GroupResDto {
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

  constructor(entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.photoUrl = entity.photoUrl;
    this.goalRep = entity.goalRep;
    this.discordWebhookUrl = entity.discordWebhookUrl;
    this.discordInviteUrl = entity.discordInviteUrl;
    this.likeCount = entity.likeCount;
    this.recordCount = entity.recordCount;
    this.memberCount = entity.memberCount;
    this.tags = entity.tags;
    this.owner = entity.owner;
    this.participants = entity.participants;
  }
}
