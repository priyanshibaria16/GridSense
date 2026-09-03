import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { useGridStore } from '../../store/gridStore';
import { Sliders, Thermometer, Home, Factory, Zap, Calendar, Play, RefreshCw } from 'lucide-react';

export const SimulationSliders: React.FC = () => {
  const { simulationParams, setSimulationParams, runSimulation, isSimulating } = useGridStore();

  return (
    <GlassCard className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Simulation Parameter Controls</h3>
            <p className="text-xs text-slate-400">Configure operating stresses and demand offsets</p>
          </div>
        </div>

        <button
          onClick={() =>
            setSimulationParams({
              temperatureChangeC: 0,
              residentialDemandDeltaPct: 0,
              industrialDemandDeltaPct: 0,
              isHoliday: false,
              evChargingSpikePct: 0,
              peakLoadHour: 19
            })
          }
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Defaults
        </button>
      </div>

      {/* Slider Controls */}
      <div className="space-y-5">
        {/* 1. Temperature Change */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Ambient Temperature Delta</span>
            </div>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                simulationParams.temperatureChangeC > 0
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : simulationParams.temperatureChangeC < 0
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {simulationParams.temperatureChangeC > 0 ? `+${simulationParams.temperatureChangeC}` : simulationParams.temperatureChangeC}°C
            </span>
          </div>
          <input
            type="range"
            min="-10"
            max="15"
            step="1"
            value={simulationParams.temperatureChangeC}
            onChange={(e) => setSimulationParams({ temperatureChangeC: Number(e.target.value) })}
            className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-10°C (Cold snap)</span>
            <span>0°C (Baseline 34°C)</span>
            <span>+15°C (Heatwave 49°C)</span>
          </div>
        </div>

        {/* 2. Residential Demand Delta */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Residential Sector Demand Offset</span>
            </div>
            <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 text-xs">
              {simulationParams.residentialDemandDeltaPct > 0 ? `+${simulationParams.residentialDemandDeltaPct}` : simulationParams.residentialDemandDeltaPct}%
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="30"
            step="1"
            value={simulationParams.residentialDemandDeltaPct}
            onChange={(e) => setSimulationParams({ residentialDemandDeltaPct: Number(e.target.value) })}
            className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-20% (Conservation)</span>
            <span>0% (Baseline)</span>
            <span>+30% (High AC load)</span>
          </div>
        </div>

        {/* 3. Industrial Demand Delta */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Factory className="w-4 h-4 text-amber-400" />
              <span>Industrial Sector Demand Offset</span>
            </div>
            <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 text-xs">
              {simulationParams.industrialDemandDeltaPct > 0 ? `+${simulationParams.industrialDemandDeltaPct}` : simulationParams.industrialDemandDeltaPct}%
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="30"
            step="1"
            value={simulationParams.industrialDemandDeltaPct}
            onChange={(e) => setSimulationParams({ industrialDemandDeltaPct: Number(e.target.value) })}
            className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-20% (Plant shutdown)</span>
            <span>0% (Standard shifts)</span>
            <span>+30% (Overtime surge)</span>
          </div>
        </div>

        {/* 4. EV Fast Charging Concurrent Load */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Concurrent EV Charging Spike</span>
            </div>
            <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 text-xs">
              +{simulationParams.evChargingSpikePct}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={simulationParams.evChargingSpikePct}
            onChange={(e) => setSimulationParams({ evChargingSpikePct: Number(e.target.value) })}
            className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* 5. Holiday Mode Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-xs font-semibold text-white">Public Holiday Mode</div>
              <div className="text-[10px] text-slate-400">Industrial loads drop; daytime residential increases</div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={simulationParams.isHoliday}
              onChange={(e) => setSimulationParams({ isHoliday: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      </div>

      {/* Execute Button */}
      <button
        onClick={() => runSimulation()}
        disabled={isSimulating}
        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-50 uppercase tracking-wider font-mono"
      >
        {isSimulating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-black" />
            <span>Computing Power Flow Equations...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-black" />
            <span>Run Grid Stress Simulation</span>
          </>
        )}
      </button>
    </GlassCard>
  );
};
