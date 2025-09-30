import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import {
  USERS,
  GROUPS,
  USER_JOIN_GROUPS,
  RECORDS,
  RECORD_IMAGES,
  TAGS,
} from "./dummy-data.js";

const prisma = new PrismaClient();

async function main() {
  // DB 초기화 필요하면 주석 해제
  // await prisma.recordImage.deleteMany();
  // await prisma.record.deleteMany();
  // await prisma.userJoinGroup.deleteMany();
  // await prisma.group.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.tag.deleteMany();

  const usersWithHashedPasswords = USERS.map((user) => ({
    ...user,
    passwordHash: bcrypt.hashSync(user.passwordHash, 10),
  }));

  await prisma.user.createMany({ data: usersWithHashedPasswords });
  await prisma.group.createMany({ data: GROUPS });
  await prisma.userJoinGroup.createMany({ data: USER_JOIN_GROUPS });
  await prisma.record.createMany({ data: RECORDS });
  await prisma.recordImage.createMany({ data: RECORD_IMAGES });
  await prisma.tag.createMany({ data: TAGS });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
