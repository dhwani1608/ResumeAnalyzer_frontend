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
        "inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider",
        variant === "confirmed"
          ? "bg-gray-100 text-[var(--text-primary)] border border-gray-200"
          : "bg-transparent text-gray-400 border border-dashed border-gray-300 cursor-help",
        className
      )}
    >
      {label}
    </div>
  );
}
