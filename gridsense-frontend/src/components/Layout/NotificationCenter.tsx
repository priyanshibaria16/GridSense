import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '../Common/Drawer';
import { StatusBadge } from '../Common/StatusBadge';
import { useGridStore } from '../../store/gridStore';
import { AlertTriangle, Zap, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setNotificationDrawerOpen,
    summary,
    openAssetDrawer
  } = useGridStore();
  const navigate = useNavigate();

  const handleAction = (item: (typeof summary.needsAttention)[0]) => {
    setNotificationDrawerOpen(false);
    if (item.actionRoute.startsWith('/assets/')) {
      navigate('/transformers');
    } else {
      navigate(item.actionRoute);
    }
  };

  return (
    <Drawer
      isOpen={isNotificationDrawerOpen}
      onClose={() => setNotificationDrawerOpen(false)}
      title="Grid Alerts & Notifications"
      subtitle="Prioritized real-time operational notifications and telemetry deviations"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs text-slate-400 font-mono">
          <span>ACTIVE INCIDENTS ({summary.needsAttention.length})</span>
          <span className="text-cyan-400">AUTOMATED DISPATCH ACTIVE</span>
        </div>

        {summary.needsAttention.map((item) => {
          const isCrit = item.severity === 'CRITICAL';
          const isHigh = item.severity === 'HIGH';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isCrit
                  ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
                  : isHigh
                  ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50'
                  : 'bg-slate-900/40 border-white/10 hover:border-cyan-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {isCrit ? (
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                </div>
                <StatusBadge status={item.severity} size="sm" />
              </div>

              <p className="text-xs text-slate-300 mb-3">{item.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs font-mono font-semibold text-cyan-400">{item.metric}</span>
                <button
                  onClick={() => handleAction(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                  <span>Investigate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* AI Insight Feed in notifications */}
        <div className="pt-4 border-t border-white/10">
          <div className="text-xs font-mono font-bold text-slate-400 mb-3 uppercase tracking-wider">
            AI Automated Observations
          </div>

          <div className="space-y-2.5">
            {summary.aiInsights.map((insight) => (
              <div key={insight.id} className="p-3 rounded-lg bg-slate-900/60 border border-white/5 text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="text-cyan-400 font-mono font-bold">{insight.category}</span>
                  <span>{insight.timestamp}</span>
                </div>
                <p className="text-slate-200">{insight.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
