import { GroupResDto } from "../../02-controller/res-dto/group.res.dto.js";
import { GroupsResDto } from "../../02-controller/res-dto/groups.res.dto.js";

export class GroupService {
  #repos;

  constructor(repos) {
    this.#repos = repos;
  }

  async getGroups(query) {
    const groupEntities = await this.#repos.groupRepo.findAll(query);
    const groupDtos = groupEntities.map((entity) => new GroupResDto(entity));
    return new GroupsResDto(groupDtos);
  }

  async getGroup(id) {
    const groupEntity = await this.#repos.groupRepo.findById(id);
    return new GroupResDto(groupEntity);
  }

  async getRecords(id) {
    const groupEntity = await this.#repos.groupRepo.findRecordsById(id);
    return new GroupResDto(groupEntity);
  }

  async likeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    groupEntity.increaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);
    const groupDto = new GroupResDto(saved);
    return groupDto;
  }

  async unlikeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    groupEntity.decreaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);
    const groupDto = new GroupResDto(saved);

    return groupDto;
  }

  async deleteGroup({ groupId }) {
    const deleted = await this.#repos.groupRepo.delete(groupId);
    return deleted.toJSON();
  }
}
