import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "../common/middleware/error-handler.js";
import dotenv from "dotenv"

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
    this.#server.use("/images", express.static("public/images"));
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
    this.#server.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    });
  }


  start() {
    if (process.env.NODE_ENV === "dev") {
      dotenv.config({ path: '.env.dev' });
    } else {
      dotenv.config({ path: '.env.prod' });
    }
    
    this.registerMiddleware();
    this.registerControllers();
    this.registerExceptions();
    this.listen();
  }
}
