import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { Sparkles, ArrowRight, Zap, TrendingUp, Cpu, ShieldCheck } from 'lucide-react';
import { DashboardSummary } from '../../types';
import { useNavigate } from 'react-router-dom';

interface AiInsightsFeedProps {
  insights: DashboardSummary['aiInsights'];
}

export const AiInsightsFeed: React.FC<AiInsightsFeedProps> = ({ insights }) => {
  const navigate = useNavigate();

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'DEMAND':
        return { label: 'DEMAND FORECAST', icon: TrendingUp, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
      case 'ASSET':
        return { label: 'ASSET RISK', icon: Cpu, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'EFFICIENCY':
        return { label: 'GRID EFFICIENCY', icon: Zap, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      default:
        return { label: 'OPERATIONS', icon: ShieldCheck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
    }
  };

  return (
    <GlassCard className="flex flex-col space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Autonomous AI Insights</h3>
            <p className="text-[11px] text-slate-400">Continuous pattern extraction across grid telemetry</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/copilot')}
          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          <span>Ask Copilot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Insight items */}
      <div className="space-y-2.5">
        {insights.map((item) => {
          const cat = getCategoryBadge(item.category);
          const Icon = cat.icon;

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-bold border ${cat.color}`}>
                  <Icon className="w-3 h-3" />
                  {cat.label}
                </span>
                <span className="text-slate-500 font-mono">{item.timestamp}</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">{item.insight}</p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
