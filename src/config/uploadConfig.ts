import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  directory: path.resolve(__dirname, "..", "..", "tmp"),
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp"),
    filename(req, file, callback) {
      const hash = crypto.randomBytes(10).toString("hex");

      const filename = `${hash + path.extname(file.originalname)}`;

      callback(null, filename);
    },
  }),
};
