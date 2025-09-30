import { GroupResDto } from "../../controller/res-dto/group.res.dto.js";
import { GroupsResDto } from "../../controller/res-dto/groups.res.dto.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import { Group } from "../entity/group.entity.js";
import { BaseService } from "./base.service.js";

export class GroupService extends BaseService {
  #repos;

  constructor(repos) {
    super(repos);
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
    if (!groupEntity) return;
    groupEntity.increaseLike();
    await this.#repos.groupRepo.save(groupEntity);
  }

  async unlikeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    if (!groupEntity) return;
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
    return { message: "그룹 삭제가 완료되었습니다." };
  }

  //create
  async createGroup({
    name,
    description,
    photoUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    tags,
    userNickname,
    userPassword,
  }) {
    const owner = await this.#repos.userRepo.findByNickname(userNickname);
    if (!owner) {
      throw new Exception(
        EXCEPTION_INFO.OWNER_AUTH_FAILED.statusCode,
        EXCEPTION_INFO.OWNER_AUTH_FAILED.message,
      );
    }
    if (owner.password !== userPassword) {
      throw new Exception(
        EXCEPTION_INFO.WRONG_PASSWORD.statusCode,
        EXCEPTION_INFO.WRONG_PASSWORD.message,
      );
    }
    const group = Group.forCreate({
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
    });
    const createdGroup = await this.#repos.groupRepo.create({
      entity: group,
      userId: owner.id,
    });
    return createdGroup;
  }
}
