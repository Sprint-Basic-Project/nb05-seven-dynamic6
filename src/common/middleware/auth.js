import bcrypt from "bcrypt";
import { Exception } from "../exception/exception.js";
import { EXCEPTION_INFO } from "../const/exception-info.js";

export const verifyGroupPassword = (groupRepo, userRepo) => {
  return async (req, res, next) => {
    const groupId = req.params.groupId;
    const { password } = req.body;

    try {
      const groupEntity = await groupRepo.findById(groupId);

      if (!groupEntity) {
        throw new Exception(
          EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
          EXCEPTION_INFO.GROUP_NOT_FOUND.message,
        );
      }

      const userEntity = await userRepo.findById(
        groupEntity.owner?.id ?? groupEntity.userId,
      );
      if (!userEntity) {
        throw new Exception(
          EXCEPTION_INFO.USER_NOT_FOUND.statusCode,
          EXCEPTION_INFO.USER_NOT_FOUND.message,
        );
      }

      const isMatch = bcrypt.compareSync(password, userEntity.passwordHash);
      if (!isMatch) {
        throw new Exception(
          EXCEPTION_INFO.WRONG_PASSWORD.statusCode,
          EXCEPTION_INFO.WRONG_PASSWORD.message,
          EXCEPTION_INFO.WRONG_PASSWORD.path,
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
