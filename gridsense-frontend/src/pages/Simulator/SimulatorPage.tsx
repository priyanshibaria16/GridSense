import React, { useEffect } from 'react';
import { useGridStore } from '../../store/gridStore';
import { SimulationSliders } from '../../components/Simulator/SimulationSliders';
import { SimulationResultCard } from '../../components/Simulator/SimulationResultCard';
import { Sliders, Sparkles, Activity, ShieldCheck, Flame, Info } from 'lucide-react';

export const SimulatorPage: React.FC = () => {
  const { simulationResult, runSimulation } = useGridStore();

  useEffect(() => {
    if (!simulationResult) {
      runSimulation();
    }
  }, [simulationResult, runSimulation]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <span>Grid Scenario Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Test how changing ambient temperatures, EV charging adoption spikes, and industrial shift patterns affect power flow stability.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SIGNATURE POWER FLOW ENGINE</span>
        </div>
      </div>

      {/* Simulator Layout: Sliders (1/3) and Results (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SimulationSliders />
        </div>

        <div className="lg:col-span-2">
          <SimulationResultCard result={simulationResult} />
        </div>
      </div>
    </div>
  );
};
