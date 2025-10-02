import { GroupResDto } from "../../controller/res-dto/group.res.dto.js";
import { GroupsResDto } from "../../controller/res-dto/groups.res.dto.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import { Group } from "../entity/group.entity.js";
import { BaseService } from "./base.service.js";
import { RankResDto } from "../../controller/res-dto/rank.res.dto.js";
import bcrypt from "bcrypt";

export class GroupService extends BaseService {
  #repos;

  constructor(repos) {
    super(repos);
    this.#repos = repos;
  }

  async getRankings(id, duration) {
    const rankedEntities = await this.#repos.userJoinGroupRepo.findRankings(
      id,
      duration,
    );
    const rankedDtos = rankedEntities.map((entity) => new RankResDto(entity));
    return rankedDtos;
  }

  async getGroups(query) {
    const { entities, total } = await this.#repos.groupRepo.findAll(query);
    const groupDtos = entities.map((entity) => new GroupResDto(entity));
    return new GroupsResDto(groupDtos, total);
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

  async createGroup({
    name,
    description,
    photoUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    tags,
    ownerNickname,
    ownerPassword,
  }) {
    const existingUser =
      await this.#repos.userRepo.findByNickname(ownerNickname);
    if (existingUser) {
      throw new Exception(
        EXCEPTION_INFO.OWNER_NICKNAME_CONFLICT.statusCode,
        EXCEPTION_INFO.OWNER_NICKNAME_CONFLICT.message,
        "ownerNickname",
      );
    }
    
    const newUser = await this.#repos.userRepo.create({
      nickname: ownerNickname,
      passwordHash: ownerPassword,
    });


    const group = Group.forCreate({
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      userId: newUser.id,
    });
    const createdGroup = await this.#repos.groupRepo.create({
      entity: group,
      userId: newUser.id,
    });

    console.log(createdGroup);
    return createdGroup;
  }

  async updateGroup({
    groupId,
    name,
    description,
    photoUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    tags,
    ownerNickname,
    ownerPassword,
  }) {
    const groupEntity = await this.#repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
        "groupId",
      );
    }

    const owner = await this.#repos.userRepo.findByNickname(ownerNickname);
    if (!owner) {
      throw new Exception(
        EXCEPTION_INFO.OWNER_AUTH_FAILED.statusCode,
        EXCEPTION_INFO.OWNER_AUTH_FAILED.message,
        "ownerNickname",
      );
    }

    const isMatch = bcrypt.compareSync(ownerPassword, owner.passwordHash);
    if (!isMatch) {
      throw new Exception(
        EXCEPTION_INFO.WRONG_PASSWORD.statusCode,
        EXCEPTION_INFO.WRONG_PASSWORD.message,
        "password",
      );
    }

    groupEntity.update({
      name,
      description,
      photoUrl,
      goalRep,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
    });

    const updated = await this.#repos.groupRepo.save(groupEntity);
    return updated;
  }
}
