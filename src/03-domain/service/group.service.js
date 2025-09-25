import { GroupResDto } from "../../02-controller/res-dto/group.res.dto.js";

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
    groupEntity.increaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);
    const badges = saved.evaluateBadges();
    return {
      ...saved.toJSON(),
      badges,
    };
  }

  async unlikeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    groupEntity.decreaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);

    const badges = saved.evaluateBadges();

    return {
      ...saved.toJSON(),
      badges,
    };
  }

  async deleteGroup({ groupId }) {
    const deleted = await this.#repos.groupRepo.delete(groupId);
    return deleted.toJSON();
  }
}
