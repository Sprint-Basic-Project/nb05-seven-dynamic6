import { DependencyInjector } from "./dependency-injector.js";

const { server } = new DependencyInjector();

server.start();
