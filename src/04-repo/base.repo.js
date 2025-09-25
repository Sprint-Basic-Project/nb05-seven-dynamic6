// src/mapper/base.repo.js
export class BaseRepo {
  prisma;
  modelName; // ★ Prisma 모델 이름(문자열) ex) "group", "user"

  constructor(prisma, modelName) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  // 단건 조회
  async findById(id) {
    return this.prisma[this.modelName].findUnique({
      where: { id },
    });
  }

  // 전체 조회 (간단 목록)
  async findAll() {
    return this.prisma[this.modelName].findMany();
  }

  // 생성
  async create(data) {
    return this.prisma[this.modelName].create({ data });
  }

  // 업데이트
  async update(id, data) {
    return this.prisma[this.modelName].update({
      where: { id },
      data,
    });
  }

  // 삭제
  async delete(id) {
    return this.prisma[this.modelName].delete({
      where: { id },
    });
  }
}
