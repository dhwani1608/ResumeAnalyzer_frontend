"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ScorePill } from "@/components/ui/ScorePill";
import { Users, Search, Filter, ArrowRight } from "lucide-react";
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
      <div className="p-8 max-w-[1400px] mx-auto space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold vibrant-text">Candidate Pool</h1>
            <p className="text-slate-500 font-medium">Manage and review your talent database.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search candidates..."
                className="bg-white border border-slate-200 rounded-2xl py-2 pl-10 pr-4 text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all w-64 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-20 glass rounded-3xl">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : candidates.length > 0 ? (
            candidates.map((c: any) => (
              <div key={c.id} className="glass-card group flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200 floating">
                    {(c.name || "U")[0]}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{c.name || "Unnamed Candidate"}</div>
                    <div className="text-sm text-slate-500 font-medium">{c.location || "Remote"} • {c.experience_years || 0} years exp.</div>
                    <div className="flex gap-2 mt-2">
                      {c.skills?.slice(0, 3).map((s: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-lg uppercase tracking-wider">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Match Score</div>
                    <ScorePill score={85} />
                  </div>
                  <Link href={`/candidates/${c.id}`} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 glass rounded-3xl border-dashed border-2">
              <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No candidates found in the pool.</p>
              <Link href="/upload" className="text-blue-600 font-bold mt-4 inline-block hover:underline">Upload your first resume &rarr;</Link>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
