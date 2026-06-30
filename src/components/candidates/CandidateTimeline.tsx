interface Experience {
  company: string;
  role: string;
  dates: string;
  description: string;
  skills: string[];
}

export function CandidateTimeline({ experiences = [] }: { experiences?: Experience[] }) {
  if (!experiences || experiences.length === 0) {
    return <div className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest">NO_EXPERIENCE_TELEMETRY</div>;
  }

  return (
    <div className="space-y-12">
      {experiences.map((exp, i) => (
        <div key={i} className="relative pl-10 group">
          <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-[var(--accent)] ring-8 ring-white group-hover:ring-[var(--accent)]/20 transition-all z-10 border-2 border-white" />
          {i !== experiences.length - 1 && (
            <div className="absolute left-[0px] top-6 w-px h-[calc(100%+3rem)] bg-gray-100" />
          )}
          
          <div className="flex justify-between items-baseline mb-2">
            <h4 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{exp.company}</h4>
            <span className="text-[10px] font-bold font-mono text-gray-400 uppercase tracking-widest">{exp.dates}</span>
          </div>
          <div className="text-[10px] font-bold text-[var(--accent)] mb-4 font-mono uppercase tracking-[0.2em]">{exp.role}</div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
            {exp.description}
          </p>
          <div className="flex flex-wrap gap-2">
             {exp.skills.map(s => (
               <span key={s} className="px-3 py-1.5 text-[9px] font-bold font-mono uppercase tracking-widest rounded-lg bg-[var(--bg-base)] text-white border border-white/5 group-hover:border-[var(--accent)]/30 transition-colors">
                 {s}
               </span>
             ))}
          </div>
        </div>
      ))}
    </div>
  );
}
