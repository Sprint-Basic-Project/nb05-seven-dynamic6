import { Server } from "./01-app/server.js";
// import { PrismaClient } from "@prisma/client"; // DB 연결은 주석 처리
// import { GroupRepo } from "./04-repo/group.repo.js"; // DB 레포도 주석 처리
import { GroupDummyRepo } from "./04-repo/group.dummy.repo.js"; // 더미 레포 추가
import { GroupService } from "./03-domain/service/group.service.js";
import { GroupController } from "./02-controller/group.controller.js";

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    // const prisma = new PrismaClient();
    // const groupRepo = new GroupRepo(prisma);
    // // 주석처리 한 이유는 db까지 연결해버려서 기존 레포는 주석처리 해두고 더미 레포 추가했습니다.
    const groupRepo = new GroupDummyRepo();

    const repos = { groupRepo };

    const groupService = new GroupService(repos);
    const groupController = new GroupController(groupService);

    const controllers = [groupController];
    const server = new Server(controllers);
    return server;
  }

  get server() {
    return this.#server;
  }
}
