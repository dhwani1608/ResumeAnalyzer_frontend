"use client";

import { motion } from "framer-motion";
import { ScorePill } from "@/components/ui/ScorePill";
import { SkillTag } from "@/components/ui/SkillTag";
import Link from "next/link";

export function CandidateCard({ candidate, onClick }: { candidate: any, onClick: () => void }) {
  const borderClass = candidate.score >= 75 ? "border-l-score-high" : candidate.score >= 50 ? "border-l-score-mid" : "border-l-score-low";

  return (
    <motion.div
      layout
      layoutId={candidate.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className={`group relative bg-bg-surface border border-l-2 border-y-border-strong border-r-border-strong ${borderClass} p-3.5 rounded-sm cursor-pointer hover:bg-bg-hover transition-colors`}
    >
      <div className="flex justify-between items-start mb-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-subtle flex flex-shrink-0 items-center justify-center text-accent text-xs font-medium font-mono border border-accent/20">
            {candidate.initials}
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary leading-tight">{candidate.name}</div>
            <div className="text-[10px] text-text-secondary uppercase tracking-wide-caps font-mono mt-0.5">{candidate.role}</div>
          </div>
        </div>
        <ScorePill score={candidate.score} />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {candidate.skills.slice(0, 3).map((s: string, i: number) => (
          <SkillTag key={i} label={s} />
        ))}
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/candidates/${candidate.id}`} className="block text-[11px] font-mono tracking-wide-caps font-medium bg-bg-elevated border border-border-strong text-text-primary px-2 py-1 rounded-sm hover:bg-border-strong hover:text-text-primary transition-all">
          View
        </Link>
      </div>
    </motion.div>
  );
}
