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
          groupId: groupId,
          userId: userId,
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
          orderBy: { createdAt: "desc" }, // 기록 정렬
        },
        _count: { select: { records: true } }, // 기록 개수 포함
      },
      orderBy: {
        records: { _count: "desc" }, // 기록 개수 기준 내림차순 정렬
      },
    });

    return record;
  }

  // async findByGroupAndNickname({ groupId, nickname }) {
  //   const record = await this.#prisma.userJoinGroup.findFirst({
  //     where: {
  //       groupId: groupId,
  //       user: {
  //         nickname: nickname,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     },
  //   });
  //   return UserJoinGroupMapper.toEntity(record);
  // }

  async create({ userId, groupId }) {
    const record = await this.#prisma.userJoinGroup.create({
      data: {
        groupId: groupId,
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
            groupId: groupId,
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
