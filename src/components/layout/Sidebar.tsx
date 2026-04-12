'use client';

import Link from 'next/link';
import { Home, Briefcase, Users, Upload, Layers, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Jobs', href: '/jobs', icon: Briefcase },
    { label: 'Candidates', href: '/candidates', icon: Users },
    { label: 'Upload', href: '/upload', icon: Upload },
    { label: 'Taxonomy', href: '/taxonomy', icon: Layers },
  ];

  return (
    <div className={cn("w-[260px] flex-shrink-0 flex flex-col h-screen border-r border-slate-100 bg-white/40 backdrop-blur-xl relative z-20", className)}>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-mono text-sm font-bold group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            T/
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">TalentOS</span>
        </Link>
      </div>
      
      <div className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl mx-2 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50' 
                  : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border-strong mt-auto space-y-4">
        <div className="flex items-center gap-3 px-3 py-3 bg-white/50 rounded-2xl border border-white shadow-sm ring-1 ring-slate-200/50">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold border border-blue-100 italic font-serif">
            G
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">Guest User</div>
            <div className="text-[10px] text-slate-400 truncate font-medium">Anonymous Session</div>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-[10px] font-mono text-text-muted mb-2 tracking-wide-caps uppercase">Pipeline</div>
          <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-2">
            <div className="bg-score-high w-1/2" />
            <div className="bg-score-mid w-1/3" />
            <div className="bg-score-low w-1/6" />
          </div>
          <div className="text-xs text-text-secondary">47 active</div>
        </div>
      </div>
    </div>
  );
}
