import { groupDummyData, test1Data, test2Data } from "./data/dummy-data.js";

export class TestRepo1 {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  findAll() {
    return test2Data;
  }

  save(entity) {
    test2Data.push({
      id: entity.id,
      title: entity.title,
      content: entity.content,
    });
    return entity;
  }
}
