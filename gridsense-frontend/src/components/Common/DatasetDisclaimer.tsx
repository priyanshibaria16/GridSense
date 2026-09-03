import React from 'react';
import { Info } from 'lucide-react';

export const DatasetDisclaimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/5 text-slate-400 text-xs ${className}`}
    >
      <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span>
        <strong>Notice:</strong> GridSense AI uses public and synthetically generated datasets for demonstration purposes and is not connected to confidential utility operational systems.
      </span>
    </div>
  );
};
