// DB저장, 조회
import { Exception } from "../common/exception/exception.js";
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
              nickname: true,
            },
          },
        },
      });
      return RecordMapper.toEntity(saved);
    } catch (e) {
      throw new Exception(500, "운동 기록 저장 중에 오류 발생");
    }
  }

  async findMany({ groupId, orderBy, nickname, skip, take }) {
    const order = orderBy === "time" ? { time: "desc" } : { createdAt: "desc" };
    const results = await this.#prisma.record.findMany({
      where: {
        groupId,
        user: nickname ? { nickname: { contains: nickname } } : undefined,
      },
      orderBy: order,
      skip,
      take,
      include: {
        recordImages: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return results.map(RecordMapper.toEntity);
  }

  async findById({ groupId, recordId }) {
    const record = await this.#prisma.record.findFirst({
      where: {
        id: recordId,
        groupId,
      },
      include: {
        recordImages: true,
        user: {
          select: { nickname: true },
        },
        group: {
          select: { id: true },
        },
      },
    });
    return record ? RecordMapper.toEntity(record) : null;
  }
}
