"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { useQuery } from "@tanstack/react-query";
import { fetchJob, fetchJobCandidates } from "@/lib/api/intelligence";
import Link from "next/link";
import { CandidateDrawer } from "@/components/candidates/CandidateDrawer";
import { UploadCloud } from "lucide-react";

const COLUMNS = ["MATCHED", "REVIEWING", "SHORTLISTED", "INTERVIEWING", "OFFER"];

export default function JobDetail({ params }: { params: { id: string } }) {
  const { data: jobData } = useQuery({ queryKey: ["jobs", params.id], queryFn: () => fetchJob(params.id) });
  const { data: candidatesData } = useQuery({ queryKey: ["jobs", params.id, "candidates"], queryFn: () => fetchJobCandidates(params.id) });

  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [threshold, setThreshold] = useState(0.65);

  useEffect(() => {
    if (candidatesData?.candidates) {
      setCandidates(candidatesData.candidates);
    }
  }, [candidatesData]);

  const job = jobData?.job || { title: "Loading...", department: "" };

  return (
    <PageShell breadcrumb={`Jobs / ${job.title}`}>
      <div className="flex h-full overflow-hidden">
        
        {/* Left Panel - Job Metadata */}
        <div className="w-[280px] flex-shrink-0 bg-bg-surface border-r border-border-strong flex flex-col pt-2">
          <div className="p-6 space-y-8 flex-1 overflow-y-auto">
            <div>
              <h1 className="text-xl font-display font-semibold text-text-primary tracking-tight">{job.title}</h1>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] font-mono tracking-wide-caps bg-bg-elevated px-2 py-0.5 rounded text-text-secondary border border-border-strong">{job.department || "General"}</span>
                <span className="text-[10px] font-mono tracking-wide-caps bg-bg-elevated px-2 py-0.5 rounded text-text-secondary border border-border-strong">Remote</span>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono tracking-wide-caps text-text-muted mb-3 uppercase">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-bg-elevated px-2 py-1 rounded text-xs border border-border-strong text-text-primary">
                  <div className="w-1.5 h-1.5 rounded-full bg-score-high"></div> Go
                </div>
                <div className="flex items-center gap-1.5 bg-bg-elevated px-2 py-1 rounded text-xs border border-border-strong text-text-primary">
                  <div className="w-1.5 h-1.5 rounded-full bg-score-mid"></div> PostgreSQL
                </div>
                <div className="flex items-center gap-1.5 bg-bg-elevated px-2 py-1 rounded text-xs border border-border-strong text-text-primary">
                  <div className="w-1.5 h-1.5 rounded-full bg-score-low"></div> Kafka
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-mono tracking-wide-caps text-text-muted uppercase">Match Threshold</h3>
                <span className="text-xs font-mono text-accent">{threshold}</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.05" 
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
          </div>
          
          <div className="p-5 border-t border-border-strong bg-bg-base mt-auto">
            <button className="w-full py-2 border border-border-strong bg-bg-surface hover:bg-bg-hover text-sm font-medium text-text-primary rounded-md transition-colors">
              Edit JD
            </button>
          </div>
        </div>

        {/* Center Panel - Kanban Pipeline */}
        <div className="flex-1 flex overflow-x-auto bg-bg-base p-6 gap-6 pt-8">
          {COLUMNS.map((col) => {
            const colMates = candidates.filter(c => c.column === col);
            return (
              <div key={col} className="w-[300px] flex-shrink-0 flex flex-col">
                <div className="flex justify-between items-center mb-5 uppercase tracking-wide-caps">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium text-text-secondary">{col}</span>
                    <span className="text-[10px] font-mono bg-bg-surface px-1.5 py-0.5 rounded text-text-muted border border-border-strong">{colMates.length}</span>
                  </div>
                  {col === "MATCHED" && (
                    <button title="Import Resumes" className="text-text-secondary hover:text-accent transition-colors bg-bg-surface border border-border-strong p-1 rounded">
                      <UploadCloud className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pb-6 pr-2">
                  {colMates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate} 
                      onClick={() => setSelectedCandidate(candidate)} 
                    />
                  ))}
                  {colMates.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-border-strong rounded-sm bg-bg-surface/50">
                      <p className="text-sm text-text-muted font-mono">No candidates yet.</p>
                      <p className="text-sm text-text-muted mt-1">Upload some resumes or lower the match threshold.</p>
                      <Link href="/upload" className="text-sm text-accent mt-4 inline-block">Upload resumes &rarr;</Link>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Drawer mounted statically but animated via AnimatePresence */}
      <CandidateDrawer 
        candidate={selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
      />
    </PageShell>
  );
}
