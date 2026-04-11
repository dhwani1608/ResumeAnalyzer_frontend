import { cn } from "@/lib/utils";

export function SkillTag({
  label,
  variant = "confirmed",
  tooltip,
  className,
}: {
  label: string;
  variant?: "confirmed" | "inferred";
  tooltip?: string;
  className?: string;
}) {
  return (
    <div
      title={tooltip}
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md",
        variant === "confirmed"
          ? "bg-tag-bg text-text-primary border border-tag-border"
          : "bg-transparent text-text-secondary border border-dashed border-text-muted cursor-help",
        className
      )}
    >
      {label}
    </div>
  );
}
