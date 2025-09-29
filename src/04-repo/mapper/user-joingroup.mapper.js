import { UserJoinGroup } from "../../03-domain/entity/user-joingroup.js";

export class UserJoinGroupMapper {
  static toEntity(record) {
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
