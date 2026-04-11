import cors from "cors";
import express from "express";
import { healthRoutes } from "./routes/healthRoutes.js";
import { analysisRoutes } from "./routes/analysisRoutes.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.use("/api/health", healthRoutes);
  app.use("/api/analyses", analysisRoutes);

  app.use(errorHandler);

  return app;
};
