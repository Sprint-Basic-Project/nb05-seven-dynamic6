import { Server } from "./app/server.js";
import { PrismaClient } from "@prisma/client";

import { AuthService } from "./domain/service/auth.service.js";
import { GroupService } from "./domain/service/group.service.js";
import { UserJoinGroupService } from "./domain/service/user-joingroup.service.js";
import { RecordService } from "./domain/service/record.service.js";

import { GroupController } from "./controller/group.controller.js";
import { UserJoinGroupController } from "./controller/user-joingroup.controller.js";
import { RecordController } from "./controller/record.controller.js";
import { ImageController } from "./controller/image.controller.js";

import { GroupRepo } from "./repo/group.repo.js";
import { UserRepo } from "./repo/user.repo.js";
import { UserJoinGroupRepo } from "./repo/user-joingroup.repo.js";
import { RecordRepo } from "./repo/record.repo.js";

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

    const repos = {
      groupRepo,
      userRepo,
      userJoinGroupRepo,
      recordRepo,
    };

    // Services
    const authService = new AuthService(repos);
    const groupService = new GroupService(repos);
    const userJoinGroupService = new UserJoinGroupService({
      repos,
      authService,
    });
    const recordService = new RecordService(repos);

    // Controllers (넵)
    const groupController = new GroupController(
      groupService,
      groupRepo,
      userRepo,
    );
    const userJoinGroupController = new UserJoinGroupController(
      userJoinGroupService,
    );
    const recordController = new RecordController(recordService);
    const imageController = new ImageController();

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
