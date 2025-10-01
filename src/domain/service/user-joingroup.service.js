import { BaseService } from "./base.service.js";
import { UserJoinGroupResDto } from "../../controller/res-dto/user-joingroup.res.dto.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";

export class UserJoinGroupService extends BaseService {
  constructor({ repos, authService }) {
    super(repos);
    this.authService = authService;
  }

  async joinGroup({ groupId, nickname, password }) {
    const groupEntity = await this.repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }

    let userEntity = await this.authService.authenticateUser({
      nickname,
      password,
    });
    if (!userEntity) {
      userEntity = await this.authService.createUser({
        nickname,
        password,
      });
    }

    const existingUserJoinGroup =
      await this.repos.userJoinGroupRepo.findByUserAndGroup({
        userId: userEntity.id,
        groupId,
      });

    if (existingUserJoinGroup) {
      if(!existingUserJoinGroup.deletedAt) {
      throw new Exception(
        EXCEPTION_INFO.ALREADY_JOINED_GROUP.statusCode,
        EXCEPTION_INFO.ALREADY_JOINED_GROUP.message,
      );
    } else {
      await this.repos.userJoinGroupRepo.reactivate({
        userId: userEntity.id,
        groupId,
      })
    }
  } else {
    await this.repos.userJoinGroupRepo.create({
      userId: userEntity.id,
      groupId,
    })
  }

    const userJoinGroupWithGroup =
      await this.repos.userJoinGroupRepo.findByUserAndGroup({
        userId: userEntity.id,
        groupId,
      });

    return new UserJoinGroupResDto(userJoinGroupWithGroup.group);
  }

  async leaveGroup({ groupId, nickname, password }) {
    const groupEntity = await this.repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }

    const userEntity = await this.authService.authenticateUser({
      nickname,
      password,
    });

    if (!userEntity) {
      throw new Exception(
        EXCEPTION_INFO.USER_NOT_FOUND.statusCode,
        EXCEPTION_INFO.USER_NOT_FOUND.message,
      );
    }

    const existingUserJoinGroup =
      await this.repos.userJoinGroupRepo.findByUserAndGroup({
        userId: userEntity.id,
        groupId,
      });
    if (!existingUserJoinGroup) {
      throw new Exception(
        EXCEPTION_INFO.PARTICIPANT_NOT_FOUND.statusCode,
        EXCEPTION_INFO.PARTICIPANT_NOT_FOUND.message,
      );
    }

    const deleted = await this.repos.userJoinGroupRepo.delete({
      userId: userEntity.id,
      groupId,
    });

    if (!deleted) {
      throw new Exception(
        EXCEPTION_INFO.LEAVE_GROUP_FAILED.statusCode,
        EXCEPTION_INFO.LEAVE_GROUP_FAILED.message,
      );
    }

    return { message: "그룹 탈퇴가 완료되었습니다" };
  }
}
