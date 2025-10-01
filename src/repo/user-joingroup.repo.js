import { UserJoinGroupMapper } from "./mapper/user-joingroup.mapper.js";

export class UserJoinGroupRepo {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findByUserAndGroup({ userId, groupId }) {
    const record = await this.#prisma.userJoinGroup.findUnique({
      where: {
        groupId_userId: {
          groupId: Number(groupId),
          userId: userId,
        },
      },
      include: {
        group: {
          include: {
            user: true,
            userJoinGroups: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    return UserJoinGroupMapper.toEntity(record);
  }

  async findRankings(id, duration) {
    const record = await this.#prisma.userJoinGroup.findMany({
      where: { groupId: id },
      include: {
        user: true,
        records: {
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { records: true } },
      },
      orderBy: {
        records: { _count: "desc" },
      },
    });

    return record;
  }

  async reactivate({ userId, groupId }) {
    const record = await this.#prisma.userJoinGroup.update({
      where: {
        groupId_userId: {
          groupId: Number(groupId),
          userId: userId,
        },
      },
      data: {
        deletedAt: null,
      },
    });
    return UserJoinGroupMapper.toEntity(record);
  }

  async create({ userId, groupId }) {
    const record = await this.#prisma.userJoinGroup.create({
      data: {
        groupId: Number(groupId),
        userId: userId,
      },
    });
    return UserJoinGroupMapper.toEntity(record);
  }

  async delete({ userId, groupId }) {
    const now = new Date();

    return await this.#prisma.$transaction(async (tx) => {
      const record = await tx.userJoinGroup.findUnique({
        where: {
          groupId_userId: {
            groupId: Number(groupId),
            userId: userId,
          },
        },
        select: {
          id: true,
          deletedAt: true,
        },
      });

      if (!record || record.deletedAt !== null) {
        return null;
      }

      const deleteRecords = await tx.record.updateMany({
        where: {
          userJoinGroupId: record.id,
          deletedAt: null,
        },
        data: {
          deletedAt: now,
        },
      });

      const deletedUser = await tx.userJoinGroup.update({
        where: {
          id: record.id,
        },
        data: {
          deletedAt: now,
        },
      });

      return UserJoinGroupMapper.toEntity(deletedUser);
    });
  }
}
