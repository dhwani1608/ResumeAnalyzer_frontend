"use client";

import { PageShell } from "@/components/layout/PageShell";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { uploadResume, uploadBatchZip, fetchJobs } from "@/lib/api/intelligence";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const { data: jobsData } = useQuery({ queryKey: ["jobs"], queryFn: fetchJobs });
  const jobs = jobsData?.jobs || [];
  const [selectedJob, setSelectedJob] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const items = Array.from(files);
    
    for (const file of items) {
       const uploadId = Math.random().toString(36).substring(7);
       const isZip = file.name.endsWith('.zip');
       
       setUploads(prev => [{ 
         id: uploadId, 
         f: file.name, 
         s: "parsing", 
         c: "text-score-mid", 
         bg: "bg-score-mid/10", 
         icon: Loader2,
         isBatch: isZip
       }, ...prev]);
       
       try {
         if (isZip) {
           const result = await uploadBatchZip(file, selectedJob || undefined);
           setUploads(prev => prev.map(u => u.id === uploadId ? { 
             ...u, 
             s: "done", 
             c: "text-score-high", 
             bg: "bg-score-high/10", 
             icon: CheckCircle2,
             batchResults: result.results.slice(0, 10) // Top 10
           } : u));
         } else {
           await uploadResume(file, selectedJob || undefined);
           setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, s: "done", c: "text-score-high", bg: "bg-score-high/10", icon: CheckCircle2 } : u));
         }
       } catch(e) {
         setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, s: "failed", c: "text-score-low", bg: "bg-score-low/10", icon: AlertCircle } : u));
       }
    }
  };

  return (
    <PageShell breadcrumb="Upload Resumes">
      <div className="flex flex-col items-center justify-center p-12 h-full max-w-[900px] mx-auto space-y-16 bg-[var(--bg-base)]">
        
        <div className="text-center space-y-4 font-mono">
          <h1 className="text-5xl font-bold tracking-tighter text-[var(--text-on-dark)] uppercase">Inject Talent</h1>
          <p className="text-gray-500 text-lg font-medium">Batch process resumes with instant AI ranking.</p>
        </div>

        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={(e) => handleFiles(e.target.files)}
          accept=".pdf,.doc,.docx,.txt,.zip"
        />

        <div className="w-full space-y-4">
          <label className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase font-mono ml-4">Target Intelligence Profile</label>
          <select 
            value={selectedJob} 
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full bg-[var(--bg-sidebar)] border border-white/5 rounded-[var(--radius-lg)] px-6 py-4 text-sm text-[var(--text-on-dark)] focus:border-[var(--accent)] outline-none shadow-xl transition-all font-mono"
          >
            <option value="">-- GENERAL TALENT POOL --</option>
            {jobs.map((j: any) => (
              <option key={j.id} value={j.id}>{j.role || j.title}</option>
            ))}
          </select>
        </div>

        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
          className={cn(
            "w-full h-[360px] border-2 border-dashed rounded-[var(--radius-xl)] flex flex-col items-center justify-center cursor-pointer group transition-all duration-500",
            isDragging 
              ? "border-[var(--accent)] bg-[var(--accent)]/5 scale-[1.02]" 
              : "border-white/5 bg-[var(--bg-sidebar)]/50 hover:bg-[var(--bg-sidebar)] hover:border-white/10"
          )}
        >
          <div className={cn(
            "w-20 h-20 rounded-[var(--radius-lg)] bg-[var(--bg-sidebar)] flex items-center justify-center transition-all duration-500 border border-white/5 shadow-2xl group-hover:scale-110 group-hover:border-[var(--accent)]/30",
            isDragging ? "text-[var(--accent)] border-[var(--accent)]" : "text-gray-500"
          )}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <p className={cn(
            "text-2xl font-bold mt-8 transition-all duration-500 uppercase tracking-tight font-mono",
            isDragging ? "text-[var(--accent)]" : "text-gray-400 group-hover:text-white"
          )}>
            Ship resumes manually or drag here
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mt-8 font-mono">
             <span>RESUME (.PDF)</span>
             <span className="w-1.5 h-1.5 rounded-full bg-white/5"></span>
             <span>BATCH (.ZIP)</span>
          </div>
        </div>

        <div className="w-full space-y-6">
           <div className="flex items-center justify-between px-4">
             <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase font-mono">Processing Queue</h3>
             <span className="text-[10px] font-bold text-gray-600 font-mono italic">AI Orchestrator Active</span>
           </div>
           
           {uploads.length === 0 ? (
             <div className="text-center py-24 bg-[var(--bg-sidebar)]/30 rounded-[var(--radius-xl)] border-2 border-dashed border-white/5">
                <p className="text-gray-600 font-bold uppercase tracking-widest font-mono text-xs text-opacity-40">No active telemetry</p>
             </div>
           ) : (
              <div className="space-y-6">
                {uploads.map((u) => (
                   <div key={u.id} className="space-y-4">
                     <div className="flex items-center justify-between p-6 bg-[var(--bg-surface)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm group hover:shadow-xl transition-all">
                       <div className="flex items-center gap-5">
                         <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-[var(--bg-sidebar)] group-hover:text-white transition-all">
                           <FileText className="w-6 h-6" />
                         </div>
                         <div>
                           <div className="text-base font-bold text-[var(--text-primary)]">{u.f}</div>
                           <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest font-mono">
                             {u.isBatch ? "BATCH_CARGO_EXTRACTING" : u.s === "parsing" ? "CORE_NORMALIZATION_RUNNING" : "PROCESSING_STABLE"}
                           </div>
                         </div>
                       </div>
                       <div className={cn(
                         "p-3 rounded-full transition-all duration-500",
                         u.s === 'done' ? 'bg-emerald-50 text-emerald-600' : 
                         u.s === 'parsing' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                       )}>
                         <u.icon className={cn("w-5 h-5", u.s === 'parsing' && 'animate-spin')} />
                       </div>
                     </div>

                     {u.batchResults && (
                       <div className="ml-12 space-y-3 animate-in fade-in slide-in-from-left-6 duration-700">
                          <div className="flex items-center gap-4 mb-4">
                             <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest font-mono">Top Matches Deciphered</span>
                             <div className="h-px flex-1 bg-white/5" />
                          </div>
                          {u.batchResults.map((r: any, idx: number) => (
                            <div key={r.candidate_id} className="flex items-center justify-between p-5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm hover:translate-x-2 transition-all">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[var(--bg-sidebar)] text-white flex items-center justify-center text-[11px] font-bold font-mono">
                                  {idx + 1}
                                </div>
                                <div className="text-sm font-bold text-[var(--text-primary)]">{r.name || r.filename}</div>
                              </div>
                              <div className="flex items-center gap-6">
                                 <div className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent)]/5 px-3 py-1 rounded-full border border-[var(--accent)]/10 font-mono">
                                   {Math.round(r.score * 100)}% MATCH
                                 </div>
                                 <Link href={`/candidates/${r.candidate_id}`} className="text-[10px] font-mono font-bold text-gray-400 hover:text-[var(--accent)] uppercase tracking-widest transition-all">
                                   PROFILE &rarr;
                                 </Link>
                              </div>
                            </div>
                          ))}
                       </div>
                     )}
                   </div>
                ))}
              </div>
           )}
        </div>
      </div>
    </PageShell>
  );
}
