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
    <div className={cn("w-[260px] flex-shrink-0 flex flex-col h-screen bg-[var(--bg-sidebar)] border-r border-white/5 relative z-20", className)}>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg-sidebar)] font-mono text-sm font-bold group-hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-amber-900/20">
            T/
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[var(--text-on-dark)]">TalentOS</span>
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
                  ? 'bg-[var(--accent)] text-[var(--bg-sidebar)] shadow-lg shadow-amber-900/40' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-[var(--text-on-dark)]'
              }`}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-[var(--bg-sidebar)]" : "text-gray-500")} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-[var(--accent)] text-xs font-bold border border-amber-500/20 italic font-serif">
            G
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[var(--text-on-dark)] truncate">Guest User</div>
            <div className="text-[10px] text-gray-500 truncate font-medium">Anonymous Session</div>
          </div>
        </div>

        <div className="pt-2 px-2">
          <div className="text-[10px] font-mono text-gray-600 mb-2 tracking-wide-caps uppercase">Pipeline Status</div>
          <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-2 bg-white/5">
            <div className="bg-emerald-500 w-1/2" />
            <div className="bg-amber-500 w-1/3" />
            <div className="bg-rose-500 w-1/6" />
          </div>
          <div className="text-[10px] text-gray-500">47 active candidates</div>
        </div>
      </div>
    </div>
  );
}
