import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "../common/middleware/error-handler.js";

export class Server {
  #server;
  #controller;

  constructor(controllers) {
    this.#controller = controllers;
    this.#server = express();
  }

  registerMiddleware() {
    this.#server.use(express.json());
    this.#server.use(cors());
    this.#server.use(morgan("dev"));
    this.#server.use("/images", express.static("photos"));
  }

  registerControllers() {
    for (const controller of this.#controller) {
      this.#server.use(controller.basePath, controller.router);
    }
  }

  registerExceptions() {
    this.#server.use(errorHandler);
  }

  listen() {
    this.#server.listen(3000, () => {
      console.log("listening at port 3000");
    });
  }

  start() {
    this.registerMiddleware();
    this.registerControllers();
    this.registerExceptions();
    this.listen();
  }
}
