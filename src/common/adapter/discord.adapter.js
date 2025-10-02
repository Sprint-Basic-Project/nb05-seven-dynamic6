import axios from "axios";
import { EXCEPTION_INFO } from "../const/exception-info.js";
import { Exception } from "../exception/exception.js";

export class DiscordAdapter {
  static async sendRecordCreated({ group, record, authorNickname }) {
    const url = group?.discordWebhookUrl;
    if (!url) {
      return;
    }
    try {
      await axios.post(url, {
        content:
          `대단하다!\n` +
          `닉네임: ${authorNickname}\n` +
          `운동: ${record.exerciseType}\n` +
          `시간: ${record.time}\n` +
          `거리: ${record.distance}km `,
      });
    } catch (e) {
      throw new Exception(
        EXCEPTION_INFO.SERVICE_UNAVAILABLE.statusCode,
        EXCEPTION_INFO.SERVICE_UNAVAILABLE.message,
      );
    }
  }
}
