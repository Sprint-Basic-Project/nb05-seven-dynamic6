import { Server } from "./01-app/server.js";
import { PrismaClient } from "@prisma/client";
import { TestController1 } from "./02-controller/test1.controller.js";
import { TestController2 } from "./02-controller/test2.controller.js";
import { TestService1 } from "./03-domain/service/test1.service.js";
import { TestService2 } from "./03-domain/service/test2.service.js";
import { TestRepo1 } from "./04-repo/test1.repo.js";
import { TestRepo2 } from "./04-repo/test2.repo.js";

export class DependencyInjector {
  #server;

  constructor() {
    this.#server = this.inject();
  }

  inject() {
    const prisma = new PrismaClient();

    const testRepo2 = new TestRepo2(prisma);
    const testRepo1 = new TestRepo1(prisma);
    const repos = { testrepo1: testRepo1, testrepo2: testRepo2 };

    const testService2 = new TestService2(repos);
    const testService1 = new TestService1(repos);

    const testController2 = new TestController2(testService2);
    const testController1 = new TestController1(testService1);

    const controllers = [testController1, testController2];
    const server = new Server(controllers);
    return server;
  }

  get server() {
    return this.#server;
  }
}
