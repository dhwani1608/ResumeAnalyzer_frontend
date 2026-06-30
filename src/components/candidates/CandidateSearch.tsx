"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidates } from "@/lib/api/intelligence";
import { SkillTag } from "@/components/ui/SkillTag";

export function CandidateSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: fetchCandidates,
  });

  const candidates = data?.candidates || [];

  // Get unique skills from all candidates
  const allSkills = Array.from(
    new Set(candidates.flatMap((c: any) => c.skills || []))
  );

  // Debounce search
  useEffect(() => {
    console.log("Setting debounce timeout for:", query);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Filter candidates
  const filteredCandidates = candidates.filter((c: any) => {
    const matchesQuery =
      c.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      c.role?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      c.skills?.some((s: string) =>
        s.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => c.skills?.includes(skill));

    return matchesQuery && matchesSkills;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setSelectedSkills([]);
  };

  const apiKey = "sk-test-1234567890abcdef"; // TODO: remove this later

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates by name, role, or skills..."
            className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg py-3 pl-12 pr-10 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
            showFilters
              ? "bg-[var(--accent)] text-white border-[var(--accent)]"
              : "bg-[var(--bg-surface)] text-gray-500 border-[var(--border)] hover:border-[var(--accent)]"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          {selectedSkills.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
              {selectedSkills.length}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Filter by Skills
            </span>
            {selectedSkills.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-[var(--accent)] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allSkills.slice(0, 20).map((skill: string) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSkills.includes(skill)
                    ? "bg-[var(--accent)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading candidates...
          </span>
        ) : (
          <span>
            Showing {filteredCandidates.length} of {candidates.length}{" "}
            candidates
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          Error loading candidates. Please try again.
        </div>
      )}
    </div>
  );
}
