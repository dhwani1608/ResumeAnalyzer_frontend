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
      className={`group relative bg-[var(--bg-surface)] border border-[var(--border)] p-4 rounded-[var(--radius-lg)] cursor-pointer hover:shadow-md hover:translate-y-[-1px] transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex flex-shrink-0 items-center justify-center text-[var(--bg-sidebar)] text-xs font-bold font-mono shadow-sm">
            {candidate.initials}
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--text-primary)] leading-tight">{candidate.name}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold font-mono mt-0.5">{candidate.role}</div>
          </div>
        </div>
        <ScorePill score={candidate.score} />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {candidate.skills.slice(0, 3).map((s: string, i: number) => (
          <SkillTag key={i} label={s} />
        ))}
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
        <Link href={`/candidates/${candidate.id}`} className="block text-[10px] font-bold tracking-widest uppercase bg-[var(--bg-sidebar)] text-white px-3 py-1.5 rounded-lg shadow-lg">
          VIEW
        </Link>
      </div>
    </motion.div>
  );
}
