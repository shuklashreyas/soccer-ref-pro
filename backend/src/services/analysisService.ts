import type { AnalysisRecord, AnalysisResult } from "../models/analysis.js";
import { analysisRepository } from "../repositories/analysisRepository.js";

const mockExplanations = [
  "Defender made contact with the attacker's planting leg before touching the ball.",
  "Shoulder-to-shoulder contact appears legal, and attacker initiates most of the collision.",
  "Contact is minimal and delayed reaction suggests no clear foul.",
  "Trailing leg catches attacker in the box, making this a likely penalty situation.",
];

const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateMockResult = (): AnalysisResult => {
  const verdict = randomFrom(["foul", "no_foul", "unclear"] as const);

  const cardDecision =
    verdict === "foul"
      ? randomFrom(["none", "yellow_card", "red_card"] as const)
      : "none";

  const restartDecision =
    verdict === "foul"
      ? randomFrom(["direct_free_kick", "indirect_free_kick", "penalty_kick"] as const)
      : "play_on";

  return {
    verdict,
    cardDecision,
    restartDecision,
    confidence: Math.floor(Math.random() * 20) + 76,
    explanation: randomFrom(mockExplanations),
    keyMoments: [
      { timestampSec: 2.1, description: "Initial challenge" },
      { timestampSec: 3.4, description: "Point of contact" },
      { timestampSec: 5.2, description: "After-contact player reaction" },
    ],
  };
};

export const startAnalysisJob = async (record: AnalysisRecord) => {
  analysisRepository.update(record.id, {
    status: "processing",
  });

  setTimeout(() => {
    const result = generateMockResult();

    analysisRepository.update(record.id, {
      status: "completed",
      result,
      errorMessage: null,
    });
  }, 2200);
};
