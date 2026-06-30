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
           initial={{ x: "100%" }}
           animate={{ x: 0 }}
           exit={{ x: "100%" }}
           transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
           className="fixed inset-y-0 right-0 w-[420px] bg-[var(--bg-surface)] border-l border-[var(--border)] flex flex-col z-50 overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.1)]"
         >
           <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/30">
             <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-[var(--bg-sidebar)] flex items-center justify-center text-[var(--accent)] text-xl font-bold font-mono border border-white/5 shadow-xl">
                 {candidate.initials}
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight uppercase font-mono">{candidate.name}</h2>
                 <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest font-mono">{candidate.email || "VECTOR_CONTACT_READY"}</div>
               </div>
             </div>
             <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-all text-gray-400 hover:text-[var(--text-primary)]">
               <X className="w-6 h-6" />
             </button>
           </div>

           <div className="flex-1 overflow-y-auto p-8 space-y-12">
             <div className="flex items-center gap-6 border border-gray-100 rounded-[var(--radius-lg)] p-6 bg-gray-50/50 shadow-sm">
               <div className="scale-125 origin-left">
                 <ScorePill score={candidate.score} />
               </div>
               <div className="font-mono">
                 <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-tight">Prime_Talent_Match</div>
                 <div className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-widest">Neural alignment at {candidate.score}%</div>
               </div>
             </div>

             <div>
                <h3 className="text-[10px] font-bold font-mono tracking-[0.25em] text-gray-400 mb-6 uppercase border-b border-gray-100 pb-3">Deciphered_Skill_Matrix</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills?.map((s: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-[var(--bg-sidebar)] text-white text-[9px] font-bold font-mono uppercase tracking-widest rounded-lg border border-white/5">
                      {s}
                    </span>
                  ))}
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-bold font-mono tracking-[0.25em] text-gray-400 mb-6 uppercase border-b border-gray-100 pb-3">Operational_Insight</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Candidate demonstrates high proficiency in core requirements. Recommended for immediate sequence activation.
                </p>
             </div>
           </div>

           <div className="p-8 border-t border-gray-100 bg-gray-50/50 grid grid-cols-2 gap-4">
              <button className="col-span-2 bg-[var(--accent)] text-[var(--bg-sidebar)] font-bold text-xs py-4 rounded-[var(--radius-lg)] hover:bg-[var(--accent)]/90 transition-all uppercase tracking-[0.2em] font-mono shadow-xl shadow-amber-900/10">
                Shortlist_Candidate
              </button>
              <button className="border border-gray-200 bg-white text-[var(--text-primary)] text-[10px] py-4 rounded-[var(--radius-lg)] hover:bg-gray-50 transition-all font-bold uppercase tracking-widest font-mono">
                Email_Invite
              </button>
              <button className="border border-rose-100 bg-white text-rose-500 text-[10px] py-4 rounded-[var(--radius-lg)] hover:bg-rose-50 transition-all font-bold uppercase tracking-widest font-mono">
                Deactivate
              </button>
           </div>
         </motion.div>
      )}
    </AnimatePresence>
  );
}
