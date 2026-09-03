import React from 'react';
import { Drawer } from '../Common/Drawer';
import { StatusBadge } from '../Common/StatusBadge';
import { useGridStore } from '../../store/gridStore';
import {
  Cpu,
  Thermometer,
  Zap,
  Activity,
  AlertTriangle,
  Clock,
  Wrench,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

export const AssetDrawer: React.FC = () => {
  const { selectedAsset, isAssetDrawerOpen, closeAssetDrawer } = useGridStore();
  const navigate = useNavigate();

  if (!selectedAsset) return null;

  const isCritical = selectedAsset.riskLevel === 'CRITICAL';

  return (
    <Drawer
      isOpen={isAssetDrawerOpen}
      onClose={closeAssetDrawer}
      title={`${selectedAsset.code} — Telemetry Diagnostics`}
      subtitle={`${selectedAsset.name} | ${selectedAsset.feederName}`}
      width="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div
          className={`p-4 rounded-xl border ${
            isCritical
              ? 'bg-rose-950/20 border-rose-500/30'
              : 'bg-slate-900/60 border-white/10'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Asset Classification: {selectedAsset.zone} Zone
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">{selectedAsset.name}</h3>
              <p className="text-xs text-slate-400">Connected to Substation: {selectedAsset.substationName}</p>
            </div>
            <StatusBadge status={selectedAsset.riskLevel} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/5">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Health Score</div>
              <div className="text-xl font-bold font-mono text-emerald-400">{selectedAsset.healthScore}%</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Failure Risk</div>
              <div
                className={`text-xl font-bold font-mono ${
                  isCritical ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                }`}
              >
                {selectedAsset.riskScore}%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Load Ratio</div>
              <div className="text-xl font-bold font-mono text-white">{selectedAsset.utilizationPct}%</div>
            </div>
          </div>
        </div>

        {/* AI Operational Recommendation */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI PREDICTIVE RECOMMENDATION</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">{selectedAsset.aiRecommendation}</p>
        </div>

        {/* Real-time Telemetry Metrics Grid */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Real-time Sensor Telemetry
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                <span>Winding Temp</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">{selectedAsset.temperatureC}°C</div>
              <span className="text-[10px] text-slate-400">Max limit: 85°C</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Current Voltage</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">{selectedAsset.voltageKv} kV</div>
              <span className="text-[10px] text-slate-400">Dev: +{selectedAsset.voltageDeviationPct}%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Current Draw</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">{selectedAsset.currentAmps} A</div>
              <span className="text-[10px] text-slate-400">Rated: 350 A</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Power Factor</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">{selectedAsset.powerFactor}</div>
              <span className="text-[10px] text-slate-400">Target: &gt; 0.90</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Asset Age</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">{selectedAsset.ageYears} yrs</div>
              <span className="text-[10px] text-slate-400">Design: 25 yrs</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Wrench className="w-3.5 h-3.5 text-purple-400" />
                <span>Oil Level</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">{selectedAsset.oilLevelPct}%</div>
              <span className="text-[10px] text-slate-400">Vibration: {selectedAsset.vibrationMmS} mm/s</span>
            </div>
          </div>
        </div>

        {/* Telemetry History Chart */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Today's Telemetry Trend (Load vs Temperature)
          </h4>

          <div className="h-44 w-full p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedAsset.history} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1727',
                    borderColor: 'rgba(0, 229, 255, 0.3)',
                    fontSize: '11px',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="load" stroke="#00E5FF" strokeWidth={2} name="Load %" dot={false} />
                <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} name="Temp °C" dot={false} />
                <Line type="monotone" dataKey="risk" stroke="#F59E0B" strokeWidth={2} strokeDasharray="3 3" name="Risk %" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Contributing Risk Factors */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            ML Feature Importance Drivers
          </h4>

          <div className="space-y-2">
            {selectedAsset.topContributingFactors.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-900/40 border border-white/5">
                <span className="text-slate-300">{item.factor}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${item.impact}%` }} />
                  </div>
                  <span className="font-mono text-cyan-300 font-semibold w-8 text-right">+{item.impact}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-white/10 flex gap-3">
          <button
            onClick={() => {
              closeAssetDrawer();
              navigate(`/assets/${selectedAsset.id}`);
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            <span>Open Comprehensive Diagnostics</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Drawer>
  );
};
