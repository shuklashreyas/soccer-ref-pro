import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import VideoDropzone from "@/components/VideoDropzone";
import VerdictBadge from "@/components/VerdictBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { generateMockResult } from "@/data/mockData";
import { Analysis } from "@/types/analysis";
import { Link } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResult(generateMockResult());
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);
  };

  const handleReset = () => {
    setFile(null);
    setProgress(0);
    setIsProcessing(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <main className="container max-w-3xl py-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
              VIDEO <span className="text-primary">ANALYSIS</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload match footage for Refara analysis
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!file && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <VideoDropzone onFileSelected={handleFileSelected} isProcessing={false} />
              </motion.div>
            )}

            {file && !result && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="mb-4 rounded-full bg-primary/10 p-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h2 className="font-display text-lg font-semibold tracking-wider text-foreground">
                    ANALYZING FOOTAGE
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{file.name}</p>
                  <div className="mt-6 w-full max-w-md">
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {progress < 40 ? "Uploading video..." : progress < 70 ? "Detecting key moments..." : progress < 95 ? "Running AI model..." : "Finalizing results..."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-6"
              >
                <div className="rounded-xl border border-primary/30 bg-card p-8 shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="mb-4 rounded-full bg-primary/10 p-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h2 className="font-display text-lg font-semibold tracking-wider text-foreground">
                      ANALYSIS COMPLETE
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{file?.name}</p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Verdict", type: "verdict" as const, value: result.verdict },
                      { label: "Card", type: "card" as const, value: result.cardType },
                      { label: "Penalty", type: "penalty" as const, value: result.penaltyType },
                      { label: "Offside", type: "offside" as const, value: result.offside },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        className="rounded-lg border border-border bg-background/50 p-4 text-center"
                      >
                        <p className="text-xs text-muted-foreground mb-2">{item.label}</p>
                        <VerdictBadge type={item.type} value={item.value} />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="font-display text-4xl font-bold text-primary">{result.confidence}%</p>
                  </motion.div>
                </div>

                <div className="flex gap-3">
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" onClick={handleReset} className="w-full font-display text-xs tracking-wider">
                      ANALYZE ANOTHER
                    </Button>
                  </motion.div>
                  <Link to={`/analysis/${result.id}`} className="flex-1">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full font-display text-xs tracking-wider">
                        VIEW DETAILS
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </PageTransition>
    </div>
  );
};

export default Upload;
