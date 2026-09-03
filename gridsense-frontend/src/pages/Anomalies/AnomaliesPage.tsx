import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { AnomalyRecord } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { AnomalyTrendChart } from '../../components/Charts/AnomalyTrendChart';
import { Modal } from '../../components/Common/Modal';
import { Flame, Search, Filter, AlertTriangle, CheckCircle2, RefreshCw, User, Zap } from 'lucide-react';

export const AnomaliesPage: React.FC = () => {
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyRecord | null>(null);

  const loadData = () => {
    apiService.getAnomalies().then(setAnomalies);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: AnomalyRecord['status']) => {
    await apiService.updateAnomalyStatus(id, newStatus);
    loadData();
    if (selectedAnomaly && selectedAnomaly.id === id) {
      setSelectedAnomaly({ ...selectedAnomaly, status: newStatus });
    }
  };

  const filtered = anomalies.filter((a) => {
    const matchesSearch =
      a.consumerName.toLowerCase().includes(search.toLowerCase()) ||
      a.consumerId.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase());
    const matchesSev = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    return matchesSearch && matchesSev;
  });

  const severities = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-6 h-6 text-rose-400" />
            <span>Energy Anomaly Detection Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Isolation Forest unsupervised outlier engine identifying power theft, meter tampering, and abrupt load surges.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Refresh Ingestion Stream</span>
        </button>
      </div>

      {/* Top 4 Anomaly Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Detected Today</div>
          <div className="text-2xl font-extrabold font-mono text-white">{anomalies.length} Incidents</div>
          <span className="text-[10px] text-cyan-400 font-mono">Stream Active</span>
        </GlassCard>

        <GlassCard glow="red" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Critical Severity</div>
          <div className="text-2xl font-extrabold font-mono text-rose-400">
            {anomalies.filter((a) => a.severity === 'CRITICAL').length} Units
          </div>
          <span className="text-[10px] text-rose-400 font-mono">&gt; 300% Deviation</span>
        </GlassCard>

        <GlassCard glow="amber" className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Under Investigation</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400">
            {anomalies.filter((a) => a.status === 'INVESTIGATING').length} Active
          </div>
          <span className="text-[10px] text-amber-400 font-mono">Field Crew Assigned</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Resolved Cases</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            {anomalies.filter((a) => a.status === 'RESOLVED').length} Cases
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Normalized metering</span>
        </GlassCard>
      </div>

      {/* Ingestion Trend Chart */}
      <AnomalyTrendChart />

      {/* Anomaly Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by consumer name, consumer ID, or anomaly code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <span className="text-slate-400 text-[10px] px-2 uppercase">Severity:</span>
            {severities.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSeverity(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSeverity === s ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Event Code</th>
                  <th className="py-3.5 px-4">Consumer</th>
                  <th className="py-3.5 px-4">Sector</th>
                  <th className="py-3.5 px-4">Pattern Classification</th>
                  <th className="py-3.5 px-4">Expected</th>
                  <th className="py-3.5 px-4">Actual</th>
                  <th className="py-3.5 px-4">Deviation</th>
                  <th className="py-3.5 px-4">Anomaly Score</th>
                  <th className="py-3.5 px-4">Severity</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Triage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedAnomaly(a)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{a.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{a.consumerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{a.consumerId}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">{a.consumerCategory}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">{a.type}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{a.expectedConsumptionKwh} kWh</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{a.actualConsumptionKwh} kWh</td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={a.deviationPct > 0 ? 'text-rose-400' : 'text-amber-400'}>
                        {a.deviationPct > 0 ? `+${a.deviationPct}` : a.deviationPct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold">{a.anomalyScore}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={a.severity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={a.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold">
                        Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Anomaly Inspection Modal */}
      {selectedAnomaly && (
        <Modal
          isOpen={Boolean(selectedAnomaly)}
          onClose={() => setSelectedAnomaly(null)}
          title={`Anomaly Triage: ${selectedAnomaly.code}`}
          subtitle={`${selectedAnomaly.consumerName} (${selectedAnomaly.consumerId})`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Detection Pattern:</span>
                <StatusBadge status={selectedAnomaly.severity} />
              </div>
              <div className="text-base font-bold text-white">{selectedAnomaly.type}</div>
              <p className="text-xs text-slate-300">{selectedAnomaly.notes}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Expected Baseload</span>
                <div className="text-lg font-bold font-mono text-slate-300 mt-0.5">{selectedAnomaly.expectedConsumptionKwh} kWh</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Actual Measured Ingestion</span>
                <div className="text-lg font-bold font-mono text-rose-400 mt-0.5">{selectedAnomaly.actualConsumptionKwh} kWh</div>
              </div>
            </div>

            {/* Change Status Workflow */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">Update Resolution Workflow:</span>
              <div className="flex flex-wrap gap-2">
                {(['DETECTED', 'INVESTIGATING', 'CONFIRMED', 'RESOLVED', 'FALSE_POSITIVE'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedAnomaly.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedAnomaly.status === st
                        ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
