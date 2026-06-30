"use client";

import { PageShell } from "@/components/layout/PageShell";
import { StatusChip } from "@/components/ui/StatusChip";
import { ScorePill } from "@/components/ui/ScorePill";
import { Plus, UploadCloud, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api/intelligence";

export default function JobsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const jobs = data?.jobs || [];

  return (
    <PageShell breadcrumb="Pipeline Jobs">
      <div className="p-12 max-w-[1500px] mx-auto space-y-12 bg-[var(--bg-base)]">
        
        <div className="flex items-center justify-between px-4">
          <div className="space-y-3 font-mono">
            <h1 className="text-5xl font-bold tracking-tighter text-[var(--text-on-dark)] uppercase">Mission Control</h1>
            <p className="text-gray-500 font-medium text-lg">Orchestrating the intelligence pipeline for active talent intake.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/upload" className="flex items-center gap-2 px-6 py-4 text-xs font-bold text-gray-400 bg-[var(--bg-sidebar)] border border-white/5 rounded-[var(--radius-lg)] hover:bg-[var(--bg-sidebar)]/80 hover:text-white transition-all font-mono uppercase tracking-widest shadow-2xl">
              <UploadCloud className="w-5 h-5" />
              JD_INJECTION
            </Link>
            <Link href="/jobs/new" className="flex items-center gap-2 px-6 py-4 text-xs font-bold bg-[var(--accent)] text-[var(--bg-sidebar)] hover:bg-[var(--accent)]/90 rounded-[var(--radius-lg)] transition-all shadow-3xl font-mono uppercase tracking-widest">
              <Plus className="w-5 h-5" />
              NEW_MISSION
            </Link>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] rounded-[var(--radius-xl)] shadow-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#111] text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold font-mono border-b border-white/5">
              <tr>
                <th className="px-10 py-6">ROLE_TARGET</th>
                <th className="px-10 py-6 text-center">DEPT_VECTOR</th>
                <th className="px-10 py-6 text-right">POOL_SIZE</th>
                <th className="px-10 py-6">ELITE_MATCH</th>
                <th className="px-10 py-6 text-center">MEAN_COHORT</th>
                <th className="px-10 py-6 text-center">STATUS</th>
                <th className="px-10 py-6 text-right">TELEMETRY_AGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] font-mono">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-10 py-32 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-[var(--accent)] mb-6" />
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em]">Hydrating intelligence profiles...</span>
                  </td>
                </tr>
              )}
              {!isLoading && jobs.map((job: any) => (
                <tr key={job.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                  <td className="px-10 py-7">
                    <Link href={`/jobs/${job.id}`} className="font-bold text-[var(--text-primary)] flex items-center h-full w-full text-lg group-hover:translate-x-1 transition-all">
                      <span className={job.status === 'CLOSED' ? 'line-through text-gray-400 font-normal' : ''}>{job.role}</span>
                    </Link>
                  </td>
                  <td className="px-10 py-7 text-gray-500 font-bold text-center text-xs uppercase tracking-widest">{job.dept}</td>
                  <td className="px-10 py-7 text-right text-[var(--text-primary)] font-bold text-lg">{job.candidates}</td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-4">
                      <span className="text-[var(--text-primary)] font-bold text-sm">{job.topMatch.name}</span>
                      <ScorePill score={job.topMatch.score} />
                    </div>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <span className="text-[var(--accent)] font-bold bg-[var(--accent)]/5 px-3 py-1 rounded-full border border-[var(--accent)]/10 text-xs">{job.avgScore}%</span>
                  </td>
                  <td className="px-10 py-7 text-center">
                    <StatusChip status={job.status as any} />
                  </td>
                  <td className="px-10 py-7 text-right text-gray-400 font-bold text-[10px] uppercase tracking-tighter">{job.posted}</td>
                </tr>
              ))}
              {!isLoading && jobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-10 py-32 text-center">
                    <div className="space-y-6">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">The intake pipeline is stagnant.</p>
                      <Link href="/jobs/new" className="text-xs font-bold text-[var(--accent)] hover:underline underline-offset-8 uppercase tracking-[0.2em]">INITIATE_ROLE_SEQUENCE &rarr;</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
