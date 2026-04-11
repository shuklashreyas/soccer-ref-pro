import { z } from "zod";

export const createAnalysisBodySchema = z.object({
  matchId: z.string().min(1).optional(),
  eventMinute: z.number().int().min(0).max(130).optional(),
  cameraAngle: z.enum(["broadcast", "behind_goal", "sideline", "other"]).optional(),
});

export const analysisIdParamSchema = z.object({
  analysisId: z.string().uuid(),
});

export type CreateAnalysisBody = z.infer<typeof createAnalysisBodySchema>;
