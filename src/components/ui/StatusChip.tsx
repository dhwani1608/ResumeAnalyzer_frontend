import { cn } from "@/lib/utils";

export function StatusChip({ status, className }: { status: "PARSED" | "PROCESSING" | "FAILED" | "ACTIVE" | "PAUSED" | "CLOSED", className?: string }) {
  const getStyles = (s: string) => {
    switch(s) {
      case "PARSED": return "bg-[#34C770]/10 text-[#34C770]";
      case "PROCESSING": return "bg-score-mid/10 text-score-mid";
      case "FAILED": return "bg-score-low/10 text-score-low";
      case "ACTIVE": return "bg-accent/10 text-accent";
      case "PAUSED": return "bg-bg-elevated text-text-muted";
      case "CLOSED": return "bg-transparent text-text-muted line-through border-transparent";
      default: return "bg-bg-elevated text-text-primary";
    }
  }

  return (
    <div
      className={cn(
        "inline-flex tracking-wide-caps text-[10px] items-center px-2 py-0.5 rounded-sm font-mono border border-transparent",
        status === "PARSED" || status === "PROCESSING" || status === "FAILED" ? "border-border-strong" : "",
        getStyles(status),
        className
      )}
    >
      {status}
    </div>
  );
}
