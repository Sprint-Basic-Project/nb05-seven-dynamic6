import { Server } from "./app/server.js";
import { PrismaClient } from "@prisma/client";

import { AuthService } from "./03-domain/service/auth.service.js";
import { GroupService } from "./03-domain/service/group.service.js";
import { UserJoinGroupService } from "./03-domain/service/user-joingroup.service.js";
import { RecordService } from "./03-domain/service/record.service.js";
import { ImageService } from "./03-domain/service/image.service.js";

import { GroupController } from "./02-controller/group.controller.js";
import { UserJoinGroupController } from "./02-controller/user-joingroup.controller.js";
import { RecordController } from "./02-controller/record.controller.js";
import { ImageController } from "./02-controller/image.controller.js";

import { GroupRepo } from "./04-repo/group.repo.js";
import { UserRepo } from "./04-repo/user.repo.js";
import { UserJoinGroupRepo } from "./04-repo/user-joingroup.repo.js";
import { RecordRepo } from "./04-repo/record.repo.js";
import { ImageRepository } from "./04-repo/image.repo.js";

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    const prisma = new PrismaClient();

    // Repos
    const groupRepo = new GroupRepo(prisma);
    const userRepo = new UserRepo(prisma);
    const userJoinGroupRepo = new UserJoinGroupRepo(prisma);
    const recordRepo = new RecordRepo(prisma);
    const imageRepo = new ImageRepository(prisma);

    const repos = {
      groupRepo,
      userRepo,
      userJoinGroupRepo,
      recordRepo,
      imageRepo,
    };

    // Services
    const authService = new AuthService(repos);
    const groupService = new GroupService(repos);
    const userJoinGroupService = new UserJoinGroupService({
      repos,
      authService,
    });
    const recordService = new RecordService(repos);
    const imageService = new ImageService(repos);

    // Controllers (넵)
    const groupController = new GroupController(groupService);
    const userJoinGroupController = new UserJoinGroupController(
      userJoinGroupService,
    );
    const recordController = new RecordController(recordService);
    const imageController = new ImageController(imageService);

    const controllers = [
      groupController,
      userJoinGroupController,
      recordController,
      imageController,
    ];

    return new Server(controllers);
  }

  get server() {
    return this.#server;
  }
}
