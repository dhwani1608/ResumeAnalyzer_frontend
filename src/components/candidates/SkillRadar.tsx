"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

const data = [
  { subject: 'Backend', A: 90, fullMark: 100 },
  { subject: 'Frontend', A: 45, fullMark: 100 },
  { subject: 'DevOps', A: 70, fullMark: 100 },
  { subject: 'Data', A: 30, fullMark: 100 },
  { subject: 'Soft Skills', A: 85, fullMark: 100 },
  { subject: 'Domain', A: 60, fullMark: 100 },
];

export function SkillRadar({ className }: { className?: string }) {
  return (
    <div className={`w-full h-[280px] ${className || ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--border-strong)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Candidate" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
