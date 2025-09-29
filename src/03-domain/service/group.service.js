import { GroupResDto } from "../../02-controller/res-dto/group.res.dto.js";
import { GroupsResDto } from "../../02-controller/res-dto/groups.res.dto.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import { Group } from "../entity/group.entity.js";
import { BaseService } from "./base.service.js";

export class GroupService extends BaseService {
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
    if (!groupEntity) {
      return;
    }
    groupEntity.increaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);
    const groupDto = new GroupResDto(saved);
    return groupDto;
  }

  async unlikeGroup({ groupId }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      return;
    }
    groupEntity.decreaseLike();
    const saved = await this.#repos.groupRepo.save(groupEntity);
    const groupDto = new GroupResDto(saved);
    return groupDto;
  }

  async deleteGroup({ groupId }) {
    const deleted = await this.#repos.groupRepo.delete(groupId);
    if (!deleted) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }
    // 비밀번호 반환 대신 삭제 메시지 반환
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
    userPasswrod,
  }) {
    // const user = await this.repos.user.findUserByNickname(useNickname);
    // if (!user) {
    // }
    const group = Group.forCreate({
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
    });
    const createdGroup = await this.repos.group.create({
      entity: group,
      userNickname,
    });
    return createdGroup;
  }
}
