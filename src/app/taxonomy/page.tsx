"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Search, ChevronRight, Folder, Hash, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaxonomy } from "@/lib/api/intelligence";
import { useState } from "react";

export default function TaxonomyPage() {
  const { data, isLoading } = useQuery({ queryKey: ["taxonomy"], queryFn: fetchTaxonomy });
  const taxonomy = data?.taxonomy || {};
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  const skillKeys = Object.keys(taxonomy);
  const selectedData = selectedSkill ? taxonomy[selectedSkill] : null;
  return (
    <PageShell breadcrumb="Taxonomy">
      <div className="flex h-full overflow-hidden divide-x divide-border-strong bg-bg-base">
        
        {/* Navigator (Left) */}
        <div className="w-[340px] flex-shrink-0 flex flex-col bg-bg-surface">
          <div className="p-4 border-b border-border-strong">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
              <input 
                type="text"
                placeholder="Search skills..."
                className="w-full bg-bg-base border border-border-strong rounded py-1.5 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
             {isLoading ? (
               <div className="py-8 flex justify-center text-text-muted"><Loader2 className="w-5 h-5 animate-spin" /></div>
             ) : (
                <div className="space-y-1">
                  {skillKeys.map((k) => (
                     <div key={k} onClick={() => setSelectedSkill(k)} className={`flex items-center justify-between p-2 rounded text-sm cursor-pointer transition-colors ${selectedSkill === k ? 'bg-accent-subtle/50 border border-accent/20 text-accent' : 'hover:bg-bg-elevated text-text-secondary hover:text-text-primary'}`}>
                       <div className="flex items-center gap-2">
                         <Hash className={`w-3.5 h-3.5 flex-shrink-0 ${selectedSkill === k ? '' : 'text-text-muted'}`} />
                         <span className={`truncate ${selectedSkill === k ? 'font-medium' : ''}`}>{k}</span>
                       </div>
                       <span className={`text-[10px] font-mono px-1.5 rounded border ${selectedSkill === k ? 'bg-bg-base text-accent border-accent/30' : 'bg-bg-base text-text-muted border-border-strong'}`}>
                         {taxonomy[k]?.aliases?.length || 0}
                       </span>
                     </div>
                  ))}
                </div>
             )}
            
            <div className="mt-8 border-t border-border-strong pt-6">
              <h3 className="text-[10px] font-mono uppercase tracking-wide-caps text-text-muted mb-3 px-2">Unknown Skills Queue</h3>
              <div className="flex justify-between items-center p-2 rounded text-sm text-score-mid cursor-pointer hover:bg-bg-hover transition-colors">
                <span className="font-medium truncate">fastapi</span>
                <span className="text-[10px] font-mono bg-score-mid/10 px-1.5 py-0.5 rounded">12 pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex-1 overflow-y-auto p-12 bg-bg-base space-y-12">
          {selectedSkill && selectedData ? (
            <>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted uppercase tracking-wide-caps mb-4">
                   <span>Taxonomy</span> <ChevronRight className="w-3 h-3" /> <span className="text-accent underline underline-offset-4">{selectedSkill}</span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-display tracking-tight text-text-primary font-semibold">{selectedSkill}</h1>
                    <p className="text-sm text-text-secondary mt-3">Type: <code className="font-mono text-xs bg-bg-surface border border-border-strong px-2 py-1 rounded text-text-primary">{selectedData.type || "skill"}</code></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-bg-surface border border-border-strong rounded-sm p-6 space-y-5 col-span-2">
                   <h3 className="text-[11px] font-mono uppercase tracking-wide-caps text-text-secondary">Aliases (Merged)</h3>
                   <div className="flex flex-wrap gap-2">
                     {selectedData.aliases?.map((a: string) => (
                       <span key={a} className="px-2 py-1 text-[11px] uppercase tracking-wide-caps font-mono text-text-secondary bg-bg-base border border-border-strong rounded">{a}</span>
                     ))}
                     {(!selectedData.aliases || selectedData.aliases.length === 0) && (
                       <span className="text-sm text-text-muted">No known aliases</span>
                     )}
                   </div>
                </div>
              </div>
            </>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-text-muted">
               <Hash className="w-12 h-12 mb-4 opacity-50" />
               <p>Select a skill from the taxonomy to view details.</p>
             </div>
          )}
        </div>

      </div>
    </PageShell>
  );
}
