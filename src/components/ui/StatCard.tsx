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
    <div className={cn("p-7 bg-[var(--bg-surface)] rounded-[var(--radius-lg)] flex flex-col justify-between h-44 shadow-sm border border-[var(--border)] transition-all hover:shadow-md hover:translate-y-[-2px]", className)}>
      <div className="flex justify-between items-start">
        <div className={cn("text-5xl font-mono font-bold tracking-tighter text-[var(--text-primary)]", valueColor)}>{value}</div>
        {trendData && <SparkLine data={trendData} color="var(--accent)" />}
      </div>
      <div>
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">{label}</div>
        {subLabel && <div className="text-[10px] text-gray-400 mt-1 font-medium">{subLabel}</div>}
      </div>
    </div>
  );
}
