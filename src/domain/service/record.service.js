import { Record } from "../entity/record.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import { DiscordAdapter } from "../../common/adapter/discord.adapter.js";

export class RecordService {
  #repos;
  #auth;

  constructor({ repos, authService }) {
    this.#repos = repos;
    this.#auth = authService;
  }

  async createRecord(dto) {
    const group = await this.#repos.groupRepo.findById(dto.groupId);
    if (!group) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }

    let userId = dto.userId;
    if (!userId) {
      if (!this.#auth) {
        throw new Exception(
          EXCEPTION_INFO.UNKNOWN_SERVER_ERROR.statusCode,
          "AuthService 미구성",
        );
      }
      const user = await this.#auth.authenticateUser({
        nickname: dto.nickname,
        password: dto.password,
      });
      userId = user.id;
    }

    let userJoinGroupId = dto.userJoinGroupId;
    if (!userJoinGroupId) {
      const membership = await this.#repos.userJoinGroupRepo.findByUserAndGroup(
        {
          userId,
          groupId: dto.groupId,
        },
      );
      if (!membership || membership.deletedAt) {
        throw new Exception(
          EXCEPTION_INFO.PARTICIPANT_NOT_FOUND.statusCode,
          EXCEPTION_INFO.PARTICIPANT_NOT_FOUND.message,
        );
      }
      userJoinGroupId = membership.id;
    }

    const entity = Record.forCreate({
      ...dto,
      userId,
      userJoinGroupId,
    });
    const saved = await this.#repos.recordRepo.save(entity);

    try {
      await DiscordAdapter.sendRecordCreated({
        group,
        record: saved,
        authorNickname: dto.nickname,
      });
    } catch (e) {
      console.warn("[Discord 실패] -> 재시도");
      try {
        await DiscordAdapter.sendRecordCreated({
          group,
          record: saved,
          authorNickname: dto.nickname,
        });
      } catch (e2) {
        console.error("[Discord 재시도 실패]:", e2.message);
      }
    }
    return saved;
  }

  async getRecord({ groupId, orderBy, nickname, page, pageSize }) {
    const [data, total] = await Promise.all([
      this.#repos.recordRepo.findMany({
        groupId,
        orderBy,
        nickname,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.#repos.recordRepo.countMany({ groupId, nickname }),
    ]);
    return { data, total };
  }

  async getRecordById({ groupId, recordId }) {
    return await this.#repos.recordRepo.findById({ groupId, recordId });
  }
}
