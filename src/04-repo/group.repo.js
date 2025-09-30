import { Exception } from "../common/exception/exception.js";
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
        Tag: true,
        user: true, // 그룹 생성자 (owner)
        userJoinGroup: {
          include: {
            user: true, // 그룹에 참여한 유저 (participant)
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

  async findAll(query) {
    const {
      page = 1,
      limit = 10,
      order = "desc",
      orderBy = "createdAt",
      search,
    } = query;

    // 정렬 가능한 필드 사전정의 및 검사
    const validOrderByFields = ["likeCount", "participantCount", "createdAt"];
    if (!validOrderByFields.includes(orderBy)) {
      throw new Exception(
        400,
        "The orderBy parameter must be one of the following values: [‘likeCount’, ‘participantCount’, ‘createdAt’].",
      );
    }
    const orderByField = orderBy;

    // 정렬 방향 검사
    const orderDirection = order === "asc" ? "asc" : "desc";

    const prismaOrderBy = {};
    if (!(orderByField === "participantCount")) {
      prismaOrderBy[orderByField] = orderDirection;
    }

    // 그룹명에 search가 포함되는지 검색
    const where = search
      ? {
          name: {
            contains: search,
            mode: "insensitive", // 대소문자 무시
          },
        }
      : {};

    const result = await this.#prisma.group.findMany({
      where,
      orderBy: prismaOrderBy,
      skip: (page - 1) * limit,
      take: Number(limit),
      include: {
        Tag: true,
        user: true, // 그룹 생성자 (owner)
        userJoinGroup: {
          include: {
            user: true, // 그룹에 참여한 유저 (participant)
          },
        },
        _count: {
          select: {
            userJoinGroup: true, // 참여자 수 카운트를 포함
            record: true, // 필요 시 추가
          },
        },
      },
    });

    console.log(result);

    // 참여한 유저순으로 정렬
    if (orderByField === "participantCount") {
      result.sort((a, b) => {
        const aCount = a._count?.userJoinGroup ?? 0;
        const bCount = b._count?.userJoinGroup ?? 0;
        return orderDirection === "asc" ? aCount - bCount : bCount - aCount;
      });
    }

    const entities = result.map((record) => GroupMapper.toEntity(record));
    return entities;
  }

  //create
  async create({ entity, userId }) {
    const createdGroup = await this.#prisma.group.create({
      data: {
        ...GroupMapper.toPersistent(entity),
        user: { connect: { id: userId } },
      },
    });
    return GroupMapper.toEntity(createdGroup);
  }
}
