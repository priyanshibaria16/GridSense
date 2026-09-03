import React, { useState } from 'react';
import { GlassCard } from '../../components/Common/GlassCard';
import { ConsumptionBreakdownChart } from '../../components/Charts/ConsumptionBreakdownChart';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Calendar,
  Layers,
  ArrowUpRight,
  PieChart as PieIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const EnergyAnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('MONTHLY');

  const zoneData = [
    { zone: 'North', consumptionGwh: 42.4, peakMw: 28.5 },
    { zone: 'South', consumptionGwh: 58.2, peakMw: 36.4 },
    { zone: 'East', consumptionGwh: 64.8, peakMw: 41.2 },
    { zone: 'West', consumptionGwh: 51.5, peakMw: 34.0 },
    { zone: 'Central', consumptionGwh: 38.1, peakMw: 24.8 }
  ];

  const sectorData = [
    { name: 'Industrial', value: 46, color: '#F59E0B' },
    { name: 'Residential', value: 34, color: '#00E5FF' },
    { name: 'Commercial', value: 14, color: '#10B981' },
    { name: 'Agricultural', value: 6, color: '#8B5CF6' }
  ];

  const monthlyTrend = [
    { month: 'Jan', consumption: 180, peak: 88 },
    { month: 'Feb', consumption: 195, peak: 91 },
    { month: 'Mar', consumption: 220, peak: 96 },
    { month: 'Apr', consumption: 245, peak: 102 },
    { month: 'May', consumption: 280, peak: 114 },
    { month: 'Jun', consumption: 290, peak: 118 },
    { month: 'Jul', consumption: 275, peak: 112 },
    { month: 'Aug', consumption: 260, peak: 105 },
    { month: 'Sep', consumption: 248, peak: 97.8 }
  ];

  const timeframes: ('DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY')[] = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>Energy Consumption & Load Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Macro energy dispatch analytics, seasonal peak growth trajectories, and sectoral demand stacks.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeframe === tf ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Consumption Breakdown Area Chart */}
      <ConsumptionBreakdownChart />

      {/* Grid: Zone Comparison & Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Energy Delivered Bar Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-wide">Energy Delivered by Grid Zone (GWh)</h3>
              <span className="text-xs font-mono text-cyan-400">Total YTD: 255.0 GWh</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <XAxis dataKey="zone" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" GWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1727',
                      borderColor: 'rgba(0, 229, 255, 0.3)',
                      fontSize: '12px',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="consumptionGwh" name="Delivered Energy (GWh)" fill="#00E5FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="peakMw" name="Peak Load (MW)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Sectoral Breakdown Donut */}
        <div>
          <GlassCard className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide">Sectoral Demand Share</h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
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
                    formatter={(val: any) => [`${val}% of total load`, 'Share']}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
