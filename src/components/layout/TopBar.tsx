import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopBar({ breadcrumb = "Dashboard", className }: { breadcrumb?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("h-14 border-b border-border flex items-center justify-between px-6 bg-bg-base", className)}>
      <div className="text-sm font-medium text-text-secondary">
        {breadcrumb}
      </div>
      
      <div className="flex-1 max-w-md mx-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
          <input 
            type="text"
            placeholder="Find candidates, jobs, skills... (⌘K)"
            className="w-full bg-bg-surface border border-border-strong rounded-md py-1.5 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-score-high rounded-full border border-bg-base" />
        </button>
        <div className="w-7 h-7 rounded-full bg-accent-subtle border border-accent/20 flex items-center justify-center text-accent text-xs font-mono font-medium">
          D
        </div>
      </div>
    </div>
  );
}
