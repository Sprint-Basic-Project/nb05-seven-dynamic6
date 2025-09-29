export const EXCEPTION_INFO = {
  UNKNOWN_SERVER_ERROR: {
    statusCode: 500,
    message: "알 수 없는 서버 에러입니다.",
  },

  GROUP_NOT_FOUND: {
    statusCode: 404,
    message: "Group not found",
  },

  WRONG_PASSWORD: {
    statusCode: 401,
    path: "password",
    message: "Wrong password",
  },
};
