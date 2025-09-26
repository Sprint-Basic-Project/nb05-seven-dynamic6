import { GroupMapper } from "./mapper/group.mapper.js";

export class GroupRepo {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findById(id) {
    const record = await this.#prisma.group.findUnique({
      where: { groupId: id },
      include: {
        _count: {
          select: {
            userJoinGroup: true,
            record: true,
          },
        },
      },
    });
    return record ? GroupMapper.toEntity(record) : null;
  }

  async save(groupEntity) {
    const updated = await this.#prisma.group.update({
      where: { groupId: groupEntity.id },
      data: {
        likeCount: groupEntity.likeCount,
      },
      include: {
        _count: {
          select: {
            userJoinGroup: true,
            record: true,
          },
        },
      },
    });
    return GroupMapper.toEntity(updated);
  }

  async delete(groupId) {
    const deleted = await this.#prisma.group.delete({
      where: { groupId },
      include: {
        _count: {
          select: {
            userJoinGroup: true,
            record: true,
          },
        },
      },
    });

    return GroupMapper.toEntity(deleted);
  }

  findByRanking(params) {
    this.#prisma.group;
  }

  async findAll(query) {
    const result = await this.#prisma.group.findMany({
      include: {
        Tag: true,
        user: true,
        userJoinGroup: {
          include: {
            user: true, // 그룹에 참여한 유저
          },
        },
      },
    });

    const entities = result.map((record) => GroupMapper.toEntity(record));
    entities.forEach((entity) => console.log(entity.participants));
    return entities;
  }
}
