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

  async createGroup({ payload, userUserId, files }) {
    const group = Group.fromValidator(payload, userUserId);
    const created = await this.repos.group.create({
      data: group.toPrismaCreateInput().data,
      files,
    });

    return created;
  }
  async getGroupById(groupId) {
    const found = await this.repos.group.findById(groupId);
    if (!found) {
      throw new Exception(EXCEPTION_INFO.GROUP_NOT_FOUND);
    }
    return found;
  }

  async updateGroup({ groupId, password, ...updateFields }) {
    const found = await this.repos.group.findById(groupId);
    if (!found) {
      throw new Exception(EXCEPTION_INFO.GROUP_NOT_FOUND);
    }
    if (!found.isPasswordMatch(password)) {
      throw new Exception(EXCEPTION_INFO.FORBIDDEN_ACTION);
    }
    const updated = await this.repos.group.update({
      groupId,
      updateFields,
    });

    return updated;
  }
}
