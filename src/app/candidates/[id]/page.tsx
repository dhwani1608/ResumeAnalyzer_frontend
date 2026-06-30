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
      <div className="flex flex-col lg:flex-row h-full overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/5 bg-[var(--bg-base)]">
        
        {/* Left - Human Intelligence View (Cream) */}
        <div className="w-full lg:w-[45%] flex-shrink-0 lg:h-full overflow-y-auto p-12 space-y-16 bg-[var(--bg-surface)] border-r border-[var(--border)]">
          
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="font-mono">
                <h1 className="text-5xl font-bold tracking-tighter text-[var(--text-primary)] uppercase">{candidate.name}</h1>
                <div className="text-[10px] font-bold text-[var(--accent)] mt-3 tracking-[0.25em] uppercase border border-[var(--accent)]/10 bg-[var(--accent)]/5 px-4 py-1.5 rounded-full inline-block">
                  {candidate.title} • {candidate.location}
                </div>
              </div>
              <button className="flex items-center gap-2 text-[10px] px-4 py-2 bg-[var(--bg-sidebar)] text-white rounded-[var(--radius-lg)] hover:bg-[var(--accent)] hover:text-[var(--bg-sidebar)] transition-all font-bold uppercase tracking-widest font-mono shadow-2xl">
                <Download className="w-4 h-4" />
                Dumping_TX
              </button>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed pt-4 font-medium italic border-l-4 border-[var(--accent)]/30 pl-8">
              "{candidate.summary}"
            </p>
          </div>

          <div>
            <h2 className="text-[10px] font-bold font-mono text-gray-400 mb-10 uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="h-px flex-1 bg-gray-100" />
              Professional_Timeline
              <span className="h-px flex-1 bg-gray-100" />
            </h2>
            <CandidateTimeline experiences={candidate.experiences} />
          </div>

          <div>
             <h2 className="text-[10px] font-bold font-mono text-gray-400 mb-10 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="h-px flex-1 bg-gray-100" />
                Academic_Credentials
                <span className="h-px flex-1 bg-gray-100" />
             </h2>
             <div className="space-y-6">
                {candidate.education.length > 0 ? candidate.education.map((edu: any, i: number) => (
                   <div key={i} className="p-6 bg-gray-50 border border-gray-100 rounded-[var(--radius-lg)] shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-baseline mb-2">
                       <h4 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">{edu.institution}</h4>
                       <span className="text-[10px] font-bold font-mono text-gray-400 uppercase">{edu.years}</span>
                    </div>
                    <div className="text-sm font-bold text-[var(--accent)] uppercase tracking-widest font-mono">{edu.degree}</div>
                    {edu.description && <div className="text-sm text-gray-500 mt-2 font-medium">{edu.description}</div>}
                   </div>
                )) : (
                  <div className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest text-center py-10 border-2 border-dashed border-gray-100 rounded-[var(--radius-lg)]">NO_ACADEMIC_DATA</div>
                )}
             </div>
          </div>
        </div>

        {/* Right - AI Intelligence Panel (Charcoal) */}
        <div className="flex-1 lg:h-full bg-[var(--bg-base)] overflow-y-auto p-12 space-y-12">
          
          {/* Intelligence Score */}
          <div className="flex items-center gap-8 bg-[var(--bg-sidebar)] p-10 rounded-[var(--radius-xl)] border border-white/5 shadow-3xl group hover:border-[var(--accent)]/20 transition-all">
             <div className="scale-150 transform">
               <ScorePill score={82} />
             </div>
             <div className="font-mono">
               <h3 className="text-2xl font-bold tracking-tighter text-white uppercase italic">Matched_Intelligence_Profile</h3>
               <p className="text-xs text-gray-500 mt-3 leading-loose font-bold uppercase tracking-widest">
                 System recognized {candidate.skills.length} core technical vectors. <br/>
                 Heuristic analysis indicates 82% compatibility with target profile.
               </p>
             </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold font-mono tracking-[0.25em] text-gray-500 uppercase">Neural_Skill_Distribution</h3>
              <div className="border border-white/5 rounded-[var(--radius-lg)] bg-[var(--bg-sidebar)]/50 p-8 shadow-2xl backdrop-blur-xl">
                 <SkillRadar />
              </div>
            </div>
            
            <div className="space-y-10">
               <div className="space-y-6">
                 <h3 className="text-[10px] font-bold font-mono tracking-[0.25em] text-gray-500 uppercase border-b border-white/5 pb-4">Validated_Skill_Matrix</h3>
                 <div className="flex flex-wrap gap-3">
                   {!isReady ? <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" /> : candidate.skills.map((s: string) => <SkillTag key={s} label={s} variant="confirmed" />)}
                 </div>
               </div>

               <div className="space-y-6">
                 <h3 className="text-[10px] font-bold font-mono tracking-[0.25em] text-gray-500 uppercase border-b border-white/5 pb-4">Inferred_Talent_Vectors</h3>
                 <div className="flex flex-wrap gap-3">
                   {!isReady ? <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" /> : candidate.implied_skills.map((item: any) => (
                      <SkillTag key={item.s} label={item.s} variant="inferred" tooltip={item.t} />
                   ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
               <h3 className="text-[10px] font-bold font-mono tracking-[0.25em] text-gray-500 uppercase">Match_Telemetry_History</h3>
               <button className="text-[10px] font-bold font-mono tracking-[0.2em] text-[var(--accent)] hover:text-white transition-all uppercase underline-offset-8 underline">RERUN_DIAGNOSTICS</button>
             </div>
             
             <div className="border border-white/5 rounded-[var(--radius-lg)] bg-[var(--bg-sidebar)] overflow-hidden shadow-3xl">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#111] text-gray-500 text-[10px] uppercase font-bold font-mono tracking-widest border-b border-white/5">
                    <tr>
                      <th className="px-8 py-5">PROFILE_TARGET</th>
                      <th className="px-8 py-5">MAGNITUDE</th>
                      <th className="px-8 py-5">STATUS</th>
                      <th className="px-8 py-5 text-right">TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr className="hover:bg-white/5 transition-all group">
                      <td className="px-8 py-6 font-bold text-white group-hover:text-[var(--accent)]">Senior Backend Engineer</td>
                      <td className="px-8 py-6"><ScorePill score={82} /></td>
                      <td className="px-8 py-6"><StatusChip status="ACTIVE" /></td>
                      <td className="px-8 py-6 text-xs text-gray-500 text-right">OCT_12</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-all group">
                      <td className="px-8 py-6 font-bold text-white group-hover:text-[var(--accent)]">DevOps Engineer</td>
                      <td className="px-8 py-6"><ScorePill score={55} /></td>
                      <td className="px-8 py-6"><StatusChip status="CLOSED" /></td>
                      <td className="px-8 py-6 text-xs text-gray-500 text-right">SEP_28</td>
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
