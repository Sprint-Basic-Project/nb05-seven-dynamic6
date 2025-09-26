import { GroupResDto } from "../../02-controller/res-dto/group.res.dto.js";
import { Exception } from "../common/exception/exception.js";
import { EXCEPTION_INFO } from "../common/const/exception-info.js";

export class GroupService {
  #repos;

  constructor(repos) {
    this.#repos = repos;
  }

  async getGroups(query) {
    const groupEntities = await this.#repos.groupRepo.findAll(query);
    const groupDtos = groupEntities.map((entity) => new GroupResDto(entity));
    return groupDtos;
  }

  async getGroupRankings(params) {
    const groupRankings = await this.#repos.groupRepo.findByRanking(params);
    return groupRankings;
  }

  async likeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      return;
    }
    groupEntity.increaseLike();
    await this.#repos.groupRepo.save(groupEntity);
  }

  async unlikeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      return;
    }
    groupEntity.decreaseLike();
    await this.#repos.groupRepo.save(groupEntity);
  }

  async deleteGroup({ groupId }) {
    const deleted = await this.#repos.groupRepo.delete(groupId);
    if (!deleted) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }
    // 비밀번호 반환 대신 메시지 반환
    return { message: "그룹 삭제가 완료되었습니다." };
  }
}
