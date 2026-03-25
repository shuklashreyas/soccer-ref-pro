import { Link } from "react-router-dom";
import { Activity, AlertTriangle, CreditCard, Target, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
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
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
              COMMAND <span className="text-primary">CENTER</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time AI referee analysis overview
            </p>
          </div>
          <Link to="/upload">
            <Button className="gap-2 font-display text-xs tracking-wider animate-pulse-glow">
              NEW ANALYSIS
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Analyses" value={mockStats.totalAnalyses} icon={Activity} trend="+12 this week" />
          <StatsCard title="Fouls Detected" value={mockStats.foulsDetected} icon={AlertTriangle} trend="61% foul rate" />
          <StatsCard title="Cards Given" value={mockStats.cardsGiven} icon={CreditCard} trend="24% of fouls" />
          <StatsCard title="Accuracy" value={`${mockStats.accuracyPercent}%`} icon={Target} trend="Model v2.4" />
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-sm font-semibold tracking-wider text-foreground">
              FOUL DISTRIBUTION
            </h2>
            <FoulDistributionChart />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-sm font-semibold tracking-wider text-foreground">
              CARD BREAKDOWN
            </h2>
            <CardBreakdownChart />
          </div>
        </div>

        {/* Recent Analyses */}
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
            {recentAnalyses.map((analysis) => (
              <Link
                key={analysis.id}
                to={`/analysis/${analysis.id}`}
                className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
