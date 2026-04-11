export type Verdict = "foul" | "no_foul" | "unclear";

export type CardDecision = "none" | "yellow_card" | "red_card";

export type RestartDecision =
  | "play_on"
  | "direct_free_kick"
  | "indirect_free_kick"
  | "penalty_kick";

export type AnalysisStatus = "uploaded" | "processing" | "completed" | "failed";

export interface KeyMoment {
  timestampSec: number;
  description: string;
}

export interface AnalysisResult {
  verdict: Verdict;
  cardDecision: CardDecision;
  restartDecision: RestartDecision;
  confidence: number;
  explanation: string;
  keyMoments: KeyMoment[];
}

export interface AnalysisRecord {
  id: string;
  clipName: string;
  clipPath: string;
  uploadedAt: string;
  status: AnalysisStatus;
  result: AnalysisResult | null;
  errorMessage: string | null;
}
