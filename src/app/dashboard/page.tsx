"use client";

import { PageShell } from "@/components/layout/PageShell";
import { StatCard } from "@/components/ui/StatCard";
import { ScorePill } from "@/components/ui/ScorePill";
import { OrbitHero } from "@/components/ui/OrbitHero";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidates, fetchJobs } from "@/lib/api/intelligence";

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
    <PageShell breadcrumb="Overview">
      <div className="p-10 max-w-[1500px] mx-auto space-y-16 relative">
        
        {/* Background Orbit Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] -mr-64 -mt-32 opacity-10 pointer-events-none">
          <OrbitHero />
        </div>

        {/* Vibrant Header Greeting */}
        <div className="flex flex-col space-y-3 relative z-10">
          <h1 className="text-6xl font-serif font-bold vibrant-text">Welcome back, Guest Scout.</h1>
          <p className="text-slate-500 font-medium text-lg ml-1">The intelligence pipeline is healthy and active.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        {/* 2-Column Split: Asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left - Top Matches */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-slate-900">Top Matches Today</h2>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">4m ago</span>
            </div>
            <div className="space-y-4">
              {matches.map((m: any, i: number) => (
                <div key={i} className="glass-card flex items-center justify-between group p-7">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl font-serif italic text-slate-400 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                      {(m.candidate_name || "U")[0]}
                    </div>
                    <div>
                      <div className="text-xl font-serif font-bold text-slate-900 mb-1">{m.candidate_name}</div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{m.job_title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Semantic Match</div>
                      <ScorePill score={Math.round(m.score * 100)} />
                    </div>
                    <Link href={`/candidates/${m.candidate_id}`} className="w-14 h-14 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Right - Pipeline Pulse & Uploads */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-slate-900">Pipeline Pulse</h2>
              <div className="glass p-6 rounded-2xl shadow-xl border-white/50">
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Applied</span>
                    <span className="font-mono text-text-primary">124</span>
                  </div>
                  <div className="w-full h-px bg-border-strong relative">
                    <span className="absolute left-1/2 -top-2 px-2 text-[10px] font-mono bg-bg-surface text-score-low -translate-x-1/2 border border-border rounded-sm">-12%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Screened</span>
                    <span className="font-mono text-text-primary">42</span>
                  </div>
                  <div className="w-full h-px bg-border-strong relative" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Interviewing</span>
                    <span className="font-mono text-text-primary">18</span>
                  </div>
                  <div className="w-full h-px bg-border-strong relative">
                    <span className="absolute left-1/2 -top-2 px-2 text-[10px] font-mono bg-bg-surface text-score-low -translate-x-1/2 border border-border rounded-sm">-50%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Offer</span>
                    <span className="font-mono text-text-primary">4</span>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-border-strong text-center">
                  <Link href="/candidates" className="text-xs font-medium font-mono tracking-tight text-score-mid hover:text-score-low transition-colors underline-offset-4 hover:underline">
                    3 candidates stalled &gt; 5 days
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-slate-900">Recent Activity</h2>
              <div className="glass-card space-y-4 p-5">
                {[
                  { action: "Resume Parsed", subject: "John Doe", time: "2m ago", icon: "📄" },
                  { action: "Match Score", subject: "Jane Smith (85%)", time: "1h ago", icon: "🎯" },
                  { action: "Job Created", subject: "Senior Frontend dev", time: "4h ago", icon: "💼" },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                      {act.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900">{act.action}</div>
                      <div className="text-xs text-slate-500 font-medium">{act.subject}</div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{act.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-slate-900">Queue Watch</h2>
              <div className="glass-card p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Processing Resumes</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">12 active</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-blue-500 to-violet-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
