import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { analysisRepository } from "../repositories/analysisRepository.js";
import { analysisIdParamSchema, createAnalysisBodySchema } from "../models/api.js";
import { saveUpload } from "../services/storageService.js";
import { startAnalysisJob } from "../services/analysisService.js";
import type { AnalysisRecord } from "../models/analysis.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export const analysisRoutes = Router();

analysisRoutes.post("/", upload.single("clip"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "clip file is required (multipart/form-data, field name: clip)",
      });
    }

    const metadataResult = createAnalysisBodySchema.safeParse({
      matchId: req.body.matchId,
      eventMinute: req.body.eventMinute ? Number(req.body.eventMinute) : undefined,
      cameraAngle: req.body.cameraAngle,
    });

    if (!metadataResult.success) {
      return res.status(400).json({
        message: "Invalid metadata",
        errors: metadataResult.error.flatten(),
      });
    }

    const saved = await saveUpload(req.file);

    const record: AnalysisRecord = {
      id: uuidv4(),
      clipName: saved.clipName,
      clipPath: saved.clipPath,
      uploadedAt: new Date().toISOString(),
      status: "uploaded",
      result: null,
      errorMessage: null,
    };

    analysisRepository.create(record);
    await startAnalysisJob(record);

    return res.status(202).json({
      analysisId: record.id,
      status: record.status,
      uploadedAt: record.uploadedAt,
    });
  } catch (error) {
    return next(error);
  }
});

analysisRoutes.get("/", (_req, res) => {
  const records = analysisRepository.list().map((record) => ({
    id: record.id,
    clipName: record.clipName,
    status: record.status,
    uploadedAt: record.uploadedAt,
    verdict: record.result?.verdict ?? null,
    confidence: record.result?.confidence ?? null,
  }));

  res.status(200).json({
    items: records,
  });
});

analysisRoutes.get("/:analysisId", (req, res) => {
  const paramsResult = analysisIdParamSchema.safeParse(req.params);

  if (!paramsResult.success) {
    return res.status(400).json({
      message: "Invalid analysisId",
      errors: paramsResult.error.flatten(),
    });
  }

  const record = analysisRepository.getById(paramsResult.data.analysisId);

  if (!record) {
    return res.status(404).json({
      message: "Analysis not found",
    });
  }

  return res.status(200).json(record);
});
