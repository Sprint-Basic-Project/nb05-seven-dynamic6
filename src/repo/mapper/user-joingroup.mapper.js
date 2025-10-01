import { UserJoinGroup } from "../../domain/entity/user-joingroup.js";

export class UserJoinGroupMapper {
  static toEntity(record) {
    if (!record) {
      return null;
    }

    return {
      id: record.id,
      userId: record.userId,
      groupId: record.groupId,
      joinedAt: record.joinedAt,
      updatedAt: record.updatedAt,
      deletedAt: record.deletedAt,
      group: record.group
        ? {
            id: record.group.id,
            name: record.group.name,
            description: record.group.description,
            imageUrl: record.group.imageUrl,
            goalRep: record.group.goalRep,
            discordWebhookUrl: record.group.discordWebhookUrl,
            discordInviteUrl: record.group.discordInviteUrl,
            likeCount: record.group.likeCount,
            recordCount: record.group.recordCount,
            memberCount:
              record.group.userJoinGroups?.filter(
                (ujg) => ujg.deletedAt === null,
              ).length || 0,
            tags: record.group.tags,
            owner: record.group.user
              ? {
                  id: record.group.user.id,
                  nickname: record.group.user.nickname,
                  createdAt: record.group.user.createdAt,
                  updatedAt: record.group.user.updatedAt,
                }
              : null,
            participants:
              record.group.userJoinGroups
                ?.filter((ujg) => ujg.deletedAt === null)
                .map((ujg) => ({
                  id: ujg.user.id,
                  nickname: ujg.user.nickname,
                  createdAt: ujg.user.createdAt,
                  updatedAt: ujg.user.updatedAt,
                })) || [],
            createdAt: record.group.createdAt,
            updatedAt: record.group.updatedAt,
            badges: record.group.badges || [],
          }
        : null,
    };
  }
}
