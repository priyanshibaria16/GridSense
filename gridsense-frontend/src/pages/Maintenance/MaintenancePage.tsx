import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { MaintenanceRecord } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import {
  Wrench,
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { useGridStore } from '../../store/gridStore';
import { useNavigate } from 'react-router-dom';

export const MaintenancePage: React.FC = () => {
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([]);
  const { openAssetDrawer } = useGridStore();
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getMaintenance().then(setMaintenance);
  }, []);

  const overdue = maintenance.filter((m) => m.status === 'OVERDUE');
  const totalCost = maintenance.reduce((acc, curr) => acc + curr.estimatedCostUsd, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>Predictive Maintenance Operations</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Condition-based maintenance scheduling driven by ML failure probability algorithms, oil dielectric testing, and thermal scans.
          </p>
        </div>

        <button
          onClick={() => navigate('/risk')}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          View Asset Risk Ranking
        </button>
      </div>

      {/* Top 4 Maintenance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard glow="red" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Overdue Inspections</div>
          <div className="text-2xl font-extrabold font-mono text-rose-400">{overdue.length} Assets</div>
          <span className="text-[10px] text-rose-400 font-mono">Immediate Crew Dispatch</span>
        </GlassCard>

        <GlassCard glow="amber" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Scheduled Next 30 Days</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400">{maintenance.length} Assets</div>
          <span className="text-[10px] text-amber-400 font-mono">Preventive Overhauls</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Est. Maintenance Budget</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            ${totalCost.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Cost Avoidance: $280k</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Workforce Efficiency</div>
          <div className="text-2xl font-extrabold font-mono text-cyan-400">96.2%</div>
          <span className="text-[10px] text-cyan-400/80 font-mono">SLA Adherence</span>
        </GlassCard>
      </div>

      {/* Maintenance Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <h3 className="text-sm font-bold text-white tracking-wide">Prioritized Field Work Orders</h3>
          <span className="text-xs font-mono text-slate-400">IEEE C57.104 Standard Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Asset Code</th>
                <th className="py-3.5 px-4">Target Asset</th>
                <th className="py-3.5 px-4">Intervention Type</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Risk</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Estimated Cost</th>
                <th className="py-3.5 px-4">Lead Technician</th>
                <th className="py-3.5 px-4">AI Protocol Recommendation</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {maintenance.map((m) => {
                const isOver = m.status === 'OVERDUE';
                return (
                  <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{m.assetId.toUpperCase()}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{m.assetName}</td>
                    <td className="py-3.5 px-4 text-slate-200">{m.type}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={m.priority} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-rose-400">{m.riskScore}%</td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className={isOver ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                        {m.nextInspectionDue}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">
                      ${m.estimatedCostUsd.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {m.technicianAssigned || 'Auto-Dispatch'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate" title={m.aiSuggestedAction}>
                      <span className="text-cyan-300">⚡ </span>
                      {m.aiSuggestedAction}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={m.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
