import { UserMapper } from "./mapper/user.mapper.js";

export class UserRepo {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findByNickname({ nickname }) {
    const record = await this.#prisma.user.findUnique({
      where: {
        nickname,
      },
    });
    return UserMapper.toEntity(record);
  }

  async create({ nickname, passwordHash }) {
    const record = await this.#prisma.user.create({
      data: {
        nickname,
        passwordHash,
      },
    });
    return UserMapper.toEntity(record);
  }

  async findById(id) {
    const record = await this.#prisma.user.findUnique({
      where: { id },
    });
    return UserMapper.toEntity(record);
  }
}
