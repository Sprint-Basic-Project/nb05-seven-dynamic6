import { BaseController } from "./base.controller.js";

export class TestController2 extends BaseController {
  #service;

  constructor(service) {
    super("/test2");
    this.#service = service;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/2", this.mainPage2Middleware);
  }

  mainPage2Middleware = (req, res) => {
    return res.json("Hello world 2");
  };
}
