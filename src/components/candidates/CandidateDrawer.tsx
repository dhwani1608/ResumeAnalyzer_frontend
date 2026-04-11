"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ScorePill } from "@/components/ui/ScorePill";
import { SkillTag } from "@/components/ui/SkillTag";

export function CandidateDrawer({ candidate, onClose }: { candidate: any, onClose: () => void }) {
  return (
    <AnimatePresence>
      {candidate && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-y-0 right-0 w-[360px] bg-bg-surface border-l border-border-strong flex flex-col z-50 overflow-hidden"
        >
          <div className="p-6 border-b border-border-strong flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-subtle flex items-center justify-center text-accent text-lg font-medium font-mono border border-accent/20">
                {candidate.initials}
              </div>
              <div>
                <h2 className="text-lg font-display text-text-primary tracking-tight font-medium">{candidate.name}</h2>
                <div className="text-xs text-text-secondary mt-0.5">{candidate.email || "Contact available"}</div>
              </div>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex items-center gap-4 border border-border-strong rounded-sm p-4 bg-bg-base">
              <ScorePill score={candidate.score} />
              <div>
                <div className="text-sm font-medium text-text-primary">Strong match</div>
                <div className="text-[11px] text-text-secondary mt-0.5">Skills & Experience align well</div>
              </div>
            </div>

            <div>
               <h3 className="text-[10px] font-mono tracking-wide-caps text-text-muted mb-3 uppercase">Matched Skills</h3>
               <div className="flex flex-wrap gap-1.5">
                 {candidate.skills?.map((s: string, i: number) => <SkillTag key={i} label={s} variant="confirmed" />)}
               </div>
            </div>
          </div>

          <div className="p-5 border-t border-border-strong bg-bg-base grid grid-cols-2 gap-3">
             <button className="col-span-2 bg-accent text-[#0E0F11] font-medium text-sm py-2 rounded-md hover:bg-accent-hover transition-colors">
               Shortlist
             </button>
             <button className="border border-border-strong bg-bg-surface text-text-primary text-sm py-2 rounded-md hover:bg-bg-hover transition-colors font-medium">
               Email
             </button>
             <button className="border border-score-low/20 bg-bg-surface text-score-low text-sm py-2 rounded-md hover:bg-score-low/10 transition-colors font-medium">
               Pass for now
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
