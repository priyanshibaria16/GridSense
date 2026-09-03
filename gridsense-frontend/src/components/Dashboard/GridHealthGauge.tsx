import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { ShieldCheck, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { DashboardSummary } from '../../types';

interface GridHealthGaugeProps {
  distribution: DashboardSummary['healthDistribution'];
  healthScore: number;
}

export const GridHealthGauge: React.FC<GridHealthGaugeProps> = ({ distribution, healthScore }) => {
  // SVG circular calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <GlassCard className="flex flex-col justify-between space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Grid Health Index</h3>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          STABLE
        </span>
      </div>

      {/* Circular Visualization */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            {/* Background Track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Health Progress Arc */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="url(#healthGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{healthScore}%</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Overall Index</span>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="space-y-2.5 pt-2 border-t border-white/5">
        {/* Healthy Assets */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">Healthy Assets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${distribution.healthyPct}%` }} />
            </div>
            <span className="font-mono font-bold text-white text-[11px] w-8 text-right">{distribution.healthyPct}%</span>
          </div>
        </div>

        {/* Warning Assets */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Warning Threshold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${distribution.warningPct}%` }} />
            </div>
            <span className="font-mono font-bold text-white text-[11px] w-8 text-right">{distribution.warningPct}%</span>
          </div>
        </div>

        {/* Critical Assets */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-300">Critical Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${distribution.criticalPct}%` }} />
            </div>
            <span className="font-mono font-bold text-white text-[11px] w-8 text-right">{distribution.criticalPct}%</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-white/5">
        Monitored Assets: {distribution.totalAssets} Transformers & Feeder Nodes
      </div>
    </GlassCard>
  );
};
