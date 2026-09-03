import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Substation, Feeder, Transformer, Outage } from '../../types';
import { GridMap } from '../../components/Maps/GridMap';
import { GlassCard } from '../../components/Common/GlassCard';
import { MapPin, Building2, GitFork, Cpu, ZapOff, Layers, Search, RefreshCw } from 'lucide-react';
import { useGridStore } from '../../store/gridStore';

export const LiveGridPage: React.FC = () => {
  const [substations, setSubstations] = useState<Substation[]>([]);
  const [feeders, setFeeders] = useState<Feeder[]>([]);
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [outages, setOutages] = useState<Outage[]>([]);
  const [loading, setLoading] = useState(true);

  const { openAssetDrawer } = useGridStore();

  const loadData = () => {
    setLoading(true);
    Promise.all([
      apiService.getSubstations(),
      apiService.getFeeders(),
      apiService.getTransformers(),
      apiService.getOutages()
    ]).then(([subs, fds, trs, outs]) => {
      setSubstations(subs);
      setFeeders(fds);
      setTransformers(trs);
      setOutages(outs);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span>Live Geospatial Power Grid</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time GIS map displaying substations, 11kV feeder lines, distribution transformers, and active fault boundaries.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          Refresh GIS Telemetry
        </button>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <GlassCard className="p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Substations</div>
            <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">{substations.length} Active</div>
          </div>
          <Building2 className="w-5 h-5 text-cyan-400 opacity-70" />
        </GlassCard>

        <GlassCard className="p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Feeders Monitored</div>
            <div className="text-xl font-bold font-mono text-blue-400 mt-0.5">{feeders.length} Lines</div>
          </div>
          <GitFork className="w-5 h-5 text-blue-400 opacity-70" />
        </GlassCard>

        <GlassCard className="p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Distribution Units</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{transformers.length} Units</div>
          </div>
          <Cpu className="w-5 h-5 text-emerald-400 opacity-70" />
        </GlassCard>

        <GlassCard className="p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Active Faults</div>
            <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">{outages.length} Outages</div>
          </div>
          <ZapOff className="w-5 h-5 text-rose-400 opacity-70" />
        </GlassCard>
      </div>

      {/* Map View Full Area */}
      <GridMap
        substations={substations}
        feeders={feeders}
        transformers={transformers}
        outages={outages}
        height="h-[620px]"
        onSelectTransformer={openAssetDrawer}
      />
    </div>
  );
};
