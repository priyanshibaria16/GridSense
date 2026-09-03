import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { Transformer } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import {
  Cpu,
  Thermometer,
  Zap,
  Activity,
  AlertTriangle,
  Clock,
  Wrench,
  Sparkles,
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Transformer | null>(null);
  const [isDispatched, setIsDispatched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      apiService.getAssetById(id).then((res) => {
        if (res) setAsset(res);
      });
    }
  }, [id]);

  if (!asset) {
    return (
      <div className="p-8 text-center text-white">
        <p>Loading asset telemetry...</p>
      </div>
    );
  }

  const isCritical = asset.riskLevel === 'CRITICAL';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Navigation & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {asset.code} — {asset.name}
              </h2>
              <StatusBadge status={asset.riskLevel} />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Substation: <strong>{asset.substationName}</strong> | Feeder: <strong>{asset.feederName}</strong> | Zone: <strong>{asset.zone}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDispatched(true)}
            disabled={isDispatched}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] disabled:opacity-50"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{isDispatched ? 'Inspection Crew Dispatched' : 'Dispatch Field Inspection'}</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Health Score</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">{asset.healthScore}%</div>
          <span className="text-[10px] text-slate-400">Insulation index</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1" glow={isCritical ? 'red' : 'amber'}>
          <div className="text-[10px] font-mono text-slate-400 uppercase">Failure Risk Probability</div>
          <div className={`text-2xl font-extrabold font-mono ${isCritical ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
            {asset.riskScore}%
          </div>
          <span className="text-[10px] text-rose-400 font-mono">Next 30 Days Forecast</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Current Loading</div>
          <div className="text-2xl font-extrabold font-mono text-white">{asset.utilizationPct}%</div>
          <span className="text-[10px] text-slate-400 font-mono">{asset.currentLoadKva} / {asset.capacityKva} kVA</span>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Winding Temperature</div>
          <div className={`text-2xl font-extrabold font-mono ${asset.temperatureC > 75 ? 'text-rose-400' : 'text-white'}`}>
            {asset.temperatureC}°C
          </div>
          <span className="text-[10px] text-slate-400">Threshold: 85.0°C</span>
        </GlassCard>
      </div>

      {/* AI Recommendation Banner */}
      <GlassCard className="p-5 bg-cyan-950/20 border-cyan-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AUTONOMOUS AI DIAGNOSTIC & MAINTENANCE PROTOCOL</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{asset.aiRecommendation}</p>
      </GlassCard>

      {/* Charts & Sensor Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2/3): Telemetry Trends Chart */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-wide">Historical Telemetry Stream</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400">Today's Operating Envelope</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={asset.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="timestamp" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1727',
                      borderColor: 'rgba(0, 229, 255, 0.3)',
                      fontSize: '12px',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                  <Line type="monotone" dataKey="load" name="Load Ratio (%)" stroke="#00E5FF" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="risk" name="Risk %" stroke="#F59E0B" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Maintenance & Failure Logs */}
          <GlassCard className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Inspection & Failure Event History</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Last Dielectric Oil Test</div>
                  <div className="text-[11px] text-slate-400">Service completed on {asset.lastMaintenance}</div>
                </div>
                <span className="font-mono text-cyan-400">{asset.daysSinceMaintenance} days ago</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Next Scheduled Overhaul</div>
                  <div className="text-[11px] text-slate-400">Routine preventive check</div>
                </div>
                <span className={`font-mono font-bold ${asset.nextInspectionDue.includes('OVERDUE') ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {asset.nextInspectionDue}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Historical Failure Count</div>
                  <div className="text-[11px] text-slate-400">Total recorded trip incidents in lifetime</div>
                </div>
                <span className="font-mono font-bold text-amber-400">{asset.failureCount} Trip Events</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right (1/3): Detailed Specs & Contributing Factors */}
        <div className="space-y-6">
          <GlassCard className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide">Physical & Electrical Specs</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Capacity Rating</span>
                <span className="font-mono font-bold text-white">{asset.capacityKva} kVA</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Operating Voltage</span>
                <span className="font-mono font-bold text-white">{asset.voltageKv} kV (dev +{asset.voltageDeviationPct}%)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Current Draw</span>
                <span className="font-mono font-bold text-white">{asset.currentAmps} A</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Power Factor</span>
                <span className="font-mono font-bold text-white">{asset.powerFactor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Asset Age</span>
                <span className="font-mono font-bold text-white">{asset.ageYears} Years</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Oil Level Index</span>
                <span className="font-mono font-bold text-white">{asset.oilLevelPct}%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Mechanical Vibration</span>
                <span className="font-mono font-bold text-white">{asset.vibrationMmS} mm/s</span>
              </div>
            </div>
          </GlassCard>

          {/* Contributing Risk Factors */}
          <GlassCard className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide">ML Risk Attribution</h3>
            <p className="text-xs text-slate-400">Primary feature importances contributing to failure score</p>

            <div className="space-y-2.5 pt-1">
              {asset.topContributingFactors.map((f, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{f.factor}</span>
                    <span className="font-mono text-cyan-400 font-bold">+{f.impact}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${f.impact}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
