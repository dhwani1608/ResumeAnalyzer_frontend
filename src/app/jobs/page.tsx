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
    <PageShell breadcrumb="Jobs">
      <div className="p-8 max-w-[1400px] mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-semibold text-text-primary tracking-tight">Active Roles</h1>
          <div className="flex items-center gap-3">
            <Link href="/upload" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary hover:text-text-primary bg-bg-surface border border-border-strong rounded-md hover:bg-bg-hover transition-colors">
              <UploadCloud className="w-4 h-4" />
              Upload JD
            </Link>
            <Link href="/jobs/new" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent text-[#0E0F11] hover:bg-accent-hover rounded-md transition-colors">
              <Plus className="w-4 h-4" />
              New Role
            </Link>
          </div>
        </div>

        <div className="border border-border-strong rounded-sm bg-bg-surface overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-base/50 text-text-secondary text-[11px] uppercase tracking-wide-caps font-medium border-b border-border-strong">
              <tr>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Dept</th>
                <th className="px-6 py-4 text-right">Candidates</th>
                <th className="px-6 py-4">Top Match</th>
                <th className="px-6 py-4 text-center">Avg Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-strong">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center border-t-0">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-text-muted mb-4" />
                    <span className="text-text-secondary text-sm">Loading active roles...</span>
                  </td>
                </tr>
              )}
              {!isLoading && jobs.map((job: any) => (
                <tr key={job.id} className="hover:bg-bg-hover transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <Link href={`/jobs/${job.id}`} className="font-medium text-text-primary flex items-center h-full w-full">
                      <span className={job.status === 'CLOSED' ? 'line-through text-text-secondary font-normal' : ''}>{job.role}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{job.dept}</td>
                  <td className="px-6 py-4 font-mono text-right text-text-primary">{job.candidates}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-text-primary font-medium">{job.topMatch.name}</span>
                      <ScorePill score={job.topMatch.score} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-text-secondary">{job.avgScore}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusChip status={job.status as any} />
                  </td>
                  <td className="px-6 py-4 text-right text-text-muted font-mono text-xs">{job.posted}</td>
                </tr>
              ))}
              {!isLoading && jobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center border-t-0">
                    <div className="text-center py-16">
                      <p className="text-sm text-text-muted font-mono">No active roles.</p>
                      <p className="text-sm text-text-muted mt-1">Either you&apos;re very good at hiring, or you haven&apos;t added any yet.</p>
                      <Link href="/jobs/new" className="text-sm text-accent mt-4 inline-block">+ Add a role &rarr;</Link>
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
