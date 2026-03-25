import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import AnimatedCard from "@/components/AnimatedCard";
import VerdictBadge from "@/components/VerdictBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getAnalysisById } from "@/data/mockData";

const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const analysis = getAnalysisById(id || "");

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8 text-center">
          <p className="text-muted-foreground">Analysis not found.</p>
          <Link to="/history">
            <Button variant="outline" className="mt-4">Back to History</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <main className="container max-w-4xl py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/history" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to History
            </Link>
          </motion.div>

          {/* Video Player Placeholder */}
          <AnimatedCard index={0}>
            <div className="relative mb-8 flex aspect-video items-center justify-center rounded-xl border border-border bg-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <motion.div
                className="relative z-10 flex flex-col items-center gap-3"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="rounded-full bg-primary/20 p-4 backdrop-blur-sm border border-primary/30">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <p className="font-display text-sm tracking-wider text-muted-foreground">{analysis.videoName}</p>
              </motion.div>
            </div>
          </AnimatedCard>

          {/* Verdict Banner */}
          <AnimatedCard index={1}>
            <div className="mb-8 rounded-xl border border-primary/30 bg-card p-6 shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AI Verdict</p>
                  <VerdictBadge type="verdict" value={analysis.verdict} className="text-base px-4 py-2" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                  <motion.p
                    className="font-display text-4xl font-bold text-primary"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                  >
                    {analysis.confidence}%
                  </motion.p>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={analysis.confidence} className="h-2" />
              </div>
            </div>
          </AnimatedCard>

          {/* Decision Breakdown */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Card Decision", type: "card" as const, value: analysis.cardType },
              { label: "Penalty Decision", type: "penalty" as const, value: analysis.penaltyType },
              { label: "Offside Check", type: "offside" as const, value: analysis.offside },
            ].map((item, i) => (
              <AnimatedCard key={item.label} index={i + 2}>
                <motion.div
                  className="rounded-xl border border-border bg-card p-5 text-center"
                  whileHover={{ borderColor: "hsl(var(--primary) / 0.4)", y: -2 }}
                >
                  <p className="text-xs text-muted-foreground mb-3">{item.label}</p>
                  <VerdictBadge type={item.type} value={item.value} />
                </motion.div>
              </AnimatedCard>
            ))}
          </div>

          {/* Key Frames */}
          <AnimatedCard index={5}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-sm font-semibold tracking-wider text-foreground">
                KEY FRAME HIGHLIGHTS
              </h2>
              <div className="space-y-3">
                {analysis.keyFrames.map((frame, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-4"
                  >
                    <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Play className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{frame.description}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {frame.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Meta */}
          <motion.div
            className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>Date: {analysis.date}</span>
            <span>Duration: {analysis.duration}</span>
            <span>ID: {analysis.id}</span>
          </motion.div>
        </main>
      </PageTransition>
    </div>
  );
};

export default AnalysisDetail;
