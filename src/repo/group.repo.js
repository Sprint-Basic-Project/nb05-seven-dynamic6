import { Exception } from "../common/exception/exception.js";
import { GroupMapper } from "./mapper/group.mapper.js";

export class GroupRepo {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findById(id) {
    const record = await this.#prisma.group.findUnique({
      where: { id },
      include: {
        tags: true,
        user: true, // 그룹 생성자 (owner)
        userJoinGroups: {
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
      where: { id: groupEntity.id },
      data: {
        likeCount: groupEntity.likeCount,
      },
      include: {
        _count: {
          select: {
            userJoinGroups: true,
            records: true,
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
            userJoinGroups: true,
            records: true,
          },
        },
      },
    });

    return GroupMapper.toEntity(deleted);
  }

  // API 요청으로 데이터를 조회하는데 column이 존재하지 않다고 에러가 발생합니다.
  // 그래서 제가 해본 시도는 :
  // 1. schema 내용대로 prisma 쿼리 수정하기 (prisma 그래로 수정해서 이 부분도 문제가 없었던 것 같습니다)
  // 2. 콘솔창에 중간 중간 출력해보기  (출력했을때 별다른 문제는 없었습니다)
  // 이렇게 해봤습니다  넵넵

  async findAll(query) {
    //
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
    const where = search // <==
      ? {
          name: {
            contains: search,
            mode: "insensitive", // 대소문자 무시
          },
        }
      : {};
    //

    const result = await this.#prisma.group.findMany({
      // <== 여기서 엘
      where,
      orderBy: prismaOrderBy,
      skip: (page - 1) * limit,
      take: Number(limit),
      include: {
        tags: true,
        user: true, // 그룹 생성자 (owner)
        userJoinGroups: {
          include: {
            user: true, // 그룹에 참여한 유저 (participant)
          },
        },
        _count: {
          select: {
            userJoinGroups: true, // 참여자 수 카운트를 포함
            records: true, // 필요 시 추가
          },
        },
      },
    });


    // 참여한 유저순으로 정렬
    if (orderByField === "participantCount") {
      result.sort((a, b) => {
        const aCount = a._count?.userJoinGroups ?? 0;
        const bCount = b._count?.userJoinGroups ?? 0;
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
