"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ScorePill } from "@/components/ui/ScorePill";
import { Users, Search, Filter, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidates } from "@/lib/api/intelligence";

export default function CandidatesPage() {
  const { data, isLoading } = useQuery({ 
    queryKey: ["candidates"], 
    queryFn: fetchCandidates 
  });
  
  const candidates = data?.candidates || [];

  return (
    <PageShell breadcrumb="Candidates">
      <div className="p-12 max-w-[1500px] mx-auto space-y-12 bg-[var(--bg-base)]">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 font-mono">
            <h1 className="text-5xl font-bold tracking-tighter text-[var(--text-on-dark)] uppercase">Talent Reservoir</h1>
            <p className="text-gray-500 font-medium text-lg">Inventory of {candidates.length} processed high-potential scouts.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[var(--accent)] transition-colors" />
              <input 
                type="text" 
                placeholder="PROBE CANDIDATES..."
                className="bg-[var(--bg-sidebar)] border border-white/5 rounded-[var(--radius-lg)] py-3.5 pl-12 pr-6 text-sm text-white focus:border-[var(--accent)] outline-none transition-all w-72 shadow-2xl font-mono"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3.5 bg-[var(--bg-sidebar)] border border-white/5 rounded-[var(--radius-lg)] text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:bg-[var(--bg-sidebar)]/80 hover:text-white transition-all shadow-xl font-mono">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center p-32 bg-[var(--bg-sidebar)]/30 border border-dashed border-white/5 rounded-[var(--radius-xl)]">
              <Loader2 className="w-10 h-10 text-[var(--accent)] animate-spin" />
            </div>
          ) : candidates.length > 0 ? (
            candidates.map((c: any) => (
              <div key={c.id} className="bg-[var(--bg-surface)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm group hover:shadow-2xl transition-all flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-[var(--radius-lg)] bg-[var(--bg-sidebar)] flex items-center justify-center text-[var(--accent)] text-2xl font-bold border border-white/5 group-hover:scale-105 transition-all">
                    {(c.name || "U")[0]}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--bg-sidebar)] transition-colors mb-1">{c.name || "Unnamed Candidate"}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">{c.location || "REMOTE"} • {c.experience_years || 0} YRS_EXP.</div>
                    <div className="flex gap-2 mt-4">
                      {c.skills?.slice(0, 4).map((s: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 text-[9px] font-bold text-gray-500 rounded-lg uppercase tracking-widest font-mono border border-gray-100">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 font-mono">Match Intelligence</div>
                    <ScorePill score={c.match_score ? Math.round(c.match_score * 100) : 85} />
                  </div>
                  <Link href={`/candidates/${c.id}`} className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--bg-sidebar)] border border-white/5 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-[var(--bg-sidebar)] transition-all shadow-2xl">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-[var(--bg-sidebar)]/30 border-dashed border-2 border-white/5 rounded-[var(--radius-xl)]">
              <Users className="w-16 h-16 text-gray-700 mx-auto mb-6 opacity-20" />
              <p className="text-gray-500 font-bold uppercase tracking-widest font-mono text-sm">Talent pipeline depleted.</p>
              <Link href="/upload" className="text-[var(--accent)] font-bold mt-6 inline-block hover:underline uppercase tracking-widest font-mono text-xs">Inject New Biomass &rarr;</Link>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
