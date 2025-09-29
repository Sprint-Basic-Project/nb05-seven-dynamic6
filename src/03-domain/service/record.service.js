import { Record } from "../entity/record.js";
import { Exception } from "../../common/exception/exception.js";
import { DiscordAdapter } from "../../common/adapter/discord.adapter.js";

export class RecordService {
  #repos;

  constructor(repos) {
    this.#repos = repos;
  }

  async createRecord(dto) {
    const group = await this.#repos.groupRepo.findById(dto.groupId);
    if (!group) {
      throw new Exception(404, "존재하지 않는 그룹");
    }
    const entity = Record.forCreate(dto);
    const saved = await this.#repos.recordRepo.save(entity);

    try {
      await DiscordAdapter.sendRecordCreated({ group, record: saved });
    } catch (e) {
      console.warn("[Discord 실패] -> 재시도");
      try {
        await DiscordAdapter.sendRecordCreated({ group, record: saved });
      } catch (e2) {
        console.error("[Discird 재시도 실패]:", e2.message);
      }
    }
    return saved;
  }

  async getRecord({ groupId, orderBy, nickname, page, pageSize }) {
    return await this.#repos.recordRepo.findMany({
      groupId,
      orderBy,
      nickname,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getRecordById({ groupId, recordId }) {
    return await this.#repos.recordRepo.findById({ groupId, recordId });
  }
}
