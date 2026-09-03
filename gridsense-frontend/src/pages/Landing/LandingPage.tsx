import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  AlertTriangle,
  Flame,
  ZapOff,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Database,
  Server,
  Layers,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { DatasetDisclaimer } from '../../components/Common/DatasetDisclaimer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      title: 'Demand Forecasting',
      desc: 'Predict upcoming electricity loads using XGBoost & Prophet multi-variable temporal ensemble models.',
      icon: TrendingUp,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/40'
    },
    {
      title: 'Asset Intelligence',
      desc: 'Identify at-risk transformers and feeders with Random Forest risk classification and thermal telemetry.',
      icon: AlertTriangle,
      color: 'text-amber-400',
      border: 'hover:border-amber-500/40'
    },
    {
      title: 'Anomaly Detection',
      desc: 'Detect unscheduled surges, nighttime deviations, and power factor abnormalities with Isolation Forests.',
      icon: Flame,
      color: 'text-rose-400',
      border: 'hover:border-rose-500/40'
    },
    {
      title: 'Outage Analytics',
      desc: 'Understand outage frequency, affected customers, crew dispatch, and IEEE SAIDI/SAIFI reliability standards.',
      icon: ZapOff,
      color: 'text-purple-400',
      border: 'hover:border-purple-500/40'
    },
    {
      title: 'Scenario Simulation',
      desc: 'Test what-if grid conditions across heatwaves, holiday loads, and EV spikes before they happen.',
      icon: Sliders,
      color: 'text-blue-400',
      border: 'hover:border-blue-500/40'
    },
    {
      title: 'GridSense Copilot',
      desc: 'Autonomous natural language operational assistant capable of reasoning over real-time grid telemetry.',
      icon: Sparkles,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/40'
    }
  ];

  const technologies = [
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Leaflet',
    'Recharts',
    'Framer Motion',
    'Node.js',
    'Express',
    'Prisma ORM',
    'PostgreSQL',
    'Python FastAPI',
    'scikit-learn',
    'XGBoost',
    'Prophet',
    'Docker'
  ];

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <header className="h-20 border-b border-white/10 px-6 lg:px-16 flex items-center justify-between bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            ⚡
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white">GridSense <span className="text-cyan-400">AI</span></span>
            <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest">Power Intelligence</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-slate-300">
          <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
          <a href="#problem" className="hover:text-cyan-400 transition-colors">Evolution</a>
          <a href="#technology" className="hover:text-cyan-400 transition-colors">Stack</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-transparent transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all uppercase tracking-wider font-mono flex items-center gap-1.5"
          >
            <span>Launch Operations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 pt-16 pb-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>NEXT-GEN UTILITY GRID COMMAND CENTER</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1]">
          See the Grid <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Before It Becomes</span> a Problem.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          AI-powered demand forecasting, asset failure risk intelligence, outage analytics, and physics-informed grid simulations for smarter energy operations.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-8 py-4 rounded-xl text-sm font-extrabold bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all font-mono uppercase tracking-wider flex items-center gap-2"
          >
            <span>Explore Live Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#architecture"
            className="px-8 py-4 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-all font-mono uppercase tracking-wider"
          >
            View Architecture
          </a>
        </div>

        {/* Hero Interactive Dashboard Preview Window */}
        <div className="mt-14 w-full glass-panel-glow rounded-2xl p-4 sm:p-6 border border-cyan-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-bold text-white">GridSense Autonomous Operations Engine — Node Cluster 01</span>
            </div>
            <span className="text-emerald-400 font-bold hidden sm:inline">● 50.02 Hz | 82.4 MW ACTIVE LOAD</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">24H DEMAND FORECAST</span>
              <div className="text-2xl font-bold font-mono text-white">97.8 MW Peak</div>
              <p className="text-xs text-slate-400">Predicted at 19:30 (+18.7% above baseline) driven by evening cooling demand.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">ASSET FAILURE RISK</span>
              <div className="text-2xl font-bold font-mono text-rose-400">TR-104 (87%)</div>
              <p className="text-xs text-slate-400">Winding temperature 78.4°C at 92% load. 412 days without oil dielectric test.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">CO2 PEAK SHIFTING</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">91.4% Health</div>
              <p className="text-xs text-slate-400">12 substations online. Zero cascading trips detected in last 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — Evolution: Traditional vs GridSense */}
      <section id="problem" className="px-6 lg:px-16 py-20 border-t border-white/10 bg-slate-950/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              From Reactive Monitoring to Predictive Operations
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Traditional SCADA tools display what already failed. GridSense AI models what will happen next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="p-6 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-4">
              <div className="text-rose-400 font-mono font-bold text-xs uppercase tracking-widest">
                Traditional SCADA & Grid Dashboards
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60">
                  <span className="text-rose-400">✕</span> Raw telemetry alerts only after breaker trips
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60">
                  <span className="text-rose-400">✕</span> Manual Excel load forecasting and rough estimation
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60">
                  <span className="text-rose-400">✕</span> Reactive maintenance after asset breakdown
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60">
                  <span className="text-rose-400">✕</span> Disconnected outage logs with manual consumer callbacks
                </div>
              </div>
            </div>

            {/* GridSense */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4 shadow-[0_0_30px_rgba(0,229,255,0.08)]">
              <div className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-widest">
                ⚡ GridSense AI Autonomous Platform
              </div>
              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-variable XGBoost/Prophet demand forecasting
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Random Forest asset failure probability (0-100%)
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Real-time what-if scenario stress testing engine
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Context-aware LLM Copilot for natural language triage
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — 6 Capabilities */}
      <section id="capabilities" className="px-6 lg:px-16 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">PLATFORM SUITE</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Enterprise Power Grid Capabilities
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Engineered for utility operators, transmission planners, and energy data analysts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className={`glass-panel p-6 rounded-2xl border transition-all duration-300 space-y-3 ${c.border}`}
                >
                  <div className={`p-3 rounded-xl bg-slate-900/80 w-fit border border-white/5 ${c.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">{c.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Architecture Dataflow */}
      <section id="architecture" className="px-6 lg:px-16 py-20 border-t border-white/10 bg-slate-950/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">SYSTEM ARCHITECTURE</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              End-to-End Data Pipeline
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Real-time telemetry and geospatial layers streaming through machine learning inference to operational actions.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center font-mono text-xs">
            <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 text-center space-y-2">
              <Database className="w-6 h-6 text-cyan-400 mx-auto" />
              <div className="font-bold text-white">Data Sources</div>
              <div className="text-[10px] text-slate-400">Weather + Telemetry + Synthetic SCADA</div>
            </div>

            <div className="text-center text-cyan-400 font-bold text-lg hidden md:block">➔</div>

            <div className="p-4 rounded-xl glass-panel border border-purple-500/20 text-center space-y-2">
              <Cpu className="w-6 h-6 text-purple-400 mx-auto" />
              <div className="font-bold text-white">ML Inference API</div>
              <div className="text-[10px] text-slate-400">FastAPI + XGBoost + Prophet</div>
            </div>

            <div className="text-center text-cyan-400 font-bold text-lg hidden md:block">➔</div>

            <div className="p-4 rounded-xl glass-panel border border-emerald-500/20 text-center space-y-2">
              <Activity className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="font-bold text-white">Node.js Core</div>
              <div className="text-[10px] text-slate-400">Express + Prisma ORM + RBAC</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Technology Badges */}
      <section id="technology" className="px-6 lg:px-16 py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">BUILT WITH ENTERPRISE TECHNOLOGIES</span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-cyan-300 font-medium hover:border-cyan-500/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Dataset Notice & Footer */}
      <footer className="mt-auto border-t border-white/10 bg-slate-950 px-6 lg:px-16 py-8 space-y-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-bold">
              ⚡
            </div>
            <span className="font-extrabold text-sm tracking-wider text-white">GridSense AI Platform</span>
          </div>

          <DatasetDisclaimer className="max-w-2xl" />

          <div className="text-xs text-slate-500 font-mono">
            © 2026 GridSense AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
