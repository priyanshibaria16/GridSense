import React from 'react';
import { AlertCircle, RefreshCw, Layers } from 'lucide-react';

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string; className?: string }> = ({
  rows = 4,
  height = 'h-12',
  className = ''
}) => {
  return (
    <div className={`space-y-3 w-full animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`w-full ${height} bg-slate-800/40 rounded-lg border border-white/5`} />
      ))}
    </div>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, description, icon, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/30">
      <div className="p-4 rounded-full bg-slate-800/60 border border-white/10 text-cyan-400 mb-4">
        {icon || <Layers className="w-8 h-8" />}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mt-1 mb-5">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message = 'Unable to load grid telemetry data.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center border border-red-500/20 rounded-2xl bg-red-950/20">
      <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 mb-3 border border-rose-500/20">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-white">Data Connection Error</h3>
      <p className="text-xs text-slate-400 mt-1 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-white/10 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Connection
        </button>
      )}
    </div>
  );
};
