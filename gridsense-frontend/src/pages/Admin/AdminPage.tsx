import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { AuditLogItem, User } from '../../types';
import { GlassCard } from '../../components/Common/GlassCard';
import { StatusBadge } from '../../components/Common/StatusBadge';
import { DEMO_USERS } from '../../services/mockData';
import { useGridStore } from '../../store/gridStore';
import {
  UserCheck,
  Shield,
  Clock,
  Database,
  Activity,
  Server,
  RefreshCw,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const { currentUser, switchRole } = useGridStore();

  useEffect(() => {
    apiService.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-cyan-400" />
            <span>Admin Console & System Security</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            User access control, role permissions, telemetry ingest config, and immutable security audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>RBAC Enforcement Active</span>
        </div>
      </div>

      {/* User Management & Role Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profiles */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-wide">Authorized Platform Operators</h3>
              <span className="text-xs font-mono text-slate-400">Role-Based Access Control</span>
            </div>

            <div className="space-y-3">
              {DEMO_USERS.map((u) => {
                const isCurrent = currentUser.id === u.id;
                return (
                  <div
                    key={u.id}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                        : 'bg-slate-900/60 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-xl object-cover border border-cyan-500/30"
                      />
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{u.name}</span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500 text-black font-extrabold">
                              CURRENT SESSION
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={u.role} size="sm" />
                      {!isCurrent && (
                        <button
                          onClick={() => switchRole(u.role)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-mono transition-colors"
                        >
                          Switch to User
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* System Topology Health */}
        <div>
          <GlassCard className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide">System Services Health</h3>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">PostgreSQL Primary</div>
                  <div className="text-[10px] text-slate-400">Port 5432 / 12 Connection Pools</div>
                </div>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Python ML Microservice</div>
                  <div className="text-[10px] text-slate-400">FastAPI / Uvicorn Port 8000</div>
                </div>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Node.js Express API</div>
                  <div className="text-[10px] text-slate-400">REST Gateway Port 5000</div>
                </div>
                <span className="text-emerald-400 font-bold">HEALTHY</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Immutable System Audit Trail</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Cryptographically signed logs</span>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Operator</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Action Summary</th>
                  <th className="py-3.5 px-4">Event Details</th>
                  <th className="py-3.5 px-4 text-right">Source IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400">{l.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-white">{l.user}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={l.role} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-cyan-400">{l.category}</td>
                    <td className="py-3 px-4 font-semibold text-slate-200">{l.action}</td>
                    <td className="py-3 px-4 text-slate-400 max-w-sm truncate">{l.details}</td>
                    <td className="py-3 px-4 text-right text-slate-500">{l.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
