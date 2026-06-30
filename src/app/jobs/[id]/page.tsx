"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { useQuery } from "@tanstack/react-query";
import { fetchJob, fetchJobCandidates } from "@/lib/api/intelligence";
import Link from "next/link";
import { CandidateDrawer } from "@/components/candidates/CandidateDrawer";
import { cn } from "@/lib/utils";
import { UploadCloud, Plus } from "lucide-react";

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
      <div className="flex h-full overflow-hidden bg-[var(--bg-base)]">
        
        {/* Left Panel - Job Metadata */}
        <div className="w-[300px] flex-shrink-0 bg-[var(--bg-sidebar)] border-r border-white/5 flex flex-col pt-4">
          <div className="p-8 space-y-10 flex-1 overflow-y-auto">
            <div className="space-y-4">
              <h1 className="text-3xl font-mono font-bold text-[var(--text-on-dark)] tracking-tighter uppercase leading-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold tracking-widest bg-white/5 px-2.5 py-1 rounded-lg text-gray-400 border border-white/5 uppercase font-mono">{job.department || "General"}</span>
                <span className="text-[10px] font-bold tracking-widest bg-white/5 px-2.5 py-1 rounded-lg text-gray-400 border border-white/5 uppercase font-mono">REMOTE</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase font-mono">Intake Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {["Go", "PostgreSQL", "Kafka"].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-white/5 text-gray-300 uppercase tracking-widest font-mono">
                    <div className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? "bg-emerald-500" : i === 1 ? "bg-amber-500" : "bg-rose-500")}></div> {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase font-mono">Intelligence Threshold</h3>
                <span className="text-xs font-bold font-mono text-[var(--accent)]">{Math.round(threshold * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.05" 
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent)] h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">Lowering the threshold reveals broader matches within the talent pool.</p>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/5 bg-[var(--bg-sidebar)] mt-auto">
            <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-white rounded-xl transition-all font-mono">
              MODIFY JD PARAMETERS
            </button>
          </div>
        </div>

        {/* Center Panel - Kanban Pipeline */}
        <div className="flex-1 flex overflow-x-auto bg-[var(--bg-base)] p-8 gap-10 pt-10">
          {COLUMNS.map((col) => {
            const colMates = candidates.filter(c => c.column === col);
            return (
              <div key={col} className="w-[320px] flex-shrink-0 flex flex-col">
                <div className="flex justify-between items-center mb-6 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gray-500 font-mono">{col}</span>
                    <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-lg text-gray-400 border border-white/5 font-mono">{colMates.length}</span>
                  </div>
                  {col === "MATCHED" && (
                    <button title="Import Resumes" className="text-gray-500 hover:text-[var(--accent)] transition-all bg-white/5 border border-white/10 p-1.5 rounded-lg">
                      <UploadCloud className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-5 pb-8 pr-2 custom-scrollbar">
                  {colMates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate} 
                      onClick={() => setSelectedCandidate(candidate)} 
                    />
                  ))}
                  {colMates.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[var(--radius-xl)] bg-white/[0.02]">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-6 h-6 text-gray-600" />
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">No active matches</p>
                      <Link href="/upload" className="text-[10px] font-bold text-[var(--accent)] mt-4 inline-block uppercase tracking-widest hover:underline underline-offset-4">Inject Resumes &rarr;</Link>
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
