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
  // 공통
  UNKNOWN_SERVER_ERROR: {
    statusCode: 500,
    message: "알 수 없는 서버 에러입니다.",
  },
  RESOURCE_NOT_FOUND: {
    statusCode: 404,
    message: "요청리소스가 존재하지 않습니다.",
  },
  //create-group필드에러 ~
  NAME_REQUIRE: {
    statusCode: 400,
    message: "이름(name)을 정확히 입력해주세요.",
  },
  NAME_INVALID_LENGTH: {
    statusCode: 400,
    message: "이름(name)의 길이가 올바르지 않습니다.",
  },
  NAME_CONFLICT: {
    statusCode: 409,
    message: "이미 사용 중인 이름(name)입니다.",
  },

  DESCRIPTION_REQUIRE: {
    statusCode: 400,
    message: "설명(description)을 입력해주세요.",
  },

  DESCRIPTION_INVALID_LENGTH: {
    statusCode: 400,
    message: "설명(description)의 길이가 올바르지 않습니다.",
  },

  PHOTO_URL_REQUIRE: {
    statusCode: 400,
    message: "프로필 이미지 URL(photoUrl)을 입력해주세요.",
  },
  PHOTO_URL_INVALID: {
    statusCode: 400,
    message: "프로필 이미지 URL(photoUrl) 형식이 올바르지 않습니다.",
  },
  PHOTO_URL_UNREACHABLE: {
    statusCode: 422,
    message: "프로필 이미지 URL(photoUrl)에 접근할 수 없습니다.",
  },

  GOAL_REP_REQUIRE: {
    statusCode: 400,
    message: "목표 횟수(goalRep)를 입력해주세요.",
  },
  GOAL_REP_INVALID_RANGE: {
    statusCode: 400,
    message: "목표 횟수(goalRep)가 허용 범위를 벗어났습니다.",
  },

  DISCORD_WEBHOOK_URL_REQUIRE: {
    statusCode: 400,
    message: "디스코드 웹훅 URL(discordWebhookUrl)을 입력해주세요.",
  },
  DISCORD_WEBHOOK_URL_INVALID: {
    statusCode: 400,
    message: "디스코드 웹훅 URL(discordWebhookUrl) 형식이 올바르지 않습니다.",
  },
  DISCORD_INVITE_URL_REQUIRE: {
    statusCode: 400,
    message: "디스코드 초대 URL(discordInviteUrl)을 입력해주세요.",
  },
  DISCORD_INVITE_URL_INVALID: {
    statusCode: 400,
    message: "디스코드 초대 URL(discordInviteUrl) 형식이 올바르지 않습니다.",
  },
  TAGS_REQUIRE: {
    statusCode: 400,
    message: "태그(tags)를 입력해주세요.",
  },
  TAGS_REQUIRE_ARRAY: {
    statusCode: 400,
    message: "태그(tags)는 배열로 전달해야 합니다.",
  },
  TAGS_ITEM_INVALID: {
    statusCode: 400,
    message: "태그(tags) 항목에 유효하지 않은 값이 포함되어 있습니다.",
  },

  OWNER_NICKNAME_REQUIRE: {
    statusCode: 400,
    message: "소유자 닉네임(이메일)을 입력해주세요.",
  },
  OWNER_NICKNAME_INVALID_LENGTH: {
    statusCode: 400,
    message: "소유자 닉네임(ownerNickname)의 길이가 올바르지 않습니다.",
  },

  OWNER_PASSWORD_REQUIRE: {
    statusCode: 400,
    message: "소유자 비밀번호(ownerPassword)를 입력해주세요.",
  },
  OWNER_PASSWORD_WEAK: {
    statusCode: 400,
    message: "소유자 비밀번호(ownerPassword)가 보안 기준에 미달합니다.",
  },
  OWNER_AUTH_FAILED: {
    statusCode: 401,
    message: "소유자 인증에 실패했습니다. 닉네임 또는 비밀번호를 확인해주세요.",
  },

  // 시스템/제약 관련
  PAYLOAD_TOO_LARGE: {
    statusCode: 413,
    message: "요청 본문이 너무 큽니다.",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    statusCode: 415,
    message: "지원하지 않는 미디어 형식입니다.",
  },
  RATE_LIMIT_EXCEEDED: {
    statusCode: 429,
    message: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: "서비스를 일시적으로 사용할 수 없습니다.",
  },
};
