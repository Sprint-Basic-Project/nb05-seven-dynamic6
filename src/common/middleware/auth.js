import { Exception } from "../exception/exception.js";
import { EXCEPTION_INFO } from "../const/exception-info.js";

export const verifyGroupPassword = (groupRepo) => {
  return async (req, res, next) => {
    const groupId = req.params.groupId;
    const { ownerPassword } = req.body;

    try {
      const groupEntity = await groupRepo.findById(groupId);

      // 그룹 존재 X -> 404
      if (!groupEntity) {
        throw new Exception(
          EXCEPTION_INFO.GROUP_NOT_FOUND.statusCode,
          EXCEPTION_INFO.GROUP_NOT_FOUND.message,
        );
      }

      // 비밀번호 틀렸을 때 -> 401
      if (groupEntity.ownerPassword !== ownerPassword) {
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
