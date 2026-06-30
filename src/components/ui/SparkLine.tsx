"use client";

import { ResponsiveContainer, LineChart, Line } from "recharts";

export function SparkLine({ data, color = "var(--text-muted)" }: { data: number[]; color?: string }) {
  const chartData = data.map((d, i) => ({ value: d, index: i }));
  return (
    <div className="h-8 w-20 opacity-60 flex-shrink-0">
      <LineChart width={80} height={32} data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
}
