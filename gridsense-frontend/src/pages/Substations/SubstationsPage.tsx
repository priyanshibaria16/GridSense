import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Substation } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { Building2, Search, Filter, ArrowUpRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SubstationsPage: React.FC = () => {
  const [substations, setSubstations] = useState<Substation[]>([]);
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getSubstations().then(setSubstations);
  }, []);

  const filtered = substations.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.code.toLowerCase().includes(search.toLowerCase()) ||
      sub.zone.toLowerCase().includes(search.toLowerCase());
    const matchesZone = selectedZone === 'ALL' || sub.zone === selectedZone;
    const matchesStatus = selectedStatus === 'ALL' || sub.status === selectedStatus;
    return matchesSearch && matchesZone && matchesStatus;
  });

  const zones = ['ALL', 'North', 'South', 'East', 'West', 'Central'];
  const statuses = ['ALL', 'HEALTHY', 'WARNING', 'CRITICAL'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span>Substations Directory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time capacity, MVA loading ratios, and operational health scores for all primary grid substations.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
          Total Substations: {substations.length} Units
        </div>
      </div>

      {/* Filter and Search Bar */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by substation name, code, or zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[10px] px-2 uppercase">Zone:</span>
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedZone === z ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10">
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
          </div>
        </div>
      </GlassCard>

      {/* Substations Data Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Substation Code</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Zone</th>
                <th className="py-3.5 px-4">Voltage</th>
                <th className="py-3.5 px-4">Capacity (MVA)</th>
                <th className="py-3.5 px-4">Current Load</th>
                <th className="py-3.5 px-4">Utilization</th>
                <th className="py-3.5 px-4">Health Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((sub) => {
                const isOverloaded = sub.utilizationPct > 90;
                return (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{sub.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{sub.name}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{sub.zone}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{sub.voltageRatingKv} kV</td>
                    <td className="py-3.5 px-4 text-slate-200 font-mono">{sub.capacityMva} MVA</td>
                    <td className="py-3.5 px-4 text-slate-200 font-mono font-bold">{sub.currentLoadMva} MVA</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isOverloaded ? 'bg-rose-500' : sub.utilizationPct > 80 ? 'bg-amber-400' : 'bg-cyan-400'
                            }`}
                            style={{ width: `${Math.min(100, sub.utilizationPct)}%` }}
                          />
                        </div>
                        <span className={`font-mono font-bold ${isOverloaded ? 'text-rose-400' : 'text-slate-200'}`}>
                          {sub.utilizationPct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{sub.healthScore}%</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={sub.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate('/feeders')}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        <span>View Feeders ({sub.feederCount})</span>
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
