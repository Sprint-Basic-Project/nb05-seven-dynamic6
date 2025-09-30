import { Group } from "../../domain/entity/group.entity.js";

export class GroupMapper {
  static toEntity(record) {
    return new Group({
      id: record.id,
      name: record.name,
      description: record.description,
      photoUrl: record.imageUrl,
      goalRep: record.goalRep,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      deletedAt: record.deletedAt,
      likeCount: record.likeCount,
      discordWebhookUrl: record.discordWebhookUrl,
      discordInviteUrl: record.discordInviteUrl,
      recordCount: record.recordCount ?? record._count?.record ?? 0,
      memberCount: record._count?.userJoinGroup ?? 0,
      owner: record.user,
      tags: (record.tags ?? []).map((tag) => tag.name),
      participants: (record.userJoinGroups ?? []).map((group) => group.user),
    });
  }
  //create
  static toPersistent(entity) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      imageUrl: entity.photoUrl,
      goalRep: entity.goalRep,
      discordWebhookUrl: entity.discordWebhookUrl,
      discordInviteUrl: entity.discordInviteUrl,
      tags: entity.tags?.map((tag) => ({ name: tag })),
    };
  }
}
