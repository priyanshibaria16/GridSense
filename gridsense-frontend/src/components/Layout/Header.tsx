import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Shield,
  LogOut,
  Command,
  Check,
  ChevronDown
} from 'lucide-react';
import { useGridStore } from '../../store/gridStore';
import { UserRole } from '../../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const {
    currentUser,
    switchRole,
    logout,
    theme,
    toggleTheme,
    setCommandPaletteOpen,
    setNotificationDrawerOpen,
    summary
  } = useGridStore();

  const [isRoleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'ADMIN', title: 'Administrator', desc: 'Full system control & configs' },
    { role: 'OPERATOR', title: 'Grid Operator', desc: 'Real-time dispatch & switching' },
    { role: 'ANALYST', title: 'Power Analyst', desc: 'Forecasting, ML & reports' }
  ];

  return (
    <header className="h-[68px] sticky top-0 z-30 bg-[#07111F]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col">
        <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
          {title || 'Grid Operations Center'}
        </h1>
        {subtitle && <p className="text-[11px] text-slate-400 hidden sm:block">{subtitle}</p>}
      </div>

      {/* Global Quick Search Button (triggers Command Palette) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/70 border border-white/10 text-slate-400 text-xs hover:border-cyan-500/40 hover:text-slate-200 transition-all shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search assets, feeders, substations, outages...</span>
          </div>
          <kbd className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] font-mono text-slate-300">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* System Status & Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold">GRID OPERATIONAL</span>
        </div>

        {/* Demo Mode Badge */}
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono hidden lg:inline">
          DEMO DATA
        </span>

        {/* Notification Bell */}
        <button
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-white/5"
          title="Notifications & Alerts"
        >
          <Bell className="w-4 h-4" />
          {summary.needsAttention.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#07111F] animate-pulse" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-white/5"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Role Switcher & User Menu */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-colors"
          >
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-cyan-400/40"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-white leading-tight">{currentUser.name.split(' ')[0]}</div>
              <div className="text-[10px] text-cyan-400 font-mono leading-tight">{currentUser.role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 glass-panel-glow bg-[#0B1727] rounded-xl shadow-2xl border border-white/10 p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="p-2 border-b border-white/10 mb-1">
                <div className="text-xs font-bold text-white">{currentUser.name}</div>
                <div className="text-[11px] text-slate-400">{currentUser.email}</div>
              </div>

              <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 px-2 py-1 font-semibold">
                Switch Role / View
              </div>

              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    switchRole(r.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                    currentUser.role === r.role ? 'bg-cyan-500/15 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 mt-0.5 text-cyan-400 shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-[10px] text-slate-400">{r.desc}</div>
                  </div>
                  {currentUser.role === r.role && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}

              <div className="border-t border-white/10 mt-1 pt-1">
                <button
                  onClick={() => {
                    logout();
                    setRoleDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
