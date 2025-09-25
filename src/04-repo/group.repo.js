import { PrismaClient, Prisma } from "@prisma/client";
import { GroupMapper } from "./mapper/group.mapper.js";
import { EXCEPTION_INFO } from "../../../local-workproject/src/common/const/exception-info.js";
import { BaseRepo } from "./base.repo.js";

const { PrismaClientKnownRequestError } = Prisma; 

export class GroupRepository extends BaseRepo{
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
   */
  async create({ entity, ownerId }) {
    try {
      const created = await this.#prisma.group.create({
        data: {
          ...GroupMapper.toCreateUpdateData(entity),
          ...(ownerId ? { user: { connect: { userId: ownerId } } } : {}),
        },
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
   */
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

  // async findById(groupId) {
  //   try {
  //     const found = await this.prisma.group.findUnique({
  //       where: { groupId },
  //       include: this.#includeOption,
  //     });
  //     return found ? GroupMapper.toEntity(found) : null;
  //   } catch (err) {
  //     throw new Exception({
  //      // info: EXCEPTION_INFO.UNKOWN_SERVER_ERROR,
  //       originalErr: err,
  //     });
  //   }
  // }

  /**
   * PATCH /groups/{groupId}
   * 그룹 정보 수정
   */
  async update({ groupId, updateFields }) {
    try {
      const updated = await this.#prisma.group.update({
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
