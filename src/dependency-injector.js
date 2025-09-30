import { Server } from "./app/server.js";
import { PrismaClient } from "@prisma/client";

import { GroupService } from "./domain/service/group.service.js";
import { GroupController } from "./controller/group.controller.js";

import { ImageController } from "./controller/image.controller.js";

import { GroupRepo } from "./repo/group.repo.js";
import { RecordRepo } from "./repo/record.repo.js";
import { RecordService } from "./domain/service/record.service.js";
import { RecordController } from "./controller/record.controller.js";

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    const prisma = new PrismaClient();

    // Repos
    const groupRepo = new GroupRepo(prisma);
    const recordRepo = new RecordRepo(prisma);

    const repos = { groupRepo, recordRepo };

    // Services
    const groupService = new GroupService(repos);
    const recordService = new RecordService(repos);

    // Controllers (넵)
    const groupController = new GroupController(groupService);
    const imageController = new ImageController();
    const recordController = new RecordController(recordService);

    const controllers = [
      groupController,
      imageController,
      recordController,
    ];

    return new Server(controllers);
  }

  get server() {
    return this.#server;
  }
}
