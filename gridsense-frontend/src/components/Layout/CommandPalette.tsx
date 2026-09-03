import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Flame,
  Sliders,
  Sparkles,
  FileText,
  Building2,
  GitFork,
  Cpu,
  Moon,
  Sun,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import { useGridStore } from '../../store/gridStore';
import { MOCK_TRANSFORMERS, MOCK_FEEDERS, MOCK_SUBSTATIONS } from '../../services/mockData';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    openAssetDrawer,
    toggleTheme,
    theme
  } = useGridStore();

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickNav = [
    { label: 'Operations Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Live Grid Map & Telemetry', path: '/live', icon: MapPin, category: 'Navigation' },
    { label: 'Demand Forecasting Studio', path: '/forecast', icon: TrendingUp, category: 'Navigation' },
    { label: 'Asset Failure Risk Ranking', path: '/risk', icon: AlertTriangle, category: 'Navigation' },
    { label: 'Energy Anomaly Detection', path: '/anomalies', icon: Flame, category: 'Navigation' },
    { label: 'Scenario Simulator', path: '/simulator', icon: Sliders, category: 'Navigation' },
    { label: 'GridSense Copilot Assistant', path: '/copilot', icon: Sparkles, category: 'Navigation' },
    { label: 'Outage Management Center', path: '/outages', icon: ZapOff, category: 'Navigation' },
    { label: 'Substations Directory', path: '/substations', icon: Building2, category: 'Navigation' },
    { label: 'Feeders Directory', path: '/feeders', icon: GitFork, category: 'Navigation' },
    { label: 'Transformers Directory', path: '/transformers', icon: Cpu, category: 'Navigation' },
    { label: 'Generate & Export Reports', path: '/reports', icon: FileText, category: 'Navigation' }
  ];

  const filteredNav = quickNav.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const matchedTransformers = MOCK_TRANSFORMERS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.code.toLowerCase().includes(query.toLowerCase())
  );

  const matchedFeeders = MOCK_FEEDERS.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.code.toLowerCase().includes(query.toLowerCase())
  );

  const matchedSubstations = MOCK_SUBSTATIONS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-[#0B1727] rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search assets, feeders, substations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-400"
          />
          <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] text-slate-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs">
          {/* System Actions */}
          <div>
            <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
              Quick Actions
            </div>
            <button
              onClick={() => {
                toggleTheme();
                setCommandPaletteOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
              <span>Toggle Theme ({theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})</span>
            </button>
          </div>

          {/* Navigation Items */}
          {filteredNav.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                Pages & Workspaces
              </div>
              <div className="space-y-1">
                {filteredNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent transition-all text-left"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="flex-1 font-medium">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.path}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Transformers */}
          {matchedTransformers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                Transformers ({matchedTransformers.length})
              </div>
              <div className="space-y-1">
                {matchedTransformers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      openAssetDrawer(t);
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="font-semibold text-white">{t.code}</span> — {t.name}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        t.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {t.riskScore}% Risk
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Feeders */}
          {matchedFeeders.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                Feeders ({matchedFeeders.length})
              </div>
              <div className="space-y-1">
                {matchedFeeders.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      navigate('/feeders');
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="font-semibold text-white">{f.code}</span> — {f.name}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">{f.utilizationPct}% Util</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrows, press Enter to select</span>
          <span className="font-mono text-cyan-400">⚡ GridSense Command Core</span>
        </div>
      </div>
    </div>
  );
};
