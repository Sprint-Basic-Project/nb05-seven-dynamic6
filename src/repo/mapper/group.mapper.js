import { Group } from "../../domain/entity/group.entity.js";

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
      ownerId: record.userId,
      tags: (record.tags ?? []).map((tag) => tag.name),
      owner: record.user,
      participants: (record.userJoinGroups ?? []).map((group) => group.user),
      ownerPassword: record.ownerPassword, //ownerPassword 추가
    });
  }
  //create
  static toPersistent(entity) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      photoUrl: entity.photoUrl,
      goalRep: entity.goalRep,
      discordWebhookUrl: entity.discordWebhookUrl,
      discordInviteUrl: entity.discordInviteUrl,
    };
  }
}
