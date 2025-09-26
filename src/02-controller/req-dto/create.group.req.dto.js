export class CreateGroupReqDto {
  name;
  description;
  photoUrl;
  goalRep;
  discordWebhookUrl;
  discordInviteUrl;
  tags;
  ownerNickname;
  ownerPassword;

  constructor(body) {
    this.name = body.name;
    this.description = body.description;
    this.photoUrl = body.photoUrl;
    this.goalRep = goalRep;
    this.discordWebhookUrl = discordWebhookUrl;
    this.discordInviteUrl = discordInviteUrl;
    this.tags = tags;
    this.ownerNickname = ownerNickname;
    this.ownerPasswor = ownerPasswor;
  }
}
