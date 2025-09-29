import { EXCEPTION_INFO } from "../common/exception-info";
import { BaseReqValidator } from "../controller/base.req.validator";

export class CreateGroupValidator extends BaseReqValidator {
  constructor(reqData) {
    super(reqData);
  }

  validate() {
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
    if (!this.isBoolean(goalRep)) {
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
      throw Exception({
        info: EXCEPTION_INFO.DESCRIPTION_INVALID_LENGTH,
      });
    }

    const tagPattern = /^#[0-9A-Za-z가-힣]+$/;
    if (!tagPattern.test(tag)) {
      throw Exception({
        info: EXCEPTION_INFO.TAGS_ITEM_INVALID,
      });
    }

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
    }
    return {
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      userNickanme: ownerNickname,
      userPassword: ownerPassword,
    };
  }
}
