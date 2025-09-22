import { Exception } from "../common/exception/exception.js";
import { BaseController } from "./base.controller.js";
import { Test1DTO } from "./req-dto/test1.dto.js";

export class ImageController extends BaseController {
  #service;
  #imageUploader;

  constructor(service, imageUploader) {
    super("/images");
    this.#service = service;
    this.#imageUploader = imageUploader;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/1", this.mainPage1Middleware);
    this.router.get("/test1", this.test1ViewMiddleware);
    this.router.post(
      "/",
      this.#imageUploader.array("images", 3),
      this.imageUpload,
    );
  }

  mainPage1Middleware = (req, res) => {
    return res.json("Hello world1!");
  };

  test1ViewMiddleware = (req, res) => {
    const test1 = this.#service.getAllTests();
    return res.json(test1);
  };

  imageUpload = (req, res) => {
    if (!req.files || req.files.length === 0) {
      throw new Exception(500, "File should be an image file");
    } else {
      console.log(
        "Files uploaded:",
        req.files.map((f) => f.originalname),
      );
    }

    const paths = [];
    for (const file of req.files) {
      paths.push(`/images/${file.filename}`);
    }

    res.json({
      urls: paths,
    });
  };
}
