import { BaseService } from "./base.service.js";
import { UserResDto } from "../../02-controller/res-dto/user.res.dto.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";
import bcrypt from "bcrypt";

export class AuthService extends BaseService {
  constructor(repos) {
    super(repos);
  }

  async authenticateUser({ nickname, password }) {
    const user = await this.repos.userRepo.findByNickname({ nickname });
    if (!user) {
      throw new Exception(
        EXCEPTION_INFO.USER_NOT_FOUND.statusCode,
        EXCEPTION_INFO.USER_NOT_FOUND.message,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Exception(
        EXCEPTION_INFO.INVALID_PASSWORD.statusCode,
        EXCEPTION_INFO.INVALID_PASSWORD.message,
      );
    }

    return user;
  }

  async createUser({ nickname, password }) {
    const existingUser = await this.repos.userRepo.findByNickname({nickname})

    if(existingUser) {
      throw new Exception(
        EXCEPTION_INFO.NICKNAME_ALREADY_EXISTS.statusCode,
        EXCEPTION_INFO.NICKNAME_ALREADY_EXISTS.message,
      )
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const userEntity = User.forCreate({
      nickname,
      passwordHash,
    });

    return await this.repos.userRepo.create({
      nickname: userEntity.nickname,
      passwordHash: userEntity.passwordHash,
    });
  }
}
