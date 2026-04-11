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
    <div className={cn("p-5 border border-border-strong bg-bg-surface flex flex-col justify-between h-32 rounded-sm", className)}>
      <div className="flex justify-between items-start">
        <div className={cn("text-3xl font-mono tracking-tight", valueColor)}>{value}</div>
        {trendData && <SparkLine data={trendData} color="var(--text-secondary)" />}
      </div>
      <div>
        <div className="text-[13px] font-medium text-text-primary uppercase tracking-wide-caps">{label}</div>
        {subLabel && <div className="text-xs text-text-muted mt-1">{subLabel}</div>}
      </div>
    </div>
  );
}
