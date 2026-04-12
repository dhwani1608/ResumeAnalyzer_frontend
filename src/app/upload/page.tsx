"use client";

import { PageShell } from "@/components/layout/PageShell";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { uploadResume, fetchJobs } from "@/lib/api/intelligence";
import { useQuery } from "@tanstack/react-query";

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
      <div className="flex flex-col items-center justify-center p-8 h-full max-w-[800px] mx-auto space-y-12 font-outfit">
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900">Upload Candidates</h1>
          <p className="text-slate-500 text-sm font-medium">Drop resumes here. We'll do the rest.</p>
        </div>

        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={(e) => handleFiles(e.target.files)}
          accept=".pdf,.doc,.docx,.txt,.zip"
        />

        <div className="w-full space-y-3 mb-6">
          <label className="text-sm font-bold text-slate-900 ml-1">Assign to Role (Optional)</label>
          <select 
            value={selectedJob} 
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:border-blue-200 focus:ring-4 focus:ring-blue-50 outline-none shadow-sm transition-all"
          >
            <option value="">-- No specific role (General Pool) --</option>
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
          className={`w-full h-[360px] border-2 border-dashed rounded-3xl glass hover:border-blue-300 transition-all flex flex-col items-center justify-center cursor-pointer group shadow-xl ${isDragging ? 'border-blue-400 bg-blue-50/50' : 'border-slate-200'}`}
        >
          <div className={`w-20 h-20 rounded-2xl bg-white border shadow-sm flex items-center justify-center text-slate-400 transition-all mb-6 group-hover:scale-110 group-hover:text-blue-600 group-hover:border-blue-200 ${isDragging ? 'text-blue-600 border-blue-200 scale-110' : 'border-slate-100/50'}`}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <p className={`text-xl font-bold transition-all ${isDragging ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
            Select files or drag them here
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-6">
             <span>Single Resume</span>
             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
             <span>Batch Upload (ZIP)</span>
          </div>
        </div>

        <div className="w-full space-y-4">
           <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4 ml-1">Recent Uploads</h3>
           {uploads.length === 0 ? (
             <div className="text-center py-20 glass rounded-3xl border-white/50 shadow-sm border-dashed border-2">
               <p className="text-sm text-slate-400 font-medium italic">Nothing here yet.</p>
               <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-blue-600 mt-4 inline-flex items-center gap-2 hover:gap-3 transition-all">
                Drop your first resume &rarr;
               </button>
             </div>
           ) : (
              <div className="space-y-4">
                {uploads.map((u) => (
                   <div key={u.id} className="space-y-3">
                     <div className="flex items-center justify-between p-5 glass-card rounded-2xl border-white/50 shadow-sm transition-all">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                          <FileText className="w-5 h-5" />
                         </div>
                         <div>
                           <div className="text-sm font-bold text-slate-900">{u.f}</div>
                           <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                             {u.isBatch ? `Batch ZIP • ${u.s === 'done' ? 'Ranked top results' : 'Extracting & ranking...'}` : u.s === 'parsing' ? 'Normalizing skills...' : u.s === 'failed' ? "Couldn't parse this one." : "Parsed and matched."}
                           </div>
                         </div>
                       </div>
                       <div className={`p-2.5 rounded-full ${u.s === 'done' ? 'bg-emerald-50 text-emerald-600' : u.s === 'parsing' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                         <u.icon className={`w-4 h-4 ${u.s === 'parsing' ? 'animate-spin' : ''}`} />
                       </div>
                     </div>

                     {/* Top Candidates Ranked (If ZIP) */}
                     {u.batchResults && (
                       <div className="ml-8 space-y-2 animate-in fade-in slide-in-from-left-4 duration-500">
                         <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Matches From Batch</span>
                            <div className="h-px flex-1 bg-slate-100" />
                         </div>
                         {u.batchResults.map((r: any, idx: number) => (
                           <div key={r.candidate_id} className="flex items-center justify-between p-4 bg-white/50 border border-white rounded-xl shadow-sm transition-all hover:translate-x-1">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                                 #{idx + 1}
                               </div>
                               <div className="text-sm font-bold text-slate-900">{r.name || r.filename}</div>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  {Math.round(r.score * 100)}% Match
                                </div>
                                <Link href={`/candidates/${r.candidate_id}`} className="p-1 px-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors text-xs font-bold uppercase transition-all">
                                  View
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
