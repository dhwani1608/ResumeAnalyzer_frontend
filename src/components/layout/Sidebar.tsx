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
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={cn("w-[240px] flex-shrink-0 flex flex-col h-screen border-r border-border bg-bg-base", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-accent text-xl font-bold">T/</span>
          <span className="font-display font-semibold text-lg tracking-tight">TalentOS</span>
        </Link>
      </div>
      
      <div className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-[10px] px-4 py-2 rounded-md mx-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-bg-hover text-text-primary [&>svg]:text-accent' 
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border-strong mt-auto space-y-4">
        {session?.user && (
          <div className="flex items-center gap-3 px-2 py-3 bg-bg-elevated rounded-md border border-border-strong">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-mono">
              {session.user.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-text-primary truncate">{session.user.name}</div>
              <div className="text-[10px] text-text-muted truncate">{session.user.email}</div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="flex w-full items-center gap-[10px] px-3 py-2 rounded-md text-xs font-medium text-text-muted hover:bg-score-low/10 hover:text-score-low transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>

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
