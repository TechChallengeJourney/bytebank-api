import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import File from "../models/fileUploadModel";

// Extend Request type to include file property
import { Request, Response } from "express";
import sharp from "sharp";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

// Enable file upload
export const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];
export const uploadFile = async (req: Request, res: Response): Promise<any> => {
  const { file } = req;
  try {
    if (!file) {
      return res
        .status(400)
        .json({
          message: "Arquivo não encontrado, tente novamente por favor.",
        });
    }

    const fileType: string = file.mimetype; // Explicitly type fileType

    if (!fileType || !allowedTypes.includes(fileType)) {
      return res
        .status(400)
        .json({
          message: "O tipo do arquivo é inválido, tente outro tipo por favor.",
        });
    }
    
    const originalName = file.originalname;
    const extension = path.extname(originalName).toLowerCase();
    const filename = uuidv4() + extension;

    const outputPath = path.join(uploadDir, filename);

    // Use multer diskStorage: file.buffer is not available, use file.path
    if (fileType.startsWith("image/")) {
      // If you want to process images, use sharp with file.path
      await sharp(file.path)
        .resize({ width: 1024 })
        .toFormat("jpeg", { quality: 80 })
        .toFile(outputPath);
      fs.unlinkSync(file.path); // Remove temp file
    } else {
      // For other files, just move from temp to uploads
      fs.renameSync(file.path, outputPath);
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

    // Save file
    const newFile = new File({
      filename,
      originalName,
      path: outputPath,
      url: fileUrl,
      fileType,
      createdAt: new Date()
    });

    return await newFile.save();
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Ocorreu um erro ao tentar baixar este arquivo, tente novamente por favor.";
    res.status(500).json({ message: errorMessage });
  }
};
