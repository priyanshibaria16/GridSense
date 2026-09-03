import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Transformer } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { useGridStore } from '../../store/gridStore';
import { Cpu, Search, ArrowUpDown, Filter, ArrowUpRight, Thermometer, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TransformersPage: React.FC = () => {
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [sortBy, setSortBy] = useState<'riskScore' | 'temperatureC' | 'healthScore' | 'utilizationPct'>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { openAssetDrawer } = useGridStore();
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getTransformers().then(setTransformers);
  }, []);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filtered = transformers
    .filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.code.toLowerCase().includes(search.toLowerCase()) ||
        t.feederName.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = selectedRisk === 'ALL' || t.riskLevel === selectedRisk;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === 'desc' ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1);
    });

  const riskLevels = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span>Distribution Transformers Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time thermal telemetry, insulation health scores, vibration sensors, and failure probability rankings.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
          Monitored Units: {transformers.length} Transformers
        </div>
      </div>

      {/* Filter and Search Bar */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by transformer code, name, or feeder..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <span className="text-slate-400 text-[10px] px-2 uppercase">Risk Level:</span>
          {riskLevels.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRisk(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedRisk === r ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Transformers Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Asset Code</th>
                <th className="py-3.5 px-4">Transformer Name</th>
                <th className="py-3.5 px-4">Connected Feeder</th>
                <th className="py-3.5 px-4">Age</th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('utilizationPct')}>
                  <div className="flex items-center gap-1">
                    <span>Load %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('temperatureC')}>
                  <div className="flex items-center gap-1">
                    <span>Winding Temp</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('healthScore')}>
                  <div className="flex items-center gap-1">
                    <span>Health Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('riskScore')}>
                  <div className="flex items-center gap-1">
                    <span>Failure Risk</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Last Service</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((tr) => {
                const isCrit = tr.riskLevel === 'CRITICAL';
                return (
                  <tr
                    key={tr.id}
                    onClick={() => openAssetDrawer(tr)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{tr.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{tr.name}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans">{tr.feederName}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{tr.ageYears} yrs</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{tr.utilizationPct}%</td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className={tr.temperatureC > 75 ? 'text-rose-400 font-bold' : tr.temperatureC > 65 ? 'text-amber-400' : 'text-slate-200'}>
                        {tr.temperatureC}°C
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{tr.healthScore}%</td>
                    <td className="py-3.5 px-4 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          isCrit
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : tr.riskScore > 60
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {tr.riskScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{tr.lastMaintenance}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={tr.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/assets/${tr.id}`);
                        }}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        <span>Telemetry</span>
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
