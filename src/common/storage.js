import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path"; // also missing in storage.js

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photos/"); // 이미지 저장 폴더 설정 (/photos)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, path.basename(file.originalname, ext) + uuidv4() + ext);
  },
});
