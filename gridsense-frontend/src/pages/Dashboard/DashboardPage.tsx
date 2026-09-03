import React, { useEffect, useState } from 'react';
import { useGridStore } from '../../store/gridStore';
import { apiService } from '../../services/api';
import {
  Substation,
  Feeder,
  Transformer,
  Outage
} from '../../types';
import { GridPulse } from '../../components/Common/GridPulse';
import { KpiCard } from '../../components/Common/KpiCard';
import { DemandForecastCard } from '../../components/Dashboard/DemandForecastCard';
import { GridHealthGauge } from '../../components/Dashboard/GridHealthGauge';
import { NeedsAttentionPanel } from '../../components/Dashboard/NeedsAttentionPanel';
import { AiInsightsFeed } from '../../components/Dashboard/AiInsightsFeed';
import { GridMap } from '../../components/Maps/GridMap';
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  ZapOff,
  Cpu,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { summary, fetchSummary } = useGridStore();
  const navigate = useNavigate();

  const [substations, setSubstations] = useState<Substation[]>([]);
  const [feeders, setFeeders] = useState<Feeder[]>([]);
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [outages, setOutages] = useState<Outage[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    fetchSummary();
    apiService.getSubstations().then(setSubstations);
    apiService.getFeeders().then(setFeeders);
    apiService.getTransformers().then(setTransformers);
    apiService.getOutages().then(setOutages);

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchSummary]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Operations Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Grid Operations Overview</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              LIVE SCADA TELEMETRY
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visibility into grid performance, demand forecast, transformer health, and outage intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-300 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-bold">{currentTime}</span>
        </div>
      </div>

      {/* Grid Pulse ECG Banner */}
      <GridPulse pulse={summary.gridPulse} />

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <KpiCard
          title="Current Load"
          value={summary.kpis.currentLoadMw}
          unit="MW"
          change={summary.kpis.currentLoadChangePct}
          isPositiveGood={false}
          icon={Zap}
          iconColor="text-cyan-400"
          sparklineData={[72, 74, 78, 80, 81.5, 82.4]}
          onClick={() => navigate('/forecast')}
        />

        <KpiCard
          title="Peak Demand"
          value={summary.kpis.peakDemandMw}
          unit="MW"
          subtitle={`Exp. at ${summary.kpis.peakTime}`}
          icon={TrendingUp}
          iconColor="text-amber-400"
          sparklineData={[80, 84, 88, 92, 95, 97.8]}
          onClick={() => navigate('/forecast')}
        />

        <KpiCard
          title="Active Outages"
          value={summary.kpis.activeOutages}
          unit="Feeders"
          change={summary.kpis.outageChangeCount}
          isPositiveGood={true}
          icon={ZapOff}
          iconColor="text-rose-400"
          sparklineData={[6, 5, 5, 4, 4, 4]}
          onClick={() => navigate('/outages')}
        />

        <KpiCard
          title="High-Risk Assets"
          value={summary.kpis.highRiskAssets}
          unit="Units"
          subtitle="Critical priority: 3"
          icon={AlertTriangle}
          iconColor="text-rose-400"
          sparklineData={[19, 18, 18, 17, 17, 17]}
          onClick={() => navigate('/risk')}
        />

        <KpiCard
          title="Energy Today"
          value={summary.kpis.energyTodayGwh}
          unit="GWh"
          subtitle="Carbon: 1.9kt CO2"
          icon={Layers}
          iconColor="text-blue-400"
          sparklineData={[0.4, 0.9, 1.4, 1.9, 2.4, 2.84]}
          onClick={() => navigate('/analytics')}
        />

        <KpiCard
          title="Grid Health"
          value={summary.kpis.gridHealthPct}
          unit="%"
          change={summary.kpis.healthChangePct}
          isPositiveGood={true}
          icon={ShieldCheck}
          iconColor="text-emerald-400"
          sparklineData={[90.2, 90.8, 91.0, 91.2, 91.4, 91.4]}
          onClick={() => navigate('/live')}
        />
      </div>

      {/* Main Grid: Left (2/3) & Right (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Forecast & Live Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Demand Forecast Chart */}
          <DemandForecastCard />

          {/* Live Geospatial Grid Map */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <h3 className="text-base font-bold text-white tracking-wide">Live Geospatial Distribution Grid</h3>
              </div>
              <button
                onClick={() => navigate('/live')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Expand Full Screen Map →
              </button>
            </div>

            <GridMap
              substations={substations}
              feeders={feeders}
              transformers={transformers}
              outages={outages}
              height="h-[400px]"
            />
          </div>
        </div>

        {/* Right Column: Health Gauge, Needs Attention, AI Insights */}
        <div className="space-y-6">
          {/* Circular Health Gauge */}
          <GridHealthGauge
            distribution={summary.healthDistribution}
            healthScore={summary.gridPulse.gridHealthPct}
          />

          {/* Operator Needs Attention Panel */}
          <NeedsAttentionPanel items={summary.needsAttention} />

          {/* Autonomous AI Insights */}
          <AiInsightsFeed insights={summary.aiInsights} />
        </div>
      </div>
    </div>
  );
};
