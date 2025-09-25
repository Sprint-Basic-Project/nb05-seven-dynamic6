import { Exception } from "../common/exception/exception.js";

export class RecordRepo {
  #prisma;
  constructor(prisma) {
    this.#prisma = prisma;
  }

  async save(entity) {
    try {
      return await this.#prisma.record.create({
        data: {
          exerciseType: entity.exerciseType,
          description: entity.description,
          time: entity.time,
          distance: entity.distance,
          groupGroupId: entity.groupGroupId,
          userUserId: entity.userUserId,
          userJoinGroupUgid: entity.userJoinGroupUgid,
          recordImage: {create: (entity.images || []).map((url) => ({imageUrl: url}))},
        },
        include: { recordImage: true, user: {select: {nickname: true }}},
      });
    } catch (e) {
      throw new Exception(500, "운동 기록 저장 중에 오류 발생");
    }
  }

  async findMany({groupId, orderBy, nickname, skip, take}) {
    const order = orderBy === "time" ? {time: "desc"} : {createdAt: "desc"};
    return await this.#prisma.record.findMany({
      where: {
        groupGroupId: groupId,
        user: nickname ? {nickname: {contains: nickname}}: undefined
      },
      orderBy: order,
      skip,
      take,
      include: {
        recordImage: true,
        user: {
          select: {
            nickname: true
          }
        }
      },
    });
  }
  async findById({groupId, recordId}) {
    return await this.#prisma.record.findUnique({
      where: {recordId},
      include: {
        recordImage: true,
        user: {
          selet: {nickname: true}
        },
        group: {
          select: {groupId: true}
        }
      },
    });
  }
}
