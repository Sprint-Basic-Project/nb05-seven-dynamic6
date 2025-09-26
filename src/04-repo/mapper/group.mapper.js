import { Group } from "../../03-domain/entity/group.entity.js";

export class GroupMapper {
  static toEntity(record) {
    return new Group({
      id: record.groupId,
      name: record.name,
      description: record.description,
      imageUrl: record.imageUrl,
      goalRep: record.goalRep,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      deletedAt: record.deletedAt,
      likeCount: record.likeCount,
      discordWebhookUrl: record.discordWebhookUrl,
      discordInviteUrl: record.discordInviteUrl,
      recordCount: record.recordCount ?? record._count?.record ?? 0,
      memberCount: record._count?.userJoinGroup ?? 0,
      ownerId: record.userUserId,
      tags: record.Tag.map((tag) => tag.name),
      owner: record.user,
      participants: record.userJoinGroup.map((group) => group.user),
      ownerPassword: record.ownerPassword,
    });
  }
}
