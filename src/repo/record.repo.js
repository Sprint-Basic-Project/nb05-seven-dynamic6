// DB저장, 조회
import { Exception } from "../common/exception/exception.js";
import { EXCEPTION_INFO } from "../common/const/exception-info.js";
import { RecordMapper } from "./mapper/record.mapper.js";

export class RecordRepo {
  #prisma;
  constructor(prisma) {
    this.#prisma = prisma;
  }

  async save(entity) {
    try {
      const data = RecordMapper.toPersistence(entity);
      const saved = await this.#prisma.record.create({
        data,
        include: {
          recordImages: true,
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      });
      return RecordMapper.toEntity(saved);
    } catch (e) {
      throw new Exception(
        EXCEPTION_INFO.RECORD_SAVE_FAILED.statusCode,
        EXCEPTION_INFO.RECORD_SAVE_FAILED.message,
      );
    }
  }

  async findMany({ groupId, orderBy, nickname, skip, take }) {
    const order = orderBy === "time" ? { time: "desc" } : { createdAt: "desc" };
    const nick = nickname?.trim();

    const where = {
      groupId :  Number(groupId),
      ...(nick
        ? {
            user: { is: { nickname: { contains: nick, mode: "insensitive" } } },
          }
        : {}),
    };

    const results = await this.#prisma.record.findMany({
      where,
      orderBy: order,
      skip,
      take,
      include: {
        recordImages: true,
        user: { select: { id: true, nickname: true } },
      },
    });

    return results.map(RecordMapper.toEntity);
  }

  async countMany({ groupId, nickname }) {
    const nick = nickname?.trim();
    const where = {
      groupId : Number(groupId),
      ...(nick
        ? {
            user: { is: { nickname: { contains: nick, mode: "insensitive" } } },
          }
        : {}),
    };
    return this.#prisma.record.count({ where });
  }

  async findById({ groupId, recordId }) {
    const record = await this.#prisma.record.findFirst({
      where: {
        id: recordId,
        groupId : Number(groupId),
      },
      include: {
        recordImages: true,
        user: {
          select: { id: true, nickname: true },
        },
        group: {
          select: { id: true },
        },
      },
    });
    return record ? RecordMapper.toEntity(record) : null;
  }
}
