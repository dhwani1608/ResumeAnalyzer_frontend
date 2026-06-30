"use client";

import { PageShell } from "@/components/layout/PageShell";
import { StatCard } from "@/components/ui/StatCard";
import { ScorePill } from "@/components/ui/ScorePill";
import { OrbitHero } from "@/components/ui/OrbitHero";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidates, fetchJobs } from "@/lib/api/intelligence";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: jobsData, isLoading: jobsLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const { data: candidatesData } = useQuery({ queryKey: ["candidates"], queryFn: fetchCandidates });
  
  const jobs = jobsData?.jobs || [];
  const candidates = candidatesData?.candidates || [];
  
  const stats: Array<{ label: string; subLabel?: string; value: string; valueColor?: string; trend: number[] }> = [
    { label: "Active Roles", value: jobsLoading ? "-" : jobs.length.toString(), trend: [40, 42, 41, 45, 46, 47, jobs.length] },
    { label: "Candidates Tracked", value: candidates.length.toString(), trend: [1100, 1120, 1150, 1180, 1190, 1200, candidates.length] },
    { label: "Awaiting Rev.", value: "8", trend: [10, 8, 9, 8, 8, 8, 8] },
    { label: "Ghosts", subLabel: "(no response)", value: "3", valueColor: "text-score-low", trend: [1, 2, 2, 3, 3, 3, 3] },
  ];

  const matches = candidates.slice(0, 4).map((c: any) => ({
    candidate_id: c.id,
    candidate_name: c.name || "Unknown Candidate",
    job_title: c.summary?.substring(0, 30) + "..." || "Candidate",
    score: c.match_score || 0.85
  }));

  return (
    <PageShell breadcrumb="Dashboard Overview">
      <div className="p-10 max-w-[1600px] mx-auto space-y-12 relative">
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] -mr-64 -mt-32 opacity-[0.03] pointer-events-none">
          <OrbitHero />
        </div>

        {/* Header Greeting */}
        <div className="flex flex-col space-y-2 relative z-10">
          <h1 className="text-5xl font-mono font-bold text-[var(--text-on-dark)] tracking-tighter">Welcome back, <span className="text-[var(--accent)]">Guest Scout</span>.</h1>
          <p className="text-gray-500 font-medium text-lg">Your talent pipeline is currently tracking 47 active candidates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard 
              key={i} 
              label={s.label} 
              subLabel={s.subLabel} 
              value={s.value} 
              trendData={s.trend} 
              valueColor={s.valueColor} 
            />
          ))}
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Left - Top Matches */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-mono font-bold text-[var(--text-on-dark)] uppercase tracking-widest">Top Market Matches</h2>
              <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase font-mono">Real-time sync</span>
            </div>
            <div className="space-y-4">
              {matches.map((m: any, i: number) => (
                <div key={i} className="glass-card flex items-center justify-between group p-6 border-transparent hover:border-amber-500/10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-sidebar)] transition-all duration-300">
                      {(m.candidate_name || "U")[0]}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[var(--text-primary)] mb-0.5">{m.candidate_name}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">{m.job_title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">Match Reliability</div>
                      <ScorePill score={Math.round(m.score * 100)} />
                    </div>
                    <Link href={`/candidates/${m.candidate_id}`} className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[var(--bg-sidebar)] group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Right */}
          <div className="lg:col-span-4 flex flex-col space-y-10">
            <div className="space-y-4">
              <h2 className="text-lg font-mono font-bold text-[var(--text-on-dark)] uppercase tracking-widest px-2">Pipeline Pulse</h2>
              <div className="bg-[var(--bg-surface)] p-8 rounded-[var(--radius-xl)] shadow-sm border border-[var(--border)]">
                <div className="space-y-6">
                  {[
                    { label: "Applied", val: "124", trend: "-12%" },
                    { label: "Screened", val: "42", trend: "0%" },
                    { label: "Interview", val: "18", trend: "-50%" },
                    { label: "Offer", val: "4", trend: "+5%" },
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center text-sm mb-3">
                        <span className="text-gray-500 font-medium">{row.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">{row.trend}</span>
                          <span className="font-mono font-bold text-[var(--text-primary)]">{row.val}</span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-[var(--accent)] h-full opacity-30" style={{ width: `${Math.random() * 60 + 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-mono font-bold text-[var(--text-on-dark)] uppercase tracking-widest px-2">Recent Events</h2>
              <div className="glass-card space-y-5 p-6 border-transparent">
                {[
                  { action: "Resume Parsed", subject: "John Doe", time: "2m", color: "bg-emerald-500" },
                  { action: "High Match", subject: "Jane Smith", time: "1h", color: "bg-amber-500" },
                  { action: "Job Scaled", subject: "Frontend Lead", time: "4h", color: "bg-blue-500" },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={cn("w-2 h-2 rounded-full", act.color)} />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[var(--text-primary)]">{act.action}</div>
                      <div className="text-xs text-gray-500 font-medium">{act.subject}</div>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 font-mono uppercase">{act.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
