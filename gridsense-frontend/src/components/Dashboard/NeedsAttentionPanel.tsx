import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../Common/GlassCard';
import { StatusBadge } from '../Common/StatusBadge';
import { DashboardSummary } from '../../types';
import { AlertCircle, ArrowUpRight, Flame, ShieldAlert, ZapOff } from 'lucide-react';

interface NeedsAttentionPanelProps {
  items: DashboardSummary['needsAttention'];
}

export const NeedsAttentionPanel: React.FC<NeedsAttentionPanelProps> = ({ items }) => {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'TRANSFORMER_RISK':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'FEEDER_OVERLOAD':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'OUTAGE_EVENT':
        return <ZapOff className="w-4 h-4 text-rose-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <GlassCard className="flex flex-col space-y-3.5">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Operator Attention Feed</h3>
            <p className="text-[11px] text-slate-400">Prioritized triage ranked by ML severity</p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
          {items.length} ACTIVE INCIDENTS
        </span>
      </div>

      {/* Items List */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const isCrit = item.severity === 'CRITICAL';
          const isHigh = item.severity === 'HIGH';

          return (
            <div
              key={item.id}
              onClick={() => navigate(item.actionRoute)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between gap-2 ${
                isCrit
                  ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                  : isHigh
                  ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-slate-900/50 border-white/10 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getIcon(item.type)}
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </span>
                </div>
                <StatusBadge status={item.severity} size="sm" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                <span className="font-mono font-bold text-cyan-400">{item.metric}</span>
                <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-cyan-300 font-medium">
                  Dispatch action
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
