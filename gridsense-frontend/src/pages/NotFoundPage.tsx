import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, ArrowLeft, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
        <AlertOctagon className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">404 — Grid Node Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">
        The requested grid operations route or telemetry endpoint does not exist or has been decommissioned.
      </p>
      <div className="flex gap-3 pt-2">
        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
