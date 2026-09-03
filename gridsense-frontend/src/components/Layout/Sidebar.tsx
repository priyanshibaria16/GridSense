import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Building2,
  GitFork,
  Cpu,
  TrendingUp,
  AlertTriangle,
  ZapOff,
  Wrench,
  Flame,
  Sliders,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Leaf,
  FileText,
  Settings,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useGridStore } from '../../store/gridStore';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const { currentUser } = useGridStore();
  const location = useLocation();

  const navGroups = [
    {
      label: 'OVERVIEW',
      roles: ['ADMIN', 'OPERATOR', 'ANALYST'],
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'GRID INFRASTRUCTURE',
      roles: ['ADMIN', 'OPERATOR'],
      items: [
        { to: '/live', label: 'Live Grid Map', icon: MapPin },
        { to: '/substations', label: 'Substations', icon: Building2 },
        { to: '/feeders', label: 'Feeders', icon: GitFork },
        { to: '/transformers', label: 'Transformers', icon: Cpu }
      ]
    },
    {
      label: 'INTELLIGENCE & PREDICTION',
      roles: ['ADMIN', 'OPERATOR', 'ANALYST'],
      items: [
        { to: '/forecast', label: 'Demand Forecast', icon: TrendingUp },
        { to: '/risk', label: 'Asset Risk', icon: AlertTriangle },
        { to: '/anomalies', label: 'Energy Anomalies', icon: Flame },
        { to: '/maintenance', label: 'Predictive Maint.', icon: Wrench }
      ]
    },
    {
      label: 'OPERATIONS',
      roles: ['ADMIN', 'OPERATOR'],
      items: [
        { to: '/outages', label: 'Outage Center', icon: ZapOff },
        { to: '/simulator', label: 'Scenario Simulator', icon: Sliders }
      ]
    },
    {
      label: 'ANALYTICS & ESG',
      roles: ['ADMIN', 'ANALYST'],
      items: [
        { to: '/analytics', label: 'Energy Analytics', icon: BarChart3 },
        { to: '/reliability', label: 'Reliability (IEEE)', icon: ShieldCheck },
        { to: '/sustainability', label: 'Sustainability', icon: Leaf }
      ]
    },
    {
      label: 'AUTONOMOUS AI',
      roles: ['ADMIN', 'OPERATOR', 'ANALYST'],
      items: [
        { to: '/copilot', label: 'GridSense Copilot', icon: Sparkles, badge: 'AI' }
      ]
    },
    {
      label: 'SYSTEM',
      roles: ['ADMIN', 'ANALYST'],
      items: [
        { to: '/reports', label: 'Reports & Export', icon: FileText },
        { to: '/admin', label: 'Admin Console', icon: UserCheck, adminOnly: true },
        { to: '/settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 h-screen z-40 bg-[#07111F] border-r border-white/10 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64 min-w-[250px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-[68px] px-4 flex items-center justify-between border-b border-white/10 bg-slate-900/40">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0">
            ⚡
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-wider text-white">GridSense<span className="text-cyan-400"> AI</span></span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Power Intelligence</span>
            </div>
          )}
        </NavLink>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors hidden lg:block"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => {
          // Check role permissions
          const hasAccess = group.roles.includes(currentUser.role);
          if (!hasAccess && currentUser.role !== 'ADMIN') return null;

          return (
            <div key={gIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2">
                  {group.label}
                </div>
              )}

              {group.items.map((item) => {
                if (item.adminOnly && currentUser.role !== 'ADMIN') return null;
                const Icon = item.icon;
                const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={isCollapsed ? item.label : undefined}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,229,255,0.15)] border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Active Left Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#00E5FF]" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-mono">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* User Info footer */}
      <div className="p-3 border-t border-white/10 bg-slate-900/40">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-slate-800/40 border border-white/5">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-cyan-400 font-mono">{currentUser.role}</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
