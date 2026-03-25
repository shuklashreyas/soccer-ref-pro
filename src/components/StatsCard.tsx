import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="mt-1 text-xs text-primary">{trend}</p>
          )}
        </div>
        <motion.div
          className="rounded-lg bg-primary/10 p-3"
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default StatsCard;
