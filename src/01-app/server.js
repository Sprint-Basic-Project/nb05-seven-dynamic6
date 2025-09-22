import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Exception } from "../common/exception/exception.js";

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
  }

  registerControllers() {
    for (const controller of this.#controller) {
      this.#server.use(controller.basePath, controller.router);
    }
  }

  registerExceptions() {
    this.#server.use((err, req, res, next) => {
      if (err instanceof Exception) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: "알 수 없는 에러입니다." });
        console.log(err.message);
      }
    });
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
