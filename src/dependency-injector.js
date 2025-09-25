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

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    const prisma = new PrismaClient();

    const groupRepo = new GroupRepo(prisma);
    const testRepo2 = new TestRepo2(prisma);
    const imageRepo = new ImageRepository(prisma);
    //const groupRepo2 = new GroupRepository(prisma);

    const repos = { groupRepo, imageRepo, testRepo2 };

    const groupService = new GroupService(repos);
    const imageService = new ImageService(repos);
    const testService2 = new TestService2(repos);

    const groupController = new GroupController(groupService);
    const imageController = new ImageController(imageService);
    const testController2 = new TestController2(testService2);

    const controllers = [groupController, imageController, testController2];

    const server = new Server(controllers);
    return server;
  }

  get server() {
    return this.#server;
  }
}
