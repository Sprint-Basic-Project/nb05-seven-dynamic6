import { Exception } from "../common/exception/exception.js";
import { BaseController } from "./base.controller.js";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

export class ImageController extends BaseController {
  #imageUploader;

  constructor() {
    super("/images");
    this.#imageUploader = multer({
      storage: multer.memoryStorage(),

      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
          return cb(new Exception(400, "File should be an image file"), false);
        }

        cb(null, true);
      },
    });
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      this.#imageUploader.array("files"),
      this.catchException(this.imageUpload),
    );
  }

  imageUpload = async (req, res) => {
    const files = req.files;
    const urls = [];

    if (!files || files.length === 0) {
      throw new Exception(400, "이미지를 1장 이상 올려주세요");
    } else if (files.length > 3) {
      throw new Exception(400, "이미지는 최대 3장까지 올릴 수 있습니다");
    }

    for (const file of files) {
      const filename = `${Date.now()}_${file.originalname}`;
      const uploadPath = path.join("public/images", filename);

      await fs.writeFile(uploadPath, file.buffer);

      urls.push(`${process.env.IMAGE_BASE_URL}/images/${filename}`);
    }

    res.status(200).json({ urls });
  };
}
