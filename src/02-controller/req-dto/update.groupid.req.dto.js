import { BaseReqDTO } from "./base.req.dto";

export class UpdateGroupidReqDto extends BaseReqDTO {
  gorupId;
  name;
  description;
  photoUrl;
  goalRep;
  discordWebhookUrl;
  discordInviteUrl;
  tags;
  ownerNickname;
  ownerPassword;

  constructor({
    headers = {},
    body = {},
    params = {},
    query = {},
    file = {},
    files = [],
  }) {
    super({ headers, body, params, query, file, files });
    this.groupId = parseInt(params.groupId, 10);
    this.name = body.name;
    this.description = body.description;
    this.photoUrl = body.photoUrl;
    this.goalRep = body.goalRep;
    this.discordWebhookUrl = body.discordWebhookUrl;
    this.discordInviteUrl = body.discordInviteUrl;
    this.tags = body.tags;
    this.ownerNickname = body.ownerNickname;
    this.ownerPassword = body.ownerPassword;
  }
}
