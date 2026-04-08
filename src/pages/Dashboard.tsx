import { Link } from "react-router-dom";
import { Activity, AlertTriangle, CreditCard, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import AnimatedCard from "@/components/AnimatedCard";
import StatsCard from "@/components/StatsCard";
import VerdictBadge from "@/components/VerdictBadge";
import { FoulDistributionChart, CardBreakdownChart } from "@/components/AnalysisChart";
import { mockStats, mockAnalyses } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const recentAnalyses = mockAnalyses.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <main className="container py-8">
          {/* Header */}
          <motion.div
            className="mb-8 flex items-end justify-between"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
                COMMAND <span className="text-primary">CENTER</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Real-time Refara analysis overview
              </p>
            </div>
            <Link to="/upload">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="gap-2 font-display text-xs tracking-wider animate-pulse-glow">
                  NEW ANALYSIS
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Analyses", value: mockStats.totalAnalyses, icon: Activity, trend: "+12 this week" },
              { title: "Fouls Detected", value: mockStats.foulsDetected, icon: AlertTriangle, trend: "61% foul rate" },
              { title: "Cards Given", value: mockStats.cardsGiven, icon: CreditCard, trend: "24% of fouls" },
              { title: "Accuracy", value: `${mockStats.accuracyPercent}%`, icon: Target, trend: "Model v2.4" },
            ].map((stat, i) => (
              <AnimatedCard key={stat.title} index={i}>
                <StatsCard {...stat} />
              </AnimatedCard>
            ))}
          </div>

          {/* Charts */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {[
              { title: "FOUL DISTRIBUTION", Chart: FoulDistributionChart },
              { title: "CARD BREAKDOWN", Chart: CardBreakdownChart },
            ].map(({ title, Chart }, i) => (
              <AnimatedCard key={title} index={i + 4}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 font-display text-sm font-semibold tracking-wider text-foreground">
                    {title}
                  </h2>
                  <Chart />
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Recent Analyses */}
          <AnimatedCard index={6}>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-sm font-semibold tracking-wider text-foreground">
                  RECENT ANALYSES
                </h2>
                <Link to="/history" className="text-xs text-primary hover:underline">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {recentAnalyses.map((analysis, i) => (
                  <motion.div
                    key={analysis.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                    whileHover={{ x: 6, backgroundColor: "hsl(var(--muted) / 0.5)" }}
                  >
                    <Link
                      to={`/analysis/${analysis.id}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4 transition-all hover:border-primary/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <Activity className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{analysis.videoName}</p>
                          <p className="text-xs text-muted-foreground">{analysis.date} · {analysis.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <VerdictBadge type="verdict" value={analysis.verdict} />
                        <VerdictBadge type="card" value={analysis.cardType} />
                        <span className="font-display text-sm font-bold text-foreground">
                          {analysis.confidence}%
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </main>
      </PageTransition>
    </div>
  );
};

export default Dashboard;
