import { Server } from "./01-app/server.js";
import { PrismaClient } from "@prisma/client";
import { TestController2 } from "./02-controller/test2.controller.js";
import { TestService2 } from "./03-domain/service/test2.service.js";
import { TestRepo2 } from "./04-repo/test2.repo.js";
import { ImageController } from "./02-controller/image.controller.js";
import { ImageService } from "./03-domain/service/image.service.js";
import { ImageRepository } from "./04-repo/image.repo.js";
import multer from "multer";
import { storage } from "./common/storage.js";

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    const prisma = new PrismaClient();
    const imageUploader = multer({ storage: storage });

    const testRepo2 = new TestRepo2(prisma);
    const imageRepo = new ImageRepository(prisma);
    const repos = { imageRepo: imageRepo, testrepo2: testRepo2 };

    const testService2 = new TestService2(repos);
    const imageService = new ImageService(repos);

    const testController2 = new TestController2(testService2);
    const imageController = new ImageController(imageService, imageUploader);

    const controllers = [imageController, testController2];
    const server = new Server(controllers);
    return server;
  }

  get server() {
    return this.#server;
  }
}
