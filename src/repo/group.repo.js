import { EXCEPTION_INFO } from "../common/const/exception-info.js";
import { Exception } from "../common/exception/exception.js";
import { GroupMapper } from "./mapper/group.mapper.js";

export class GroupRepo {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findById(id) {
    const record = await this.#prisma.group.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        userJoinGroups: {
          include: { user: true },
          where: { deletedAt: null },
        },
        _count: {
          select: {
            userJoinGroups: { where: { deletedAt: null } },
          },
        },
      },
    });

    if (!record) return null;

    return GroupMapper.toEntity(record);
  }

  async save(groupEntity) {
    const updated = await this.#prisma.group.update({
      where: {
        id: groupEntity.id,
      },
      data: {
        likeCount: groupEntity.likeCount,
        name: groupEntity.name,
        description: groupEntity.description,
        goalRep: groupEntity.goalRep,
        updatedAt: new Date(),
        discordWebhookUrl: groupEntity.discordWebhookUrl,
        discordInviteUrl: groupEntity.discordInviteUrl,
        tags: {
          deleteMany: {}, // 기존 태그 모두 삭제
          create:
            groupEntity.tags?.map((tag) => ({
              name: tag,
            })) || [],
        },
      },
      include: {
        tags: true,
        user: true,
        userJoinGroups: {
          include: {
            user: true,
          },
        },
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

  async delete(id) {
    await this.#prisma.recordImage.deleteMany({
      where: {
        record: {
          groupId: Number(id),
        },
      },
    });

    await this.#prisma.record.deleteMany({
      where: {
        groupId: Number(id),
      },
    });

    await this.#prisma.userJoinGroup.deleteMany({
      where: {
        groupId: Number(id),
      },
    });

    await this.#prisma.tag.deleteMany({
      where: {
        groupId: Number(id),
      },
    });

    const deleted = await this.#prisma.group.delete({
      where: {
        id: Number(id),
      },
      include: {
        tags: true,
        user: true,
        userJoinGroups: {
          include: {
            user: true,
          },
        },
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

  async findAll(query) {
    //
    const {
      page = 1,
      limit = 10,
      order = "desc",
      orderBy = "createdAt",
      search,
    } = query;

    const validOrderByFields = ["likeCount", "participantCount", "createdAt"];
    if (!validOrderByFields.includes(orderBy)) {
      throw new Exception(
        400,
        "The orderBy parameter must be one of the following values: [‘likeCount’, ‘participantCount’, ‘createdAt’].",
      );
    }
    const orderByField = orderBy;

    const orderDirection = order === "asc" ? "asc" : "desc";

    const prismaOrderBy = {};
    if (!(orderByField === "participantCount")) {
      prismaOrderBy[orderByField] = orderDirection;
    }

    const where = search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    const result = await this.#prisma.group.findMany({
      where,
      orderBy: prismaOrderBy,
      skip: (page - 1) * limit,
      take: Number(limit),
      include: {
        tags: true,
        user: true,
        userJoinGroups: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            userJoinGroups: true,
            records: true,
          },
        },
      },
    });

    if (orderByField === "participantCount") {
      result.sort((a, b) => {
        const aCount = a._count?.userJoinGroups ?? 0;
        const bCount = b._count?.userJoinGroups ?? 0;
        return orderDirection === "asc" ? aCount - bCount : bCount - aCount;
      });
    }

    const total = await this.#prisma.group.count({ where });

    return {
      entities: result.map((record) => GroupMapper.toEntity(record)),
      total: total,
    };
  }

async create({ entity, userId }) {
  const { id, ...rest } = GroupMapper.toPersistent(entity);
  const createdGroup = await this.#prisma.group.create({
    data: {
      ...rest,
      user: { connect: { id: userId } },
      tags: {
        create: entity.tags?.map((tag) => ({ name: tag })) || [],
      },
    },
    include: {
      user: true,
      tags: true,
      userJoinGroups: { include: { user: true } },
      _count: { select: { records: true, userJoinGroups: true } },
    },
  });
  return GroupMapper.toEntity(createdGroup);
}


  // async update(groupId, entity) {
  //   const updatedGroup = await this.#prisma.group.update({
  //     where: { id: Number(groupId) },
  //     data: {
  //       ...GroupMapper.toPersistent(entity),
  //       tags: {
  //         set: [],
  //         connectOrCreate:
  //           entity.tags?.map((tag) => ({
  //             where: { name: tag },
  //             create: { name: tag },
  //           })) || [],
  //       },
  //     },
  //     include: {
  //       user: true,
  //       tags: true,
  //       userJoinGroups: { include: { user: true } },
  //       _count: { select: { records: true, userJoinGroup: true } },
  //     },
  //   });

  //   return GroupMapper.toEntity(updatedGroup);
  // }
}
