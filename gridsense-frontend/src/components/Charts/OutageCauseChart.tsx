import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ZapOff } from 'lucide-react';
import { ReliabilityMetrics } from '../../types';

interface OutageCauseChartProps {
  causes?: ReliabilityMetrics['outagesByCause'];
}

export const OutageCauseChart: React.FC<OutageCauseChartProps> = ({
  causes = [
    { cause: 'Equipment Failure', count: 24, pct: 38 },
    { cause: 'Weather / Lightning', count: 16, pct: 25 },
    { cause: 'Grid Overload', count: 12, pct: 19 },
    { cause: 'Vegetation Overgrowth', count: 8, pct: 12 },
    { cause: 'Third Party Damage', count: 4, pct: 6 }
  ]
}) => {
  const COLORS = ['#EF4444', '#00E5FF', '#F59E0B', '#10B981', '#8B5CF6'];

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ZapOff className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Outage Root Cause Distribution</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">IEEE Standard 1366</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={causes}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="count"
              nameKey="cause"
            >
              {causes.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#07111F" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1727',
                borderColor: 'rgba(0, 229, 255, 0.3)',
                fontSize: '12px',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(val: any, name: any) => [`${val} Outages`, name]}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
