import React, { useState } from 'react';
import { GlassCard } from '../../components/Common/GlassCard';
import { useGridStore } from '../../store/gridStore';
import { Settings, Moon, Sun, Bell, Shield, Database, Save, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useGridStore();
  const [telemetryInterval, setTelemetryInterval] = useState('5');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>Platform Configuration & Preferences</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage SCADA ingestion polling rates, alerting thresholds, and visual themes.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Preferences Saved' : 'Save Configuration'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Visual Appearance */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <span>Visual Display & Theme</span>
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <div className="text-sm font-semibold text-white">Color Theme</div>
              <div className="text-xs text-slate-400">Enterprise High-Contrast Dark Mode / Light Mode</div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-colors border border-white/10"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
              <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </GlassCard>

        {/* Telemetry Ingestion */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white tracking-wide">SCADA Telemetry Streams</h3>

          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <div className="text-sm font-semibold text-white">Live Telemetry Sync Interval</div>
              <div className="text-xs text-slate-400">Frequency of polling substation and transformer RTUs</div>
            </div>
            <select
              value={telemetryInterval}
              onChange={(e) => setTelemetryInterval(e.target.value)}
              className="glass-input px-3 py-1.5 rounded-lg text-white font-mono text-xs"
            >
              <option value="1" className="bg-slate-900">1 Second (High Frequency)</option>
              <option value="5" className="bg-slate-900">5 Seconds (Nominal)</option>
              <option value="15" className="bg-slate-900">15 Seconds (Conserve Bandwidth)</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
              <div className="text-sm font-semibold text-white">Automated Breaker Dispatch Recommendations</div>
              <div className="text-xs text-slate-400">Allow AI to compute automated tie-breaker switching configurations</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-semibold text-white">Critical Thermal Email Alerts</div>
              <div className="text-xs text-slate-400">Broadcast immediate email notification when transformer temp exceeds 75°C</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
