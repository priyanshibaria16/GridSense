import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

export const ConsumptionBreakdownChart: React.FC = () => {
  const data = [
    { time: '00:00', residential: 18.2, commercial: 8.5, industrial: 21.5 },
    { time: '04:00', residential: 14.1, commercial: 6.2, industrial: 20.5 },
    { time: '08:00', residential: 24.5, commercial: 18.2, industrial: 26.2 },
    { time: '12:00', residential: 28.0, commercial: 26.4, industrial: 30.2 },
    { time: '16:00', residential: 26.2, commercial: 24.0, industrial: 32.2 },
    { time: '20:00', residential: 42.8, commercial: 19.5, industrial: 28.1 },
    { time: '23:00', residential: 29.4, commercial: 11.2, industrial: 21.5 }
  ];

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Customer Sector Demand Profiles</h3>
        </div>
        <span className="text-xs font-mono text-cyan-400">Total Load Stack (MW)</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" MW" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1727',
                borderColor: 'rgba(0, 229, 255, 0.3)',
                fontSize: '12px',
                borderRadius: '8px'
              }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            <Area type="monotone" dataKey="residential" name="Residential" stroke="#00E5FF" fillOpacity={1} fill="url(#colorRes)" stackId="1" />
            <Area type="monotone" dataKey="commercial" name="Commercial" stroke="#10B981" fillOpacity={1} fill="url(#colorCom)" stackId="1" />
            <Area type="monotone" dataKey="industrial" name="Industrial" stroke="#F59E0B" fillOpacity={1} fill="url(#colorInd)" stackId="1" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
