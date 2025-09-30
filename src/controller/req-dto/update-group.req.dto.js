import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import { BaseReqDTO } from "./base.req.dto.js";
import { Exception } from "../../common/exception/exception.js";

export class UpdateGroupDTO extends BaseReqDTO {
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

    const { groupId } = this.params;

    if (!groupId) {
      throw new Exception(
        EXCEPTION_INFO.RESOURCE_NOT_FOUND.statusCode,
        "groupId가 필요합니다.",
        "groupId",
      );
    }
    //optional하게 검증하도록
    if (name !== undefined && !this.isString(name)) {
      throw new Exception(
        EXCEPTION_INFO.NAME_REQUIRE.statusCode,
        EXCEPTION_INFO.NAME_REQUIRE.message,
        "name",
      );
    }
    if (description !== undefined && !this.isString(description)) {
      throw new Exception(
        EXCEPTION_INFO.DESCRIPTION_REQUIRE.statusCode,
        EXCEPTION_INFO.DESCRIPTION_REQUIRE.message,
        "description",
      );
    }

    if (photoUrl !== undefined && !this.isString(photoUrl)) {
      throw new Exception(
        EXCEPTION_INFO.PHOTO_URL_REQUIRE.statusCode,
        EXCEPTION_INFO.PHOTO_URL_REQUIRE.message,
        "photoUrl",
      );
    }

    if (goalRep !== undefined && !this.isNumber(goalRep)) {
      throw new Exception(
        EXCEPTION_INFO.GOAL_REP_REQUIRE.statusCode,
        EXCEPTION_INFO.GOAL_REP_REQUIRE.message,
        "goalRep",
      );
    }

    const urlPattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i;
    if (
      discordWebhookUrl !== undefined &&
      !urlPattern.test(discordWebhookUrl)
    ) {
      throw new Exception(
        EXCEPTION_INFO.DISCORD_WEBHOOK_URL_INVALID.statusCode,
        EXCEPTION_INFO.DISCORD_WEBHOOK_URL_INVALID.message,
        "discordWebhookUrl",
      );
    }

    if (discordInviteUrl !== undefined && !urlPattern.test(discordInviteUrl)) {
      throw new Exception(
        EXCEPTION_INFO.DISCORD_INVITE_URL_INVALID.statusCode,
        EXCEPTION_INFO.DISCORD_INVITE_URL_INVALID.message,
        "discordInviteUrl",
      );
    }

    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        throw new Exception(
          EXCEPTION_INFO.TAGS_REQUIRE_ARRAY.statusCode,
          EXCEPTION_INFO.TAGS_REQUIRE_ARRAY.message,
          "tags",
        );
      }
      const tagPattern = /^#[0-9A-Za-z가-힣]+$/;
      tags.forEach((t) => {
        if (!this.isString(t) || !tagPattern.test(t)) {
          throw new Exception(
            EXCEPTION_INFO.TAGS_ITEM_INVALID.statusCode,
            EXCEPTION_INFO.TAGS_ITEM_INVALID.message,
            "tags",
          );
        }
      });
    }
    if (!this.isString(ownerNickname)) {
      throw new Exception(
        EXCEPTION_INFO.OWNER_NICKNAME_REQUIRE.statusCode,
        EXCEPTION_INFO.OWNER_NICKNAME_REQUIRE.message,
        "ownerNickname",
      );
    }

    if (!this.isString(ownerPassword)) {
      throw new Exception(
        EXCEPTION_INFO.OWNER_PASSWORD_REQUIRE.statusCode,
        EXCEPTION_INFO.OWNER_PASSWORD_REQUIRE.message,
        "ownerPassword",
      );
    }

    return {
      groupId,
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      ownerNickname,
      ownerPassword,
    };
  }
}
