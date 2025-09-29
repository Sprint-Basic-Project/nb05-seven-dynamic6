import { Server } from "./01-app/server.js";
import { PrismaClient } from "@prisma/client";

import { GroupService } from "./03-domain/service/group.service.js";
import { GroupController } from "./02-controller/group.controller.js";
import { TestController2 } from "./02-controller/test2.controller.js";
import { TestService2 } from "./03-domain/service/test2.service.js";
import { TestRepo2 } from "./04-repo/test2.repo.js";

import { ImageController } from "./02-controller/image.controller.js";
import { ImageService } from "./03-domain/service/image.service.js";
import { ImageRepository } from "./04-repo/image.repo.js";

import { GroupRepo } from "./04-repo/group.repo.js";
import { RecordRepo } from "./04-repo/record.repo.js";
import { RecordService } from "./03-domain/service/record.service.js";
import { RecordController } from "./02-controller/record.controller.js";

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    const prisma = new PrismaClient();

    // Repos
    const groupRepo = new GroupRepo(prisma);
    const imageRepo = new ImageRepository(prisma);
    const recordRepo = new RecordRepo(prisma);
    const testRepo2 = new TestRepo2(prisma);

    const repos = { groupRepo, imageRepo, recordRepo, testRepo2 };

    // Services
    const groupService = new GroupService(repos);
    const imageService = new ImageService(repos);
    const recordService = new RecordService(repos);
    const testService2 = new TestService2(repos);

    // Controllers
    const groupController = new GroupController(groupService);
    const imageController = new ImageController(imageService);
    const recordController = new RecordController(recordService);
    const testController2 = new TestController2(testService2);

    const controllers = [
      groupController,
      imageController,
      recordController,
      testController2,
    ];

    return new Server(controllers);
  }

  get server() {
    return this.#server;
  }
}