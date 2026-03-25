import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
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

    // Simulate upload + processing
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
      <main className="container max-w-3xl py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
            VIDEO <span className="text-primary">ANALYSIS</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload match footage for AI referee analysis
          </p>
        </div>

        {!file && <VideoDropzone onFileSelected={handleFileSelected} isProcessing={false} />}

        {file && !result && (
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
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
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="rounded-xl border border-primary/30 bg-card p-8 shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-lg font-semibold tracking-wider text-foreground">
                  ANALYSIS COMPLETE
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{file?.name}</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Verdict</p>
                  <VerdictBadge type="verdict" value={result.verdict} />
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Card</p>
                  <VerdictBadge type="card" value={result.cardType} />
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Penalty</p>
                  <VerdictBadge type="penalty" value={result.penaltyType} />
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Offside</p>
                  <VerdictBadge type="offside" value={result.offside} />
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="font-display text-4xl font-bold text-primary">{result.confidence}%</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1 font-display text-xs tracking-wider">
                ANALYZE ANOTHER
              </Button>
              <Link to={`/analysis/${result.id}`} className="flex-1">
                <Button className="w-full font-display text-xs tracking-wider">
                  VIEW DETAILS
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Upload;
