import { Group } from "../../03-domain/entity/group.entity.js";

export class GroupMapper {
  static toEntity(record) {
    if (!record) return null;

    /**
     * Group 엔티티
     */
    return new Group({
      id: record.groupId,
      name: record.name,
      description: record.description,
      nickname: record.nickname ?? undefined,
      goalRep: record.goalRep,
      tags: Array.isArray(record.Tag) ? record.Tag.map((t) => t.name) : [],
      discordWebhookUrl: record.discordWebhookUrl,
      discordInviteUrl: record.discordInviteUrl,
      imageUrl: record.imageUrl,
      recordCount: record.recordCount ?? 0,
      likeCount: record.likeCount ?? 0,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      userUserId: record.userUserId,
    });
  }

  /**
   * Group 엔티티 → DB 저장/수정 데이터
   */
  static toCreateUpdateData(entity) {
    return {
      name: entity.name,
      description: entity.description,
      imageUrl: entity.imageUrl,
      goalRep: entity.goalRep,
      discordWebhookUrl: entity.discordWebhookUrl,
      discordInviteUrl: entity.discordInviteUrl,
      userUserId: entity.userUserId,
    };
  }
}
