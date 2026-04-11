"use client";

import { PageShell } from "@/components/layout/PageShell";
import { CandidateTimeline } from "@/components/candidates/CandidateTimeline";
import { SkillRadar } from "@/components/candidates/SkillRadar";
import { SkillTag } from "@/components/ui/SkillTag";
import { ScorePill } from "@/components/ui/ScorePill";
import { StatusChip } from "@/components/ui/StatusChip";
import { Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidateSkills, fetchCandidate } from "@/lib/api/intelligence";

export default function CandidateProfile({ params }: { params: { id: string } }) {
  const { data: skillsData, isLoading: skillsLoading } = useQuery({ queryKey: ["candidates", params.id, "skills"], queryFn: () => fetchCandidateSkills(params.id) });
  const { data: candidateData, isLoading: candLoading } = useQuery({ queryKey: ["candidates", params.id], queryFn: () => fetchCandidate(params.id) });
  
  const fetchedCandidate = candidateData?.candidate || {};
  const { name, email, raw_text } = fetchedCandidate;
  const isReady = !skillsLoading && !candLoading;

  // We rely on fallback store or db structure, assume basic parsing format if available
  const parsed = candidateData?.candidate?.processed_resume || {
    personalInfo: { title: "Candidate", location: "Remote" },
    summary: raw_text ? raw_text.substring(0, 150) + "..." : "No summary available.",
    workExperience: [],
    education: []
  };

  const expMapped = (parsed.workExperience || []).map((e: any) => ({
    company: e.company || "Unknown Company",
    role: e.title || "Employee",
    dates: e.years || "",
    description: Array.isArray(e.description) ? e.description.join(" ") : (e.description || ""),
    skills: []
  }));

  const candidate = {
    name: name || "Unknown Candidate",
    email: email || "No email",
    location: parsed.personalInfo?.location || "",
    title: parsed.personalInfo?.title || "Candidate",
    summary: parsed.summary || "",
    skills: skillsData?.skills || [],
    implied_skills: skillsData?.implied_skills || [],
    experiences: expMapped,
    education: parsed.education || []
  };

  return (
    <PageShell breadcrumb={`Candidates / ${candidate.name}`}>
      <div className="flex flex-col lg:flex-row h-full overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border-strong bg-bg-surface">
        
        {/* Left - Resume View (40%) */}
        <div className="w-full lg:w-[45%] flex-shrink-0 lg:h-full overflow-y-auto p-10 space-y-12">
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-display font-semibold text-text-primary tracking-tight">{candidate.name}</h1>
                <div className="text-sm text-text-secondary mt-1 tracking-tight">{candidate.title} &bull; {candidate.location} &bull; {candidate.email}</div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 text-xs px-3 py-1.5 border border-border-strong rounded-sm hover:bg-bg-hover transition-colors font-medium">
                  <Download className="w-3.5 h-3.5" />
                  TXT
                </button>
              </div>
            </div>
            
            <p className="text-[14px] text-text-primary leading-relaxed pt-2">
              {candidate.summary}
            </p>
          </div>

          <div>
            <h2 className="text-[10px] font-mono text-text-muted mb-6 uppercase tracking-wide-caps border-b border-border-strong pb-3">Experience</h2>
            <CandidateTimeline experiences={candidate.experiences} />
          </div>

          <div>
             <h2 className="text-[10px] font-mono text-text-muted mb-6 uppercase tracking-wide-caps border-b border-border-strong pb-3">Education</h2>
             <div className="space-y-4">
                {candidate.education.length > 0 ? candidate.education.map((edu: any, i: number) => (
                  <div key={i} className="pl-6 border-l-[3px] border-border-strong rounded-sm rounded-l-none">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-[15px] font-semibold text-text-primary tracking-tight">{edu.institution}</h4>
                      <span className="text-xs font-mono text-text-muted">{edu.years}</span>
                    </div>
                    <div className="text-[13px] font-medium text-text-secondary blur-0">{edu.degree} {edu.description && `• ${edu.description}`}</div>
                  </div>
                )) : (
                  <div className="text-sm font-mono text-text-muted">No education found.</div>
                )}
             </div>
          </div>
        </div>

        {/* Right - Intelligence Panel (60%) */}
        <div className="flex-1 lg:h-full bg-bg-base overflow-y-auto p-10 space-y-10">
          
          {/* Score Summary */}
          <div className="flex items-center gap-6 bg-bg-surface p-6 rounded-sm border border-border-strong">
             <div>
               <ScorePill score={82} />
             </div>
             <div>
               <h3 className="text-xl font-display tracking-tight text-text-primary font-semibold">Matched Candidate Profile</h3>
               <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed">System has parsed {candidate.skills.length} core technical skills from this resume. Analysis indicates readiness for screening.</p>
             </div>
          </div>

          {/* Radar & Skills Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-mono tracking-wide-caps text-text-secondary uppercase">Skill Distribution</h3>
              <div className="border border-border-strong rounded-sm bg-bg-surface py-6">
                 <SkillRadar />
              </div>
            </div>
            
            <div className="space-y-8">
               <div className="space-y-4">
                 <h3 className="text-[10px] font-mono tracking-wide-caps text-text-secondary uppercase border-b border-border-strong pb-2">Confirmed Skills</h3>
                 <div className="flex flex-wrap gap-2">
                   {!isReady ? <Loader2 className="w-4 h-4 animate-spin text-text-muted" /> : candidate.skills.map((s: string) => <SkillTag key={s} label={s} variant="confirmed" />)}
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-[10px] font-mono tracking-wide-caps text-text-secondary uppercase border-b border-border-strong pb-2">Inferred Skills</h3>
                 <div className="flex flex-wrap gap-2">
                   {!isReady ? <Loader2 className="w-4 h-4 animate-spin text-text-muted" /> : candidate.implied_skills.map((item: any) => (
                      <SkillTag key={item.s} label={item.s} variant="inferred" tooltip={item.t} />
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Match History */}
          <div className="space-y-4">
             <div className="flex justify-between items-center border-b border-border-strong pb-2">
               <h3 className="text-[10px] font-mono tracking-wide-caps text-text-secondary uppercase">Match History</h3>
               <button className="text-[10px] font-mono tracking-wide-caps font-medium text-accent hover:text-accent-hover transition-colors">RUN ANALYSIS</button>
             </div>
             
             <div className="border border-border-strong rounded-sm bg-bg-surface overflow-hidden">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-bg-base/50 text-text-secondary text-[10px] uppercase font-mono tracking-wide-caps border-b border-border-strong">
                    <tr>
                      <th className="px-5 py-3.5">Role</th>
                      <th className="px-5 py-3.5">Score</th>
                      <th className="px-5 py-3.5">Current Stage</th>
                      <th className="px-5 py-3.5 text-right">Matched On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-strong">
                    <tr className="hover:bg-bg-hover transition-colors">
                      <td className="px-5 py-3 font-medium text-text-primary">Senior Backend Engineer</td>
                      <td className="px-5 py-3"><ScorePill score={82} /></td>
                      <td className="px-5 py-3"><StatusChip status="ACTIVE" /></td>
                      <td className="px-5 py-3 font-mono text-xs text-text-muted text-right">Oct 12</td>
                    </tr>
                    <tr className="hover:bg-bg-hover transition-colors">
                      <td className="px-5 py-3 font-medium text-text-primary">DevOps Engineer</td>
                      <td className="px-5 py-3"><ScorePill score={55} /></td>
                      <td className="px-5 py-3"><StatusChip status="CLOSED" /></td>
                      <td className="px-5 py-3 font-mono text-xs text-text-muted text-right">Sep 28</td>
                    </tr>
                  </tbody>
               </table>
             </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
