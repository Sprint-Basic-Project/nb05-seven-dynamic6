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
    // 그룹 체크
    const groupEntity = await this.repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }

    //User 체크
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

    //중복 가입 체크
    const existingUserJoinGroup =
      await this.repos.userJoinGroupRepo.findByUserAndGroup({
        userId: userEntity.id,
        groupId,
      });

    if (existingUserJoinGroup && !existingUserJoinGroup.deletedAt) {
      throw new Exception(
        EXCEPTION_INFO.ALREADY_JOINED_GROUP.statusCode,
        EXCEPTION_INFO.ALREADY_JOINED_GROUP.message,
      );
    }

    // //닉네임 중복 체크X
    // const existingNickname =
    //   await this.repos.userJoinGroupRepo.findByGroupAndNickname({
    //     groupId,
    //     nickname,
    //   });
    // if (existingNickname && !existingNickname.deletedAt) {
    //   throw new Exception(EXCEPTION_INFO.NICKNAME_ALREADY_EXISTS_IN_GROUP);
    // }

    //그룹가입
    const userJoinGroupEntity = await this.repos.userJoinGroupRepo.create({
      userId: userEntity.id,
      groupId,
    });

    return new UserJoinGroupResDto(userJoinGroupEntity);
  }

  async leaveGroup({ groupId, nickname, password }) {
    //group 체크
    const groupEntity = await this.repos.groupRepo.findById(groupId);
    if (!groupEntity) {
      throw new Exception(
        EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
        EXCEPTION_INFO.GROUP_NOT_FOUND.message,
      );
    }

    //User 체크
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

    //UserJoinGroup 체크
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

    //탈퇴(softdelete)
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
