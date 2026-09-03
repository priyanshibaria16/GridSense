import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Sparkline } from './Sparkline';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string | number;
  isPositiveGood?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  sparklineData?: number[];
  subtitle?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  change,
  isPositiveGood = true,
  icon: Icon,
  iconColor = 'text-cyan-400',
  sparklineData = [45, 52, 48, 60, 58, 65, 72],
  subtitle,
  onClick
}) => {
  const isChangePositive = typeof change === 'number' ? change >= 0 : String(change).startsWith('+');
  const isGood = isPositiveGood ? isChangePositive : !isChangePositive;

  return (
    <GlassCard glow="blue" onClick={onClick} className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">{value}</span>
            {unit && <span className="text-sm font-medium text-slate-400 font-sans">{unit}</span>}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg bg-slate-900/60 border border-white/5 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
        {change !== undefined ? (
          <div className="flex items-center gap-1 text-xs font-medium">
            <span
              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
                isGood
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isChangePositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {typeof change === 'number' ? `${change > 0 ? '+' : ''}${change}%` : change}
            </span>
            <span className="text-slate-400 text-[11px] ml-1">vs baseline</span>
          </div>
        ) : (
          <span className="text-[11px] text-slate-400">{subtitle || 'Nominal operational status'}</span>
        )}

        <div className="w-20 h-6">
          <Sparkline data={sparklineData} color={isGood ? '#10B981' : '#F59E0B'} />
        </div>
      </div>
    </GlassCard>
  );
};
