import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { StatusBadge } from '../Common/StatusBadge';
import { SimulationResult } from '../../types';
import { useGridStore } from '../../store/gridStore';
import {
  Activity,
  AlertTriangle,
  Zap,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Sparkles,
  Flame,
  Leaf
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface SimulationResultCardProps {
  result: SimulationResult | null;
}

export const SimulationResultCard: React.FC<SimulationResultCardProps> = ({ result }) => {
  const { openAssetDrawer } = useGridStore();

  if (!result) {
    return (
      <GlassCard className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[450px]">
        <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">
          <Activity className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-white">Grid Scenario Simulation Standby</h3>
        <p className="text-xs text-slate-400 max-w-md mt-2 mb-6 leading-relaxed">
          Adjust temperature, residential and industrial load sliders on the left, then click <strong>"Run Grid Stress Simulation"</strong> to evaluate transmission bottlenecks and transformer thermal overloads.
        </p>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          ⚡ Ready for power flow execution
        </span>
      </GlassCard>
    );
  }

  const isStressHigh = result.demandChangePct > 12;

  return (
    <div className="space-y-4">
      {/* Top High-level KPI summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <GlassCard glow="blue" className="p-4">
          <div className="text-[10px] font-mono uppercase text-slate-400">Baseline Demand</div>
          <div className="text-xl font-bold font-mono text-slate-200 mt-1">{result.baselineDemandMw} MW</div>
          <span className="text-[10px] text-slate-400 font-mono">Normal conditions</span>
        </GlassCard>

        <GlassCard glow={isStressHigh ? 'red' : 'amber'} className="p-4">
          <div className="text-[10px] font-mono uppercase text-slate-400">Simulated Demand</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">{result.simulatedDemandMw} MW</div>
          <span className={`text-[10px] font-mono font-bold ${result.demandChangePct > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {result.demandChangePct > 0 ? `+${result.demandChangePct}%` : `${result.demandChangePct}%`} Shift
          </span>
        </GlassCard>

        <GlassCard glow={result.overloadedFeedersCount > 2 ? 'red' : 'none'} className="p-4">
          <div className="text-[10px] font-mono uppercase text-slate-400">Overloaded Feeders</div>
          <div className="text-xl font-bold font-mono text-rose-400 mt-1">{result.overloadedFeedersCount} Lines</div>
          <span className="text-[10px] text-rose-400/80 font-mono">&gt; 90% utilization</span>
        </GlassCard>

        <GlassCard glow="none" className="p-4">
          <div className="text-[10px] font-mono uppercase text-slate-400">At-Risk Transformers</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">{result.atRiskTransformersCount} Units</div>
          <span className="text-[10px] text-amber-400/80 font-mono">Thermal strain</span>
        </GlassCard>
      </div>

      {/* Before vs After Hourly Chart */}
      <GlassCard className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">24-Hour Simulated Demand Curve vs Baseline</h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Simulated Peak:</span>
            <span className="text-rose-400 font-bold">{result.simulatedPeakMw} MW @ {result.peakHour}</span>
          </div>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.hourlyProfile} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="timeLabel" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} unit=" MW" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B1727',
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                  fontSize: '11px',
                  borderRadius: '8px'
                }}
              />
              <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              <Line type="monotone" dataKey="baselineMw" name="Baseline Load" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              <Line type="monotone" dataKey="simulatedMw" name="Simulated Scenario" stroke="#00E5FF" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Critical Assets Impacted */}
      <GlassCard className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h4 className="text-sm font-bold text-white">Critical Assets Breaching Safe Envelopes</h4>
          </div>
          <span className="text-xs font-mono text-rose-400 font-bold">{result.criticalAssetsAtRisk.length} Assets Identified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.criticalAssetsAtRisk.map((asset) => (
            <div
              key={asset.id}
              className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-white">{asset.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{asset.type}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-rose-400">{asset.simulatedUtilizationPct}% Util</div>
                <StatusBadge status={asset.riskLevel} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Mitigation Protocols */}
      <GlassCard className="space-y-3 bg-cyan-950/20 border-cyan-500/30">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AUTONOMOUS OPERATIONAL MITIGATION ACTIONS</span>
        </div>

        <div className="space-y-2 text-xs">
          {result.aiMitigationRecommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 text-slate-200">
              <span className="text-cyan-400 font-bold font-mono">0{i + 1}.</span>
              <p className="flex-1 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
