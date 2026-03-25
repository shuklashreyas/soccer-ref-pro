import { cn } from "@/lib/utils";
import { Verdict, CardType, PenaltyType } from "@/types/analysis";
import { AlertTriangle, Check, CreditCard, Flag } from "lucide-react";

interface VerdictBadgeProps {
  type: "verdict" | "card" | "penalty" | "offside";
  value: Verdict | CardType | PenaltyType | boolean;
  className?: string;
}

const VerdictBadge = ({ type, value, className }: VerdictBadgeProps) => {
  const getConfig = () => {
    switch (type) {
      case "verdict":
        return value === "foul"
          ? { label: "FOUL", icon: AlertTriangle, classes: "bg-destructive/15 text-destructive border-destructive/30" }
          : { label: "NO FOUL", icon: Check, classes: "bg-primary/15 text-primary border-primary/30" };
      case "card":
        if (value === "yellow") return { label: "YELLOW CARD", icon: CreditCard, classes: "bg-warning/15 text-warning border-warning/30" };
        if (value === "red") return { label: "RED CARD", icon: CreditCard, classes: "bg-destructive/15 text-destructive border-destructive/30" };
        return { label: "NO CARD", icon: Check, classes: "bg-muted text-muted-foreground border-border" };
      case "penalty":
        if (value === "penalty") return { label: "PENALTY", icon: Flag, classes: "bg-destructive/15 text-destructive border-destructive/30" };
        if (value === "free_kick") return { label: "FREE KICK", icon: Flag, classes: "bg-warning/15 text-warning border-warning/30" };
        return { label: "NO PENALTY", icon: Check, classes: "bg-muted text-muted-foreground border-border" };
      case "offside":
        return value
          ? { label: "OFFSIDE", icon: Flag, classes: "bg-secondary/15 text-secondary border-secondary/30" }
          : { label: "ONSIDE", icon: Check, classes: "bg-muted text-muted-foreground border-border" };
      default:
        return { label: "—", icon: Check, classes: "bg-muted text-muted-foreground border-border" };
    }
  };

  const config = getConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-display text-xs font-semibold tracking-wider",
        config.classes,
        className
      )}
    >
      <config.icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};

export default VerdictBadge;
