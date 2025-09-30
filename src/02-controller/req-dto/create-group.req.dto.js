import { EXCEPTION_INFO } from "../common/exception-info";
import { BaseReqDTO } from "../controller/base.req.validator";

export class CreateGroupDTO extends BaseReqDTO {
  constructor(reqData) {
    super(reqData);
  }

  validate() {
    if (!this.body) {
          throw new Exception(
        EXCEPTION_INFO.UNKNOWN_SERVER_ERROR.statusCode,
        EXCEPTION_INFO.UNKNOWN_SERVER_ERROR.message
      );
    }
    const {
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      ownerNickname,
      ownerPassword,
    } = this.body;

    if (!this.isString(name)) {
      throw new Exception({
        info: EXCEPTION_INFO.NAME_REQUIRE,
      });
    }
    if (!this.isString(description)) {
      throw new Exception({
        info: EXCEPTION_INFO.DESCRIPTION_REQUIRE,
      });
    }
    if (!this.isString(photoUrl)) {
      throw new Exception({
        info: EXCEPTION_INFO.PHOTO_URL_REQUIRE,
      });
    }
    if (!this.isNumber(goalRep)) {
      throw new Exception({
        info: EXCEPTION_INFO.GOAL_REP_REQUIRE,
      });
    }

    const urlPattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i;
    if (!urlPattern.test(discordWebhookUrl)) {
      throw new Exception({
        info: EXCEPTION_INFO.DESCRIPTION_INVALID_LENGTH,
      });
    }

    if (!urlPattern.test(discordInviteUrl)) {
      throw new Exception({
        info: EXCEPTION_INFO.DESCRIPTION_INVALID_LENGTH,
      });
    }

    const tagPattern = /^#[0-9A-Za-z가-힣]+$/;
    if (!Array.isArray(tags) || tags.length === 0) {
      throw new Exception({
        info: EXCEPTION_INFO.TAGS_ITEM_INVALID,
      });
    }
    tags.forEach((t) => {
      if (!this.isString(t) || !tagPattern.test(t)) {
        throw new Exception({ info: EXCEPTION_INFO.TAGS_ITEM_INVALID });
      }
    });

    if (!this.isString(tags)) {
      throw new Exception({
        info: EXCEPTION_INFO.TAGS_REQUIRE,
      });
    }
    if (!this.isString(ownerNickname)) {
      //nickname
      throw new Exception({
        info: EXCEPTION_INFO.OWNER_NICKNAME_REQUIRE,
      });
    }
    if (!this.isString(ownerPassword)) {
      throw new Exception({
        info: EXCEPTION_INFO.OWNER_PASSWORD_REQUIRE,
      });

    return {
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      userNickname: ownerNickname,
      userPassword: ownerPassword,
    };
  }
}
}
