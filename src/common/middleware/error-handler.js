import { Exception } from "../exception/exception.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof Exception) {
    const { statusCode, message, path } = err;
    if (path) {
      return res.status(statusCode).json({ path, message });
    }
    return res.status(statusCode).json({ message });
  }
  console.log(err);
  return res.status(500).json({ message: "알 수 없는 서버 에러입니다." });
};
