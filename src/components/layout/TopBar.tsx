import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopBar({ breadcrumb = "Dashboard", className }: { breadcrumb?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("h-20 border-b border-slate-100 flex items-center justify-between px-10 bg-white/40 backdrop-blur-xl relative z-10", className)}>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        {breadcrumb}
      </div>
      
      <div className="flex-1 max-w-md mx-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search candidates..."
            className="w-full bg-white border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
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
