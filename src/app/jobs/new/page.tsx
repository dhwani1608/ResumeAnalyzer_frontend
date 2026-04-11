"use client";

import { PageShell } from "@/components/layout/PageShell";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api/intelligence";
import { Loader2 } from "lucide-react";

export default function NewJobPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    try {
      const res = await createJob(description);
      router.push(`/jobs/${res.job_id}`);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <PageShell breadcrumb="Jobs / New Role">
      <div className="max-w-[800px] mx-auto p-8 pt-12">
        <h1 className="text-3xl font-display font-semibold tracking-tight text-text-primary mb-2">Create New Role</h1>
        <p className="text-text-secondary text-sm mb-8">Paste the job description below to start tracking and matching candidates.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Job Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. We are looking for a Senior Backend Engineer..."
              className="w-full h-64 p-4 text-sm bg-bg-surface border border-border-strong rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-text-secondary"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !description.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-accent text-[#0E0F11] font-medium rounded hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Create Role Tracking
          </button>
        </form>
      </div>
    </PageShell>
  );
}
