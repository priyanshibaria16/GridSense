import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Outage, Substation, Feeder, Transformer } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { OutageCauseChart } from '../../components/Charts/OutageCauseChart';
import { GridMap } from '../../components/Maps/GridMap';
import {
  ZapOff,
  Clock,
  Users,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const OutagesPage: React.FC = () => {
  const [outages, setOutages] = useState<Outage[]>([]);
  const [substations, setSubstations] = useState<Substation[]>([]);
  const [feeders, setFeeders] = useState<Feeder[]>([]);
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      apiService.getOutages(),
      apiService.getSubstations(),
      apiService.getFeeders(),
      apiService.getTransformers()
    ]).then(([outs, subs, fds, trs]) => {
      setOutages(outs);
      setSubstations(subs);
      setFeeders(fds);
      setTransformers(trs);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalAffectedConsumers = outages.reduce((acc, o) => acc + o.affectedConsumers, 0);

  const handleStatusChange = async (id: string, status: Outage['status']) => {
    await apiService.updateOutageStatus(id, status);
    loadData();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ZapOff className="w-6 h-6 text-rose-400" />
            <span>Outage Management & Restoration Operations</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time fault tracking, field crew dispatch tracking, and consumer restoration estimation.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh OMS Feed</span>
        </button>
      </div>

      {/* Top 4 Outage KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard glow="red" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Active Faults</div>
          <div className="text-2xl font-extrabold font-mono text-rose-400">{outages.length} Feeders</div>
          <span className="text-[10px] text-rose-400 font-mono">Restoration In Progress</span>
        </GlassCard>

        <GlassCard glow="amber" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Affected Consumers</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400">
            {totalAffectedConsumers.toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-400 font-mono">Total load: 11.5 MW</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Restoration Time</div>
          <div className="text-2xl font-extrabold font-mono text-cyan-400">42 Mins</div>
          <span className="text-[10px] text-emerald-400 font-mono">-14.5m vs historical</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Resolved Today</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">6 Events</div>
          <span className="text-[10px] text-emerald-400 font-mono">100% within SLA</span>
        </GlassCard>
      </div>

      {/* Outage Map & Cause Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-white tracking-wide">Geospatial Outage Cluster Boundary</h3>
            <span className="text-xs font-mono text-rose-400">Pulsing markers denote active trips</span>
          </div>
          <GridMap
            substations={substations}
            feeders={feeders}
            transformers={transformers}
            outages={outages}
            height="h-[380px]"
          />
        </div>

        <div>
          <OutageCauseChart />
        </div>
      </div>

      {/* Active Outage Records Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <h3 className="text-sm font-bold text-white tracking-wide">Live Incident Incident Queue</h3>
          <span className="text-xs font-mono text-cyan-400">Real-Time SCADA Trip Events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Outage Code</th>
                <th className="py-3.5 px-4">Feeder Trunk</th>
                <th className="py-3.5 px-4">Substation</th>
                <th className="py-3.5 px-4">Trip Time</th>
                <th className="py-3.5 px-4">Root Cause</th>
                <th className="py-3.5 px-4">Affected Consumers</th>
                <th className="py-3.5 px-4">Est. Restoration</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {outages.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-400">{o.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{o.feederName}</td>
                  <td className="py-3.5 px-4 text-slate-300">{o.substationName}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{o.startTime.split(' ')[1]}</td>
                  <td className="py-3.5 px-4 text-slate-200">{o.cause}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{o.affectedConsumers}</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold">{o.estimatedRestorationTime.split(' ')[1]}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={o.priority} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={o.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {o.status !== 'RESOLVED' ? (
                        <button
                          onClick={() => handleStatusChange(o.id, 'RESOLVED')}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 font-mono font-bold text-[10px] transition-colors"
                        >
                          Mark Restored
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">Restored</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
