import { Group } from "../../03-domain/entity/group.entity.js";

export class GroupMapper {
  static toEntity(record) {
    return new Group({
      id: record.groupId,
      name: record.name,
      likeCount: record.likeCount,
      recordCount: record.recordCount ?? record._count?.record ?? 0,
      memberCount: record._count?.userJoinGroup ?? 0,
    });
  }
}
