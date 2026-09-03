import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ShieldAlert } from 'lucide-react';

interface RiskDistributionProps {
  criticalCount?: number;
  highCount?: number;
  mediumCount?: number;
  lowCount?: number;
}

export const RiskDistributionChart: React.FC<RiskDistributionProps> = ({
  criticalCount = 3,
  highCount = 14,
  mediumCount = 32,
  lowCount = 133
}) => {
  const data = [
    { name: 'Critical Risk (>80%)', value: criticalCount, color: '#EF4444' },
    { name: 'High Risk (60-80%)', value: highCount, color: '#F59E0B' },
    { name: 'Medium Risk (40-60%)', value: mediumCount, color: '#00B3FF' },
    { name: 'Healthy / Low Risk (<40%)', value: lowCount, color: '#10B981' }
  ];

  const total = criticalCount + highCount + mediumCount + lowCount;

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Fleet Risk Distribution</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 font-bold">{total} Total Units</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#07111F" strokeWidth={2} />
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
              formatter={(val: any) => [`${val} Units (${((Number(val) / total) * 100).toFixed(1)}%)`, 'Count']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
