import React from 'react';
import { GlassCard } from '../../components/Common/GlassCard';
import { Leaf, Zap, TrendingDown, ShieldCheck, TreePine, Flame, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const SustainabilityPage: React.FC = () => {
  const co2Data = [
    { month: 'Apr', baselineTons: 1420, optimizedTons: 1280, savedTons: 140 },
    { month: 'May', baselineTons: 1580, optimizedTons: 1410, savedTons: 170 },
    { month: 'Jun', baselineTons: 1650, optimizedTons: 1460, savedTons: 190 },
    { month: 'Jul', baselineTons: 1590, optimizedTons: 1420, savedTons: 170 },
    { month: 'Aug', baselineTons: 1510, optimizedTons: 1350, savedTons: 160 },
    { month: 'Sep', baselineTons: 1480, optimizedTons: 1310, savedTons: 170 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span>Grid Sustainability & Carbon Efficiency</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracking transmission loss reductions, peak shaving carbon avoidance, and environmental impact metrics.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
          <TreePine className="w-4 h-4" />
          <span>Estimated 1,000 MT CO2 Abated YTD</span>
        </div>
      </div>

      {/* Top 4 Sustainability Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard glow="green" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">CO2 Emissions Abated</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">1,000 Tons</div>
          <span className="text-[10px] text-emerald-400 font-mono">Via ML Peak Shifting</span>
        </GlassCard>

        <GlassCard glow="blue" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Transmission Loss Reduction</div>
          <div className="text-2xl font-extrabold font-mono text-cyan-400">-3.4%</div>
          <span className="text-[10px] text-cyan-400 font-mono">Power Factor Optimization</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Peak Demand Shaved</div>
          <div className="text-2xl font-extrabold font-mono text-white">8.5 MW</div>
          <span className="text-[10px] text-slate-400 font-mono">Industrial Demand Response</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Clean Energy Share</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">38.2%</div>
          <span className="text-[10px] text-emerald-400 font-mono">Solar + Wind Grid Mix</span>
        </GlassCard>
      </div>

      {/* CO2 Emissions Avoidance Bar Chart */}
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-wide">Monthly Baseline vs AI-Optimized Carbon Footprint (MT CO2)</h3>
          <span className="text-xs font-mono text-emerald-400">Green = Avoided Emissions</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={co2Data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" MT" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B1727',
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                  fontSize: '12px',
                  borderRadius: '8px'
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              <Bar dataKey="baselineTons" name="Unoptimized Baseline (MT)" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="optimizedTons" name="AI-Optimized Dispatch (MT)" fill="#00E5FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savedTons" name="Carbon Abated (MT)" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-3 text-xs text-slate-400 font-mono">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          Environmental calculations and avoided carbon metrics are mathematical estimates calculated from synthetic load-dispatch demonstration models.
        </span>
      </div>
    </div>
  );
};
