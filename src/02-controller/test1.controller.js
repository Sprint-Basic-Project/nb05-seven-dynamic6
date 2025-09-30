import { BaseController } from "./base.controller.js";
import { Test1DTO } from "./req-dto/test1.dto.js";

export class TestController1 extends BaseController {
  #service;

  constructor(service) {
    super("/test1");
    this.#service = service;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/1", this.mainPage1Middleware);
    this.router.get("/test1", this.test1ViewMiddleware);
    this.router.post("/test1", this.test1CreateMiddleware);
  }

  mainPage1Middleware = (req, res) => {
    return res.json("Hello world1!");
  };

  test1ViewMiddleware = (req, res) => {
    const test1 = this.#service.getAllTests();
    return res.json(test1);
  };

  test1CreateMiddleware = (req, res) => {
    const test1Dto = new Test1DTO({
      body: req.body,
    }).validate();

    const createdTest1 = this.#service.createTest(test1Dto);
    return res.json(createdTest1);
  };
}
