import React from 'react';
import { CopilotChat } from '../../components/Copilot/CopilotChat';
import { Sparkles, Cpu, Activity, Database, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../../components/Common/GlassCard';

export const CopilotPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span>GridSense Autonomous Copilot</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Natural language interface connected directly to live SCADA telemetry, regression models, and outage dispatch databases.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LLM Telemetry Reasoner Active</span>
        </div>
      </div>

      {/* Main Copilot Chat Workspace */}
      <CopilotChat />
    </div>
  );
};
