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
    if (!record) throw new Error("그룹을 찾을 수 없습니다.");
    return GroupMapper.toEntity(record);
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
}
