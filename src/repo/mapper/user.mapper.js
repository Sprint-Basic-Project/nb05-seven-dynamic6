import { User } from "../../domain/entity/user.js";

export class UserMapper {
  static toEntity(record) {
    return new User({
      id: record.id,
      nickname: record.nickname,
      passwordHash: record.passwordHash,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      deletedAt: record.deletedAt,
    });
  }
}
