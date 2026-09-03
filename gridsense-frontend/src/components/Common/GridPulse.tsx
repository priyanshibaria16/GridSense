import React from 'react';
import { Activity, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { DashboardSummary } from '../../types';

interface GridPulseProps {
  pulse: DashboardSummary['gridPulse'];
}

export const GridPulse: React.FC<GridPulseProps> = ({ pulse }) => {
  return (
    <div className="w-full glass-panel-glow rounded-xl p-3 px-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-cyan-400 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-slate-900/90">
      {/* Left: Status & ECG line */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
              GRID OPERATIONAL
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.2 rounded font-mono">
              50.02 Hz STABLE
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Continuous telemetry sync active</span>
        </div>

        {/* Animated ECG Waveform */}
        <div className="hidden md:block w-28 h-6 ml-2 opacity-85">
          <svg viewBox="0 0 120 24" className="w-full h-full">
            <path
              d="M 0 12 L 25 12 L 32 4 L 40 20 L 48 2 L 56 18 L 62 12 L 85 12 L 92 6 L 98 16 L 105 12 L 120 12"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg"
            />
          </svg>
        </div>
      </div>

      {/* Right: Quick telemetry metrics */}
      <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-slate-400 text-[10px]">CURRENT LOAD</div>
            <div className="text-white font-bold">{pulse.loadMw} MW</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-slate-400 text-[10px]">GRID HEALTH</div>
            <div className="text-emerald-400 font-bold">{pulse.gridHealthPct}%</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <div>
            <div className="text-slate-400 text-[10px]">SYSTEM RISK</div>
            <div className="text-cyan-300 font-bold">{pulse.riskStatus}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <div>
            <div className="text-slate-400 text-[10px]">ACTIVE OUTAGES</div>
            <div className="text-amber-400 font-bold">{pulse.activeOutagesCount} Feeder(s)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
