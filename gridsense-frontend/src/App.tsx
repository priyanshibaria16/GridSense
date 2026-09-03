import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'

/*
  Phase 1 App.tsx: lightweight Router + inline components (Sidebar, Header, Landing, Login, Dashboard)
  This is a compact scaffold to get the UI structure in place for further development.
*/

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 min-w-[250px] bg-[var(--bg-2)] h-screen p-5 flex flex-col" aria-label="Sidebar">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--card)] rounded flex items-center justify-center text-[var(--primary)]">⚡</div>
          <div>
            <div className="text-white font-semibold">GridSense AI</div>
            <div className="text-xs text-[var(--muted)]">Power Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/live" label="Live Grid" />
        <NavItem to="/substations" label="Substations" />
        <NavItem to="/feeders" label="Feeders" />
        <NavItem to="/forecast" label="Demand Forecast" />
      </nav>

      <div className="mt-auto text-[var(--muted)] text-xs">
        GridSense AI uses public & synthetic datasets for demonstration purposes.
      </div>
    </aside>
  )
}

const NavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  return (
    <Link to={to} className="block px-3 py-2 rounded-md text-white hover:bg-white/5">
      {label}
    </Link>
  )
}

const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-transparent border-b border-[var(--border)]">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white">{title ?? 'Grid Operations Overview'}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-[var(--muted)] flex items-center gap-2">
          <span className="text-green-400">●</span>
          <span>GRID OPERATIONAL</span>
        </div>
        <button className="p-2 rounded-md bg-[var(--card)] text-[var(--muted)]">🔔</button>
        <button className="p-2 rounded-md bg-[var(--card)] text-[var(--muted)]">🌓</button>
        <div className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-white">A</div>
      </div>
    </header>
  )
}

const Landing: React.FC = () => (
  <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--bg)]">
    <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white">See the Grid Before It Becomes a Problem.</h1>
        <p className="mt-4 text-[var(--muted)]">AI-powered forecasting, asset intelligence and grid analytics for smarter energy operations.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/dashboard" className="px-5 py-3 rounded-md bg-[var(--primary)] text-black font-semibold">Explore Platform</Link>
          <a href="#architecture" className="px-5 py-3 rounded-md bg-[var(--card)] text-white">View Architecture</a>
        </div>
      </div>

      <div>
        <div className="bg-[var(--card)] rounded-lg p-4 shadow-sm">
          <div className="h-64 flex items-center justify-center text-[var(--muted)]">Animated dashboard preview (placeholder)</div>
        </div>
      </div>
    </section>
  </main>
)

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-[var(--card)] rounded-lg overflow-hidden">
        <div className="p-8 bg-gradient-to-b from-[#07111F] to-[var(--bg-2)] flex flex-col justify-center">
          <div className="text-white text-2xl font-semibold">⚡ GridSense AI</div>
          <div className="text-sm text-[var(--muted)] mt-2">Power Intelligence — Demo Login</div>
        </div>
        <div className="p-8">
          <form className="space-y-4">
            <div>
              <label className="text-sm text-[var(--muted)]">Email</label>
              <input className="mt-1 w-full px-3 py-2 rounded bg-[var(--bg)] border border-[var(--border)] text-white" />
            </div>
            <div>
              <label className="text-sm text-[var(--muted)]">Password</label>
              <input type="password" className="mt-1 w-full px-3 py-2 rounded bg-[var(--bg)] border border-[var(--border)] text-white" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-[var(--muted)]"><input type="checkbox" className="mr-2" />Remember me</label>
              <a className="text-sm text-[var(--primary)]" href="#">Demo accounts</a>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 rounded bg-[var(--primary)] text-black font-semibold">Login</button>
              <button className="px-4 py-2 rounded bg-[var(--card)] text-white">Demo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-[var(--card)] rounded p-4 text-white">Main dashboard area (charts, map, KPIs will be added)</div>
        </div>
        <div>
          <div className="bg-[var(--card)] rounded p-4 text-white">Needs Attention / AI Insights</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 min-h-screen flex flex-col">
                <Header />
                <Dashboard />
              </div>
            </div>
          }
        />
        <Route path="*" element={<div className="p-6 text-white">Not found — <Link to="/">Go home</Link></div>} />
      </Routes>
    </BrowserRouter>
  )
}
