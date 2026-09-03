import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Flame } from 'lucide-react';

export const AnomalyTrendChart: React.FC = () => {
  const data = [
    { day: 'Mon', critical: 1, high: 3, medium: 6 },
    { day: 'Tue', critical: 0, high: 2, medium: 5 },
    { day: 'Wed', critical: 2, high: 4, medium: 8 },
    { day: 'Thu', critical: 1, high: 1, medium: 4 },
    { day: 'Fri', critical: 3, high: 5, medium: 9 },
    { day: 'Sat', critical: 0, high: 2, medium: 3 },
    { day: 'Sun', critical: 1, high: 1, medium: 2 }
  ];

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Weekly Anomaly Ingestion Trend</h3>
        </div>
        <span className="text-xs font-mono text-cyan-400">Isolation Forest Output</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1727',
                borderColor: 'rgba(0, 229, 255, 0.3)',
                fontSize: '12px',
                borderRadius: '8px'
              }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            <Bar dataKey="critical" name="Critical" fill="#EF4444" stackId="a" radius={[0, 0, 0, 0]} />
            <Bar dataKey="high" name="High" fill="#F59E0B" stackId="a" radius={[0, 0, 0, 0]} />
            <Bar dataKey="medium" name="Medium" fill="#00E5FF" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
