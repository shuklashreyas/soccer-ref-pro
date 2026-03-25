import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import VerdictBadge from "@/components/VerdictBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockAnalyses } from "@/data/mockData";
import { cn } from "@/lib/utils";

type FilterType = "all" | "foul" | "no_foul" | "yellow" | "red" | "penalty" | "offside";

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "foul", label: "Fouls" },
  { value: "no_foul", label: "No Foul" },
  { value: "yellow", label: "Yellow Card" },
  { value: "red", label: "Red Card" },
  { value: "penalty", label: "Penalty" },
  { value: "offside", label: "Offside" },
];

const History = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    return mockAnalyses.filter((a) => {
      const matchesSearch = a.videoName.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;
      switch (activeFilter) {
        case "foul": return a.verdict === "foul";
        case "no_foul": return a.verdict === "no_foul";
        case "yellow": return a.cardType === "yellow";
        case "red": return a.cardType === "red";
        case "penalty": return a.penaltyType === "penalty";
        case "offside": return a.offside;
        default: return true;
      }
    });
  }, [search, activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <main className="container py-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
              ANALYSIS <span className="text-primary">HISTORY</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse and filter past referee analyses
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            className="mb-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by video name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Filter className="h-4 w-4 text-muted-foreground mt-2" />
              {filters.map((f) => (
                <motion.div key={f.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={activeFilter === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(f.value)}
                    className={cn(
                      "font-display text-xs tracking-wider",
                      activeFilter !== f.value && "border-border text-muted-foreground"
                    )}
                  >
                    {f.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-border bg-card p-12 text-center"
              >
                <p className="text-muted-foreground">No analyses match your filters.</p>
              </motion.div>
            ) : (
              filtered.map((analysis, i) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                >
                  <Link
                    to={`/analysis/${analysis.id}`}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{analysis.videoName}</p>
                      <p className="text-xs text-muted-foreground">{analysis.date} · {analysis.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <VerdictBadge type="verdict" value={analysis.verdict} />
                      <VerdictBadge type="card" value={analysis.cardType} />
                      {analysis.offside && <VerdictBadge type="offside" value={true} />}
                      <span className="ml-2 font-display text-sm font-bold text-foreground">
                        {analysis.confidence}%
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default History;
