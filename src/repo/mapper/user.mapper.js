import { User } from "../../domain/entity/user.js";
import bcrypt from "bcrypt";

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
  static fromOwnerDto(dto) {
    return new User({
      nickname: dto.ownerNickname, 
      passwordHash: bcrypt.hashSync(dto.ownerPassword, 10),
    });
  }
}
