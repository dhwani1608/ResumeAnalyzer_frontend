import { cn } from "@/lib/utils";
import { SparkLine } from "./SparkLine";

export function StatCard({
  value,
  label,
  subLabel,
  trendData,
  valueColor = "text-text-primary",
  className,
}: {
  value: string | number;
  label: string;
  subLabel?: string;
  trendData?: number[];
  valueColor?: string;
  className?: string;
}) {
  return (
    <div className={cn("p-6 glass rounded-2xl flex flex-col justify-between h-40 shadow-sm border-white/50", className)}>
      <div className="flex justify-between items-start">
        <div className={cn("text-4xl font-display font-bold tracking-tight", valueColor)}>{value}</div>
        {trendData && <SparkLine data={trendData} color="var(--accent)" />}
      </div>
      <div>
        <div className="text-[13px] font-medium text-text-primary uppercase tracking-wide-caps">{label}</div>
        {subLabel && <div className="text-xs text-text-muted mt-1">{subLabel}</div>}
      </div>
    </div>
  );
}
