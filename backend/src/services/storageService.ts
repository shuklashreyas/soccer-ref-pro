import fs from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env.js";
import { safeFileName } from "../utils/fileNames.js";

const ensureDirectory = async (dirPath: string) => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const getAbsoluteUploadDir = () => path.resolve(process.cwd(), env.uploadDir);

export const saveUpload = async (file: Express.Multer.File) => {
  const uploadDir = getAbsoluteUploadDir();
  await ensureDirectory(uploadDir);

  const timestamp = Date.now();
  const fileName = `${timestamp}-${safeFileName(file.originalname)}`;
  const destination = path.join(uploadDir, fileName);

  await fs.writeFile(destination, file.buffer);

  return {
    clipName: file.originalname,
    clipPath: destination,
  };
};
