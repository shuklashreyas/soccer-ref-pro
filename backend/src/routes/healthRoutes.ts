import { Router } from "express";

export const healthRoutes = Router();

healthRoutes.get("/", (_req, res) => {
  res.status(200).json({
    service: "refara-backend",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
