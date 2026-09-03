import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { CommandPalette } from './components/Layout/CommandPalette';
import { NotificationCenter } from './components/Layout/NotificationCenter';
import { AssetDrawer } from './components/Maps/AssetDrawer';

import { LandingPage } from './pages/Landing/LandingPage';
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { LiveGridPage } from './pages/LiveGrid/LiveGridPage';
import { SubstationsPage } from './pages/Substations/SubstationsPage';
import { FeedersPage } from './pages/Feeders/FeedersPage';
import { TransformersPage } from './pages/Transformers/TransformersPage';
import { AssetDetailPage } from './pages/AssetDetail/AssetDetailPage';
import { DemandForecastPage } from './pages/Forecast/DemandForecastPage';
import { AssetRiskPage } from './pages/AssetRisk/AssetRiskPage';
import { AnomaliesPage } from './pages/Anomalies/AnomaliesPage';
import { MaintenancePage } from './pages/Maintenance/MaintenancePage';
import { OutagesPage } from './pages/Outages/OutagesPage';
import { SimulatorPage } from './pages/Simulator/SimulatorPage';
import { CopilotPage } from './pages/Copilot/CopilotPage';
import { EnergyAnalyticsPage } from './pages/Analytics/EnergyAnalyticsPage';
import { SustainabilityPage } from './pages/Sustainability/SustainabilityPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { useGridStore } from './store/gridStore';
import './index.css';

// Enterprise Main App Layout
const AppLayout: React.FC<{ children: React.ReactNode; pageTitle?: string; pageSubtitle?: string }> = ({
  children,
  pageTitle,
  pageSubtitle
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#07111F] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* 250px Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 68px Header */}
        <Header title={pageTitle} subtitle={pageSubtitle} />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>

      {/* Global Modals, Drawers & Palette */}
      <CommandPalette />
      <NotificationCenter />
      <AssetDrawer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing & Login */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Operational Routes */}
        <Route
          path="/dashboard"
          element={
            <AppLayout
              pageTitle="Grid Operations Overview"
              pageSubtitle="Real-time SCADA telemetry, demand forecast, and equipment health"
            >
              <DashboardPage />
            </AppLayout>
          }
        />

        <Route
          path="/live"
          element={
            <AppLayout
              pageTitle="Live Geospatial Grid"
              pageSubtitle="Interactive dark GIS layer with substations, feeders, and transformers"
            >
              <LiveGridPage />
            </AppLayout>
          }
        />

        <Route
          path="/substations"
          element={
            <AppLayout
              pageTitle="Substations Directory"
              pageSubtitle="Primary transmission and distribution step-down substations"
            >
              <SubstationsPage />
            </AppLayout>
          }
        />

        <Route
          path="/feeders"
          element={
            <AppLayout
              pageTitle="Feeders & Trunks"
              pageSubtitle="11kV & 22kV feeder line loading ratios, current draw, and power factor"
            >
              <FeedersPage />
            </AppLayout>
          }
        />

        <Route
          path="/transformers"
          element={
            <AppLayout
              pageTitle="Distribution Transformers"
              pageSubtitle="Asset health scores, winding thermal limits, and failure probabilities"
            >
              <TransformersPage />
            </AppLayout>
          }
        />

        <Route
          path="/assets/:id"
          element={
            <AppLayout
              pageTitle="Asset Diagnostics & Telemetry"
              pageSubtitle="Detailed transformer sensor history and AI failure prevention recommendations"
            >
              <AssetDetailPage />
            </AppLayout>
          }
        />

        <Route
          path="/forecast"
          element={
            <AppLayout
              pageTitle="Demand Forecasting Studio"
              pageSubtitle="XGBoost & Prophet ensemble predicting multi-step electricity load"
            >
              <DemandForecastPage />
            </AppLayout>
          }
        />

        <Route
          path="/risk"
          element={
            <AppLayout
              pageTitle="Asset Failure Risk Intelligence"
              pageSubtitle="Supervised Random Forest risk prediction and load-vs-temperature matrix"
            >
              <AssetRiskPage />
            </AppLayout>
          }
        />

        <Route
          path="/anomalies"
          element={
            <AppLayout
              pageTitle="Energy Anomaly Detection Center"
              pageSubtitle="Isolation Forest unsupervised outlier engine identifying load abnormalities"
            >
              <AnomaliesPage />
            </AppLayout>
          }
        />

        <Route
          path="/maintenance"
          element={
            <AppLayout
              pageTitle="Predictive Maintenance Operations"
              pageSubtitle="Condition-based work orders and oil dielectric testing schedule"
            >
              <MaintenancePage />
            </AppLayout>
          }
        />

        <Route
          path="/outages"
          element={
            <AppLayout
              pageTitle="Outage Management & Reliability"
              pageSubtitle="Active fault tracking, crew restoration dispatch, and IEEE SAIDI/SAIFI analytics"
            >
              <OutagesPage />
            </AppLayout>
          }
        />

        <Route
          path="/reliability"
          element={
            <AppLayout
              pageTitle="IEEE Grid Reliability Metrics"
              pageSubtitle="System Average Interruption Duration & Frequency Indices (SAIDI / SAIFI)"
            >
              <OutagesPage />
            </AppLayout>
          }
        />

        <Route
          path="/simulator"
          element={
            <AppLayout
              pageTitle="Grid Scenario Simulator"
              pageSubtitle="What-if power flow stress testing across heatwaves, EV spikes, and industrial shifts"
            >
              <SimulatorPage />
            </AppLayout>
          }
        />

        <Route
          path="/copilot"
          element={
            <AppLayout
              pageTitle="GridSense Copilot AI"
              pageSubtitle="Natural language reasoning assistant connected to live SCADA streams"
            >
              <CopilotPage />
            </AppLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <AppLayout
              pageTitle="Energy Analytics & Load Profiles"
              pageSubtitle="Sectoral demand stacks, zonal energy delivered, and peak trajectories"
            >
              <EnergyAnalyticsPage />
            </AppLayout>
          }
        />

        <Route
          path="/sustainability"
          element={
            <AppLayout
              pageTitle="Grid Sustainability & Carbon Offset"
              pageSubtitle="Transmission loss mitigation and peak shaving carbon avoidance estimation"
            >
              <SustainabilityPage />
            </AppLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <AppLayout
              pageTitle="Reports & Compliance Export"
              pageSubtitle="Generate PDF operational audit dossiers and downloadable CSV sheets"
            >
              <ReportsPage />
            </AppLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AppLayout
              pageTitle="Admin Console & Security"
              pageSubtitle="User access control, role permissions, and immutable audit logs"
            >
              <AdminPage />
            </AppLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <AppLayout
              pageTitle="Platform Settings"
              pageSubtitle="SCADA polling frequency, visual theme, and alert thresholds"
            >
              <SettingsPage />
            </AppLayout>
          }
        />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <AppLayout pageTitle="Not Found">
              <NotFoundPage />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
