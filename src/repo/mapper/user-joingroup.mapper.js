import { UserJoinGroup } from "../../domain/entity/user-joingroup.js";

export class UserJoinGroupMapper {
  static toEntity(record) {
    if (!record) {
      return null;
    }
    return new UserJoinGroup({
      id: record.id,
      joinedAt: record.joinedAt,
      updatedAt: record.updatedAt,
      deletedAt: record.deletedAt,
      userId: record.userId,
      groupId: record.groupId,
    });
  }
}
