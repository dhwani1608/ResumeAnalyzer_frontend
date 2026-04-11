interface Experience {
  company: string;
  role: string;
  dates: string;
  description: string;
  skills: string[];
}

export function CandidateTimeline({ experiences = [] }: { experiences?: Experience[] }) {
  if (!experiences || experiences.length === 0) {
    return <div className="text-sm font-mono text-text-muted">No experience entries found.</div>;
  }


  return (
    <div className="space-y-8">
      {experiences.map((exp, i) => (
        <div key={i} className="relative pl-6">
          <div className="absolute left-[-3px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-bg-surface z-10" />
          {i !== experiences.length - 1 && (
            <div className="absolute left-[0px] top-4 w-px h-[calc(100%+2rem)] bg-border-strong" />
          )}
          
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="text-[15px] font-semibold text-text-primary tracking-tight">{exp.company}</h4>
            <span className="text-xs font-mono text-text-muted">{exp.dates}</span>
          </div>
          <div className="text-sm font-medium text-accent mb-3">{exp.role}</div>
          <p className="text-[13px] text-text-secondary leading-relaxed mb-4">
            {exp.description}
          </p>
          <div className="flex flex-wrap gap-2">
             {exp.skills.map(s => (
               <span key={s} className="px-2 py-0.5 text-[10px] font-mono tracking-wide-caps uppercase rounded bg-bg-elevated text-text-muted border border-border-strong group hover:bg-tag-bg hover:text-text-primary hover:border-tag-border cursor-default transition-colors">
                 {s}
               </span>
             ))}
          </div>
        </div>
      ))}
    </div>
  );
}
