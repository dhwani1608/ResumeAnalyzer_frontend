"use client";

import { PageShell } from "@/components/layout/PageShell";
import { StatCard } from "@/components/ui/StatCard";
import { ScorePill } from "@/components/ui/ScorePill";
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
    id: c.id,
    initials: (c.name || "U").substring(0, 2).toUpperCase(),
    name: c.name || "Unknown",
    role: "Candidate",
    score: 85
  }));

  return (
    <PageShell breadcrumb="Overview">
      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        
        {/* Top Stat Cards */}
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
              <h2 className="text-lg font-display tracking-tight font-semibold text-text-primary">Top Matches Today</h2>
              <span className="text-[10px] font-mono text-text-muted tracking-wide-caps">UPDATED 4 MIN AGO</span>
            </div>
            <div className="bg-bg-surface border border-border-strong rounded-sm overflow-hidden divide-y divide-border-strong">
              {matches.map((m: any, i: number) => (
                <div key={i} className="group p-4 flex items-center justify-between hover:bg-bg-hover transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent text-sm font-medium font-mono border border-accent/20">
                      {m.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{m.name}</div>
                      <div className="text-xs text-text-secondary mt-0.5">{m.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <ScorePill score={m.score} />
                    <Link href={`/candidates/${m.id}`} className="flex items-center gap-1 text-xs font-mono tracking-wide-caps text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Review <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Right - Pipeline Pulse & Uploads */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-display tracking-tight font-semibold text-text-primary">Pipeline Pulse</h2>
              <div className="bg-bg-surface border border-border-strong p-6 rounded-sm">
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
              <h2 className="text-lg font-display tracking-tight font-semibold text-text-primary">Recent Uploads</h2>
              <div className="space-y-2">
                {candidates.length > 0 ? candidates.slice(0, 4).map((c: any) => (
                  <Link href={`/candidates/${c.id}`} key={c.id} className="flex items-center justify-between py-2.5 px-3 bg-bg-surface border border-border-strong rounded-sm hover:border-text-muted transition-colors cursor-pointer">
                    <span className="text-xs font-mono text-text-secondary truncate block max-w-[150px]">{c.name || "resume.pdf"}</span>
                    <span className="text-[10px] tracking-wide-caps font-mono px-1.5 py-0.5 rounded text-score-high">PARSED</span>
                  </Link>
                )) : (
                  <div className="text-sm text-text-muted py-4 text-center">No recent uploads</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
