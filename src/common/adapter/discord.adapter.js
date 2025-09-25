import axios from "axios";
import { Exception } from "../exception/exception.js";

export class DiscordAdapter {
  static async sendRecordCreated({group, record}) {
    const url = group?.WebhookUrl;
    if(!url) {
      return;
    }
    try {
      await axios.post(url, {
        content: `대단하다!\n닉네임: ${record.user.nickname}\n운동: ${record.exerciseType}\n시간: ${record.time}\n거리: ${record.distance}km `,
      });
    } catch (e) {
      throw new Exception(500, "전송 실패");
    }
  }
}
