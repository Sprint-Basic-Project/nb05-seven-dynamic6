import { Exception } from "../common/exception/exception.js";
import { EXCEPTION_INFO } from "../common/exception/exception.js";
import { BaseService } from "./base.service.js";

export class UserJoinGroupService extends BaseService {
  constructor({ repos, authService }) {
    super(repos);
    this.authService = authService;
  }

  async joinGroup({ groupId, nickname, password }) {
    // 그룹 체크
    const group = await this.repos.groupRepo.findById({ groupId });
    if (!group) {
      throw new Exception(EXCEPTION_INFO.GROUP_NOT_EXIST);
    }

    //User 체크
    let user = await this.authService.authenticateUser({
      nickname,
      password,
    });
    if (!user) {
      user = await this.authService.create({
        nickname,
        password,
      });

      //중복 가입 체크
      const existingUserJoinGroup =
        await this.repos.userJoinGroupRepo.findByUserAndGroup({
          userId: user.userId,
          groupId,
        });

      if (existingUserJoinGroup && !existingUserJoinGroup.deletedAt) {
        throw new Exception(EXCEPTION_INFO.ALREADY_JOINED_GROUP);
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
      return await this.repos.userJoinGroupRepo.create({
        userId: user.userId,
        groupId,
      });
    }
  }

  async leaveGroup({ groupId, nickname, password }) {
    //group 체크
    const group = await this.repos.groupRepo.findById({ groupId });
    if (!group) {
      throw new Exception(EXCEPTION_INFO.GROUP_NOT_EXIST);
    }

    //User 체크
    const user = await this.authService.authenticateUser({
      nickname,
      password,
    });

    //UserJoinGroup 체크
    const existingUserJoinGroup =
      await this.repos.userJoinGroupRepo.findByUserAndGroup({
        userId: user.userId,
        groupId,
      });
    if (!existingUserJoinGroup) {
      throw new Exception(EXCEPTION_INFO.NOT_A_PARTICIPANT);
    }

    //탈퇴(softdelete)
    return await this.repos.userJoinGroupRepo.delete({
      userId: user.userId,
      groupId,
    });
  }
}
