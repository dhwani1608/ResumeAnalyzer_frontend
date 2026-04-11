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
       setUploads(prev => [{ id: uploadId, f: file.name, s: "parsing", c: "text-score-mid", bg: "bg-score-mid/10", icon: Loader2 }, ...prev]);
       
       try {
         await uploadResume(file, selectedJob || undefined);
         setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, s: "done", c: "text-score-high", bg: "bg-score-high/10", icon: CheckCircle2 } : u));
       } catch(e) {
         setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, s: "failed", c: "text-score-low", bg: "bg-score-low/10", icon: AlertCircle } : u));
       }
    }
  };

  return (
    <PageShell breadcrumb="Upload Resumes">
      <div className="flex flex-col items-center justify-center p-8 h-full max-w-[800px] mx-auto space-y-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-semibold tracking-tight text-text-primary">Upload Candidates</h1>
          <p className="text-text-secondary text-sm">Drop resumes here. We'll do the rest.</p>
        </div>

        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={(e) => handleFiles(e.target.files)}
          accept=".pdf,.doc,.docx,.txt"
        />

        <div className="w-full space-y-2 mb-4">
          <label className="text-sm font-medium text-text-primary">Assign to Role (Optional)</label>
          <select 
            value={selectedJob} 
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full bg-bg-surface border border-border-strong rounded px-3 py-2 text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none"
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
          className={`w-full h-[360px] border-2 border-dashed rounded bg-bg-surface hover:bg-bg-hover hover:border-accent hover:bg-accent-subtle/20 transition-all flex flex-col items-center justify-center cursor-pointer group ${isDragging ? 'border-accent bg-accent-subtle/20' : 'border-border-strong'}`}
        >
          <div className={`w-16 h-16 rounded-full bg-bg-elevated border flex items-center justify-center text-text-muted transition-colors mb-6 ${isDragging ? 'text-accent border-accent/40 bg-accent/10' : 'border-border-strong group-hover:text-accent group-hover:border-accent/40 group-hover:bg-accent/10'}`}>
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className={`text-lg font-medium tracking-tight transition-colors ${isDragging ? 'text-accent' : 'text-text-primary group-hover:text-accent'}`}>
            Select files or drag them here
          </p>
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wide-caps text-text-muted mt-4">
             <span>Single Resume</span>
             <span className="w-1 h-1 rounded-full bg-border-strong"></span>
             <span>Batch Upload (ZIP)</span>
          </div>
        </div>

        <div className="w-full space-y-3">
           <h3 className="text-[10px] font-mono tracking-wide-caps text-text-muted uppercase mb-4">Recent Uploads</h3>
           {uploads.length === 0 ? (
             <div className="text-center py-16 border border-border-strong bg-bg-surface rounded-sm">
               <p className="text-sm text-text-muted font-mono">Nothing here yet.</p>
               <button onClick={() => fileInputRef.current?.click()} className="text-sm text-accent mt-4 inline-block">Drop your first resume &rarr;</button>
             </div>
           ) : (
             uploads.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 bg-bg-surface border border-border-strong rounded-sm transition-colors hover:border-text-muted">
                 <div className="flex items-center gap-4">
                   <FileText className="w-5 h-5 text-text-muted" />
                   <div>
                     <div className="text-sm font-medium text-text-primary">{u.f}</div>
                     <div className="text-xs text-text-secondary mt-0.5 font-mono">
                       {u.s === 'parsing' ? 'Normalizing skills...' : u.s === 'failed' ? "Couldn't parse this one. Weird formatting?" : "Parsed and matched."}
                     </div>
                   </div>
                 </div>
                 <div className={`p-2 rounded-full ${u.bg} ${u.c}`}>
                   <u.icon className={`w-4 h-4 ${u.s === 'parsing' ? 'animate-spin' : ''}`} />
                 </div>
               </div>
             ))
           )}
        </div>

      </div>
    </PageShell>
  );
}
