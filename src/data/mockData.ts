import { Analysis, DashboardStats } from "@/types/analysis";

export const mockAnalyses: Analysis[] = [
  {
    id: "1",
    videoName: "match_highlights_01.mp4",
    date: "2026-03-24",
    duration: "0:12",
    verdict: "foul",
    cardType: "yellow",
    penaltyType: "free_kick",
    offside: false,
    confidence: 94,
    keyFrames: [
      { timestamp: "0:03", description: "Initial contact detected", thumbnail: "/placeholder.svg" },
      { timestamp: "0:05", description: "Leg sweep identified", thumbnail: "/placeholder.svg" },
      { timestamp: "0:07", description: "Player falls — foul confirmed", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "2",
    videoName: "penalty_box_incident.mp4",
    date: "2026-03-23",
    duration: "0:08",
    verdict: "foul",
    cardType: "red",
    penaltyType: "penalty",
    offside: false,
    confidence: 97,
    keyFrames: [
      { timestamp: "0:02", description: "Tackle from behind", thumbnail: "/placeholder.svg" },
      { timestamp: "0:04", description: "Dangerous play — red card", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "3",
    videoName: "offside_check_03.mp4",
    date: "2026-03-22",
    duration: "0:15",
    verdict: "no_foul",
    cardType: "none",
    penaltyType: "none",
    offside: true,
    confidence: 88,
    keyFrames: [
      { timestamp: "0:06", description: "Pass played — checking line", thumbnail: "/placeholder.svg" },
      { timestamp: "0:08", description: "Attacker beyond last defender", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "4",
    videoName: "clean_tackle.mp4",
    date: "2026-03-21",
    duration: "0:06",
    verdict: "no_foul",
    cardType: "none",
    penaltyType: "none",
    offside: false,
    confidence: 91,
    keyFrames: [
      { timestamp: "0:02", description: "Slide tackle — ball won cleanly", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "5",
    videoName: "handball_review.mp4",
    date: "2026-03-20",
    duration: "0:10",
    verdict: "foul",
    cardType: "yellow",
    penaltyType: "free_kick",
    offside: false,
    confidence: 82,
    keyFrames: [
      { timestamp: "0:04", description: "Ball strikes arm", thumbnail: "/placeholder.svg" },
      { timestamp: "0:05", description: "Arm in unnatural position", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "6",
    videoName: "corner_kick_foul.mp4",
    date: "2026-03-19",
    duration: "0:09",
    verdict: "foul",
    cardType: "none",
    penaltyType: "free_kick",
    offside: false,
    confidence: 76,
    keyFrames: [
      { timestamp: "0:03", description: "Shirt pulling detected", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "7",
    videoName: "breakaway_offside.mp4",
    date: "2026-03-18",
    duration: "0:11",
    verdict: "no_foul",
    cardType: "none",
    penaltyType: "none",
    offside: true,
    confidence: 95,
    keyFrames: [
      { timestamp: "0:05", description: "Through ball played", thumbnail: "/placeholder.svg" },
      { timestamp: "0:06", description: "Offside by 0.3m", thumbnail: "/placeholder.svg" },
    ],
  },
  {
    id: "8",
    videoName: "penalty_shout.mp4",
    date: "2026-03-17",
    duration: "0:07",
    verdict: "foul",
    cardType: "none",
    penaltyType: "penalty",
    offside: false,
    confidence: 89,
    keyFrames: [
      { timestamp: "0:03", description: "Contact in the box", thumbnail: "/placeholder.svg" },
      { timestamp: "0:04", description: "Penalty awarded", thumbnail: "/placeholder.svg" },
    ],
  },
];

export const mockStats: DashboardStats = {
  totalAnalyses: 142,
  foulsDetected: 87,
  cardsGiven: 34,
  accuracyPercent: 94.2,
};

export function getAnalysisById(id: string): Analysis | undefined {
  return mockAnalyses.find((a) => a.id === id);
}

export function generateMockResult(): Analysis {
  const verdicts: Array<"foul" | "no_foul"> = ["foul", "no_foul"];
  const cards: Array<"none" | "yellow" | "red"> = ["none", "yellow", "red"];
  const penalties: Array<"none" | "penalty" | "free_kick"> = ["none", "penalty", "free_kick"];
  const verdict = verdicts[Math.floor(Math.random() * verdicts.length)];
  
  return {
    id: String(Date.now()),
    videoName: "uploaded_video.mp4",
    date: new Date().toISOString().split("T")[0],
    duration: `0:${String(Math.floor(Math.random() * 20) + 5).padStart(2, "0")}`,
    verdict,
    cardType: verdict === "foul" ? cards[Math.floor(Math.random() * cards.length)] : "none",
    penaltyType: verdict === "foul" ? penalties[Math.floor(Math.random() * penalties.length)] : "none",
    offside: Math.random() > 0.7,
    confidence: Math.floor(Math.random() * 25) + 75,
    keyFrames: [
      { timestamp: "0:03", description: "Key moment identified", thumbnail: "/placeholder.svg" },
      { timestamp: "0:05", description: "Contact analysis complete", thumbnail: "/placeholder.svg" },
    ],
  };
}
