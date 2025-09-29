import bcrypt from "bcrypt";
import { BaseService } from "./base.service.js";
import { Exception } from "../../common/exception/exception.js";
import { EXCEPTION_INFO } from "../../common/const/exception-info.js";

export class AuthService extends BaseService {
  constructor(repos) {
    super(repos);
  }

  async authenticateUser({ nickname, password }) {
    const user = await this.repos.userRepo.findByNickname({ nickname });
    if (!user) {
      throw new Exception(EXCEPTION_INFO.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Exception(EXCEPTION_INFO.INVALID_PASSWORD);
    }

    return user;
  }

  async createUser({ nickname, password }) {
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
