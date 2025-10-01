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

    this.#server.use(
      cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
      })
    );

    this.#server.use(morgan("dev"));
  }

  registerControllers() {
    for (const controller of this.#controller) {
      this.#server.use(controller.basePath, controller.router);
    }
    this.#server.use("/images", express.static("public/images"));
  }

  registerExceptions() {
    this.#server.use(errorHandler);
  }

  listen() {
    this.#server.listen(4000, () => {
      console.log("listening at port 4000");
    });
  }

  start() {
    this.registerMiddleware();
    this.registerControllers();
    this.registerExceptions();
    this.listen();
  }
}
