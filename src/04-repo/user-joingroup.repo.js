import { UserJoinGroupMapper } from "./mapper/userJoinGroup.mapper.js";

export class UserJoinGroupRepo {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findByUserAndGroup({ userId, groupId }) {
    const record = await this.#prisma.userJoinGroup.findUnique({
      where: {
        groupGroupId_userUserId: {
          groupGroupId: groupId,
          userUserId: userId,
        },
      },
    });
    return UserJoinGroupMapper.toEntity(record);
  }

  async findByGroupAndNickname({ groupId, nickname }) {
    const record = await this.#prisma.userJoinGroup.findFirst({
      where: {
        groupGroupId: groupId,
        user: {
          nickname: nickname,
        },
        include: {
          user: true,
        },
      },
    });
    return UserJoinGroupMapper.toEntity(record);
  }

  async create({ userId, groupId }) {
    const record = await this.#prisma.userJoinGroup.create({
      data: {
        groupGroupId: groupId,
        userUserId: userId,
      },
    });
    return UserJoinGroupMapper.toEntity(record);
  }

  async delete({ userId, groupId }) {
    const now = new Date();

    return await this.#prisma.$transaction(async (tx) => {
      const user = await tx.userJoinGroup.findUnique({
        where: {
          groupGroupId_userUserId: {
            groupGroupId: groupId,
            userUserId: userId,
          },
        },
        select: {
          ugId: true,
        },
      });

      if (!user) {
        return null;
      }

      const deleteRecords = await tx.record.updateMany({
        where: {
          userJoinGroupUgId: user.ugId,
          deletedAt: null,
        },
        data: {
          deletedAt: now,
        },
      });

      const deletedUser = await tx.userJoinGroup.update({
        where: {
          ugId: user.ugId,
          deletedAt: null,
        },
        data: {
          deletedAt: now,
        },
      });

      return UserJoinGroupMapper.toEntity(deletedUser);
    });
  }
}
