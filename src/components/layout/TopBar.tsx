import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopBar({ breadcrumb = "Dashboard", className }: { breadcrumb?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[var(--bg-sidebar)]/80 backdrop-blur-xl relative z-30", className)}>
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">
        {breadcrumb}
      </div>
      
      <div className="flex-1 max-w-md mx-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" />
          <input 
            type="text"
            placeholder="Search resources..."
            className="w-full bg-[var(--bg-surface)] border border-transparent rounded-2xl py-2.5 pl-11 pr-4 text-sm text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-[var(--text-on-dark)] transition-colors cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-sidebar)]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-sidebar)] text-xs font-bold border border-amber-500/20 shadow-lg shadow-amber-500/20">
          D
        </div>
      </div>
    </div>
  );
}
