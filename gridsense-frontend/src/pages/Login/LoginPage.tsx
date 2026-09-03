import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGridStore } from '../../store/gridStore';
import { apiService } from '../../services/api';
import { DEMO_USERS } from '../../services/mockData';
import { Shield, Lock, Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { DatasetDisclaimer } from '../../components/Common/DatasetDisclaimer';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useGridStore();

  const [email, setEmail] = useState('admin@gridsense.ai');
  const [password, setPassword] = useState('gridsense2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await apiService.login(email);
      setUser(res.user);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials or connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (userEmail: string) => {
    setIsLoading(true);
    setEmail(userEmail);
    try {
      const res = await apiService.login(userEmail);
      setUser(res.user);
      navigate('/dashboard');
    } catch {
      setError('Unable to login with demo credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex items-center justify-center p-4 sm:p-6 selection:bg-cyan-500 selection:text-black">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl glass-panel-glow overflow-hidden border border-white/10 shadow-2xl">
        {/* Left Side: Enterprise Brand Showcase */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#07111F] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                ⚡
              </div>
              <div>
                <div className="text-xl font-extrabold text-white tracking-wider">GridSense <span className="text-cyan-400">AI</span></div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">Power Intelligence</div>
              </div>
            </Link>

            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Enterprise Grid Command Center
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authorized operator access for predictive operations, real-time transformer telemetry, load forecasting, and emergency dispatch.
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 my-8 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">✓</span> 94.6% Time-Series Forecast Accuracy
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">✓</span> Sub-second Anomaly Telemetry Streams
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">✓</span> Role-Based Access Control (Admin/Op/Analyst)
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            Security Status: 256-bit Encrypted Session
          </div>
        </div>

        {/* Right Side: Login Form & Quick Demo Switches */}
        <div className="p-8 sm:p-12 flex flex-col justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white tracking-wide">Operator Sign In</h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                JWT SECURED
              </span>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:border-cyan-400"
                    placeholder="operator@gridsense.ai"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:border-cyan-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-cyan-400 rounded bg-slate-800"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-cyan-400 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-50"
              >
                {isLoading ? 'Authenticating...' : 'Sign In to Command Center'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Access Switcher */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold mb-3">
                ⚡ Quick 1-Click Demo Accounts:
              </div>

              <div className="grid grid-cols-3 gap-2">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.role}
                    onClick={() => handleQuickDemo(u.email)}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500/15 hover:border-cyan-500/40 border border-white/5 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                      {u.role}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{u.name.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <DatasetDisclaimer />
          </div>
        </div>
      </div>
    </div>
  );
};
