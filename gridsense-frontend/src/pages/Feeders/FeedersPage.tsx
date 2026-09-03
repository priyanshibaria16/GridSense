import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Feeder } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { GitFork, Search, Filter, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FeedersPage: React.FC = () => {
  const [feeders, setFeeders] = useState<Feeder[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getFeeders().then(setFeeders);
  }, []);

  const filtered = feeders.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.code.toLowerCase().includes(search.toLowerCase()) ||
      f.substationName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || f.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['ALL', 'HEALTHY', 'WARNING', 'CRITICAL'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <GitFork className="w-6 h-6 text-cyan-400" />
            <span>Feeders & Distribution Trunks</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Loading ratios, power factor metrics, and thermal strain tracking across all 11kV/22kV distribution feeders.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
          Monitored Feeders: {feeders.length} Trunks
        </div>
      </div>

      {/* Search & Filter */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search feeders by name, code, or parent substation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <span className="text-slate-400 text-[10px] px-2 uppercase">Status:</span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === s ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Feeders Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Feeder Code</th>
                <th className="py-3.5 px-4">Feeder Name</th>
                <th className="py-3.5 px-4">Parent Substation</th>
                <th className="py-3.5 px-4">Voltage</th>
                <th className="py-3.5 px-4">Capacity (MW)</th>
                <th className="py-3.5 px-4">Current Load</th>
                <th className="py-3.5 px-4">Utilization</th>
                <th className="py-3.5 px-4">Power Factor</th>
                <th className="py-3.5 px-4">Current (A)</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((f) => {
                const isOverloaded = f.utilizationPct >= 90;
                const isCritical = f.utilizationPct >= 98;

                return (
                  <tr key={f.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{f.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{f.name}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans">{f.substationName}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{f.voltageKv} kV</td>
                    <td className="py-3.5 px-4 text-slate-200 font-mono">{f.capacityMw} MW</td>
                    <td className="py-3.5 px-4 text-slate-200 font-mono font-bold">{f.currentLoadMw} MW</td>
                    <td className="py-3.5 px-4 min-w-[140px]">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className={isCritical ? 'text-rose-400 font-bold' : isOverloaded ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                            {f.utilizationPct}%
                          </span>
                          {isOverloaded && <span className="text-rose-400 uppercase text-[9px] font-bold">Near Peak</span>}
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isCritical ? 'bg-rose-500' : isOverloaded ? 'bg-amber-400' : 'bg-cyan-400'
                            }`}
                            style={{ width: `${Math.min(100, f.utilizationPct)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className={f.powerFactor < 0.85 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                        {f.powerFactor}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{f.currentAmps} A</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={f.riskLevel} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={f.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate('/transformers')}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        <span>Inspect Transformers</span>
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
  );
};
