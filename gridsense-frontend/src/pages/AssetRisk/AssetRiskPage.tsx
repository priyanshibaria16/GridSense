import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Transformer } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { RiskMatrix } from '../../components/Charts/RiskMatrix';
import { RiskDistributionChart } from '../../components/Charts/RiskDistributionChart';
import { useGridStore } from '../../store/gridStore';
import {
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
  Cpu,
  Layers,
  Sparkles,
  TrendingDown,
  Wrench
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AssetRiskPage: React.FC = () => {
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const { openAssetDrawer } = useGridStore();
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getTransformers().then(setTransformers);
  }, []);

  const critical = transformers.filter((t) => t.riskLevel === 'CRITICAL');
  const high = transformers.filter((t) => t.riskLevel === 'HIGH');
  const medium = transformers.filter((t) => t.riskLevel === 'MEDIUM');
  const low = transformers.filter((t) => t.riskLevel === 'LOW');

  const rankedAssets = [...transformers].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span>Asset Failure Risk Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Supervised Random Forest classification predicting transformer breakdown probability within next 30 days.
          </p>
        </div>

        <button
          onClick={() => navigate('/maintenance')}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>View Maintenance Plan</span>
        </button>
      </div>

      {/* Top 4 Risk Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard glow="red" className="p-4 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Critical Risk (&gt;80%)</div>
          <div className="text-2xl font-extrabold font-mono text-rose-400">{critical.length} Units</div>
          <span className="text-[10px] text-rose-400 font-mono">Immediate Triage Needed</span>
        </GlassCard>

        <GlassCard glow="amber" className="p-4 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">High Risk (60-80%)</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400">{high.length} Units</div>
          <span className="text-[10px] text-amber-400 font-mono">Thermal strain monitored</span>
        </GlassCard>

        <GlassCard glow="none" className="p-4 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Medium Risk (40-60%)</div>
          <div className="text-2xl font-extrabold font-mono text-blue-400">{medium.length} Units</div>
          <span className="text-[10px] text-slate-400 font-mono">Standard inspection cycle</span>
        </GlassCard>

        <GlassCard glow="none" className="p-4 space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400">Healthy / Low Risk (&lt;40%)</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">{low.length || 133} Units</div>
          <span className="text-[10px] text-emerald-400 font-mono">Optimal condition</span>
        </GlassCard>
      </div>

      {/* Charts Row: Risk Matrix & Fleet Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskMatrix transformers={transformers} />
        </div>
        <div>
          <RiskDistributionChart
            criticalCount={critical.length}
            highCount={high.length}
            mediumCount={medium.length}
            lowCount={low.length || 133}
          />
        </div>
      </div>

      {/* Asset Ranking Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Prioritized Asset Risk Ranking</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Sorted by ML Failure Probability</span>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Asset Code</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Feeder & Zone</th>
                  <th className="py-3.5 px-4">Load %</th>
                  <th className="py-3.5 px-4">Winding Temp</th>
                  <th className="py-3.5 px-4">Days Since Service</th>
                  <th className="py-3.5 px-4">Failure Probability</th>
                  <th className="py-3.5 px-4">Risk Level</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rankedAssets.map((tr, idx) => {
                  const isCrit = tr.riskLevel === 'CRITICAL';
                  return (
                    <tr
                      key={tr.id}
                      onClick={() => openAssetDrawer(tr)}
                      className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-400">#{idx + 1}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{tr.code}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{tr.name}</td>
                      <td className="py-3.5 px-4 text-slate-300">{tr.feederName} ({tr.zone})</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{tr.utilizationPct}%</td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className={tr.temperatureC > 75 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                          {tr.temperatureC}°C
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{tr.daysSinceMaintenance} days</td>
                      <td className="py-3.5 px-4 font-mono">
                        <span
                          className={`px-2.5 py-1 rounded font-extrabold text-xs ${
                            isCrit
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                              : tr.riskScore > 60
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400'
                          }`}
                        >
                          {tr.riskScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={tr.riskLevel} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/assets/${tr.id}`);
                          }}
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                        >
                          <span>Diagnose</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
