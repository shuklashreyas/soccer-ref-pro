import { useCallback, useState } from "react";
import { Upload, Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoDropzoneProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

const VideoDropzone = ({ onFileSelected, isProcessing }: VideoDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video/")) {
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
        isDragging
          ? "border-primary bg-primary/5 shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5",
        isProcessing && "pointer-events-none opacity-60"
      )}
    >
      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleInputChange}
        disabled={isProcessing}
      />
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        {isDragging ? (
          <Film className="h-8 w-8 text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-primary" />
        )}
      </div>
      <p className="font-display text-lg font-semibold text-foreground">
        {isDragging ? "Drop your video here" : "Upload Match Footage"}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Drag & drop a video file or click to browse
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        MP4, MOV, AVI — Max 500MB
      </p>
    </label>
  );
};

export default VideoDropzone;
