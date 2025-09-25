import { GroupMapper } from "./mapper/group.mapper.js";

export class GroupRepo {
  #prisma;
  #includeOption;

  constructor(prisma) {
    this.#prisma = prisma;
    // 그룹 조회 시 함께 가져올 관계
    this.#includeOption = {
      owner: true,
      participants: true,
      badges: true,
    };
  }
  /**
   * POST /groups
   * 그룹 생성
   */
  async create({ entity, ownerId }) {
    try {
      const created = await this.prisma.group.create({
        data: {
          // Group 엔티티 → DB 저장용 순수 객체
          ...GroupMapper.toCreateUpdateData(entity),

          // 그룹 생성자 연결 (스키마상 user 관계, PK는 userId)
          ...(ownerId ? { user: { connect: { userId: ownerId } } } : {}),
        },
        // 함께 조회할 관계
        include: this.#includeOption,
      });

      return GroupMapper.toEntity(created);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new Exception({
          info: EXCEPTION_INFO.PARSE_BODY_ERROR,
          originalErr: err,
        });
      }
      // 알 수 없는 서버 오류
      throw new Exception({
        info: EXCEPTION_INFO.UNKOWN_SERVER_ERROR,
        originalErr: err,
      });
    }
  }
  /**
   * GET /groups/{groupId}
   * 그룹 단건 조회
   */
  async findById(groupId) {
    try {
      const found = await this.prisma.group.findUnique({
        where: { groupId },
        include: this.#includeOption,
      });
      return found ? GroupMapper.toEntity(found) : null;
    } catch (err) {
      throw new Exception({
        info: EXCEPTION_INFO.UNKOWN_SERVER_ERROR,
        originalErr: err,
      });
    }
  }

  /**
   * PATCH /groups/{groupId}
   * 그룹 정보 수정
   */
  async update({ groupId, updateFields }) {
    try {
      const updated = await this.prisma.group.update({
        where: { groupId },
        data: updateFields,
        include: this.#includeOption,
      });
      return GroupMapper.toEntity(updated);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new Exception({
          info: EXCEPTION_INFO.PARSE_BODY_ERROR,
          originalErr: err,
        });
      }
      throw new Exception({
        info: EXCEPTION_INFO.UNKOWN_SERVER_ERROR,
        originalErr: err,
      });
    }
  }
  // async findById(id) {
  //   const record = await this.#prisma.group.findUnique({
  //     where: { groupId: id },
  //     include: {
  //       _count: {
  //         select: {
  //           userJoinGroup: true,
  //           record: true,
  //         },
  //       },
  //     },
  //   });
  //   if (!record) throw new Error("그룹을 찾을 수 없습니다.");
  //   return GroupMapper.toEntity(record);
  // }

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
