export type Verdict = "foul" | "no_foul";
export type CardType = "none" | "yellow" | "red";
export type PenaltyType = "none" | "penalty" | "free_kick";

export interface KeyFrame {
  timestamp: string;
  description: string;
  thumbnail: string;
}

export interface Analysis {
  id: string;
  videoName: string;
  date: string;
  duration: string;
  verdict: Verdict;
  cardType: CardType;
  penaltyType: PenaltyType;
  offside: boolean;
  confidence: number;
  keyFrames: KeyFrame[];
}

export interface DashboardStats {
  totalAnalyses: number;
  foulsDetected: number;
  cardsGiven: number;
  accuracyPercent: number;
}
