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
    <div className={`w-full h-[320px] ${className || ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#6B7280', 
              fontSize: 10, 
              fontFamily: 'monospace', 
              fontWeight: 700,
              textAnchor: 'middle'
            }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar 
            name="Candidate" 
            dataKey="A" 
            stroke="var(--accent)" 
            fill="var(--accent)" 
            fillOpacity={0.3} 
            strokeWidth={3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
