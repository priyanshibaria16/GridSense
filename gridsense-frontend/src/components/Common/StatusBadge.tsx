import React from 'react';
import { HealthStatus, RiskLevel } from '../../types';

interface StatusBadgeProps {
  status?: HealthStatus | RiskLevel | 'ACTIVE' | 'DISPATCHED' | 'RESTORING' | 'RESOLVED' | 'DETECTED' | 'INVESTIGATING' | 'CONFIRMED' | 'OVERDUE' | 'SCHEDULED' | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = 'HEALTHY',
  className = '',
  size = 'md'
}) => {
  const norm = String(status).toUpperCase();

  let styles = 'bg-slate-800/80 text-slate-300 border-slate-700/50';
  let dotColor = 'bg-slate-400';

  if (['HEALTHY', 'LOW', 'RESOLVED', 'COMPLETED', 'GRID_OPERATIONAL'].includes(norm)) {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    dotColor = 'bg-emerald-400';
  } else if (['WARNING', 'MEDIUM', 'DISPATCHED', 'INVESTIGATING', 'SCHEDULED', 'HIGH'].includes(norm)) {
    if (['HIGH', 'WARNING'].includes(norm)) {
      styles = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      dotColor = 'bg-amber-400';
    } else {
      styles = 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      dotColor = 'bg-sky-400';
    }
  } else if (['CRITICAL', 'ACTIVE', 'OVERDUE', 'CONFIRMED'].includes(norm)) {
    styles = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    dotColor = 'bg-rose-400 animate-ping';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border uppercase tracking-wider font-mono ${sizeClasses} ${styles} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}></span>
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor.replace(' animate-ping', '')}`}></span>
      </span>
      {norm.replace('_', ' ')}
    </span>
  );
};
