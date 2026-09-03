import axios from 'axios';
import {
  Substation,
  Feeder,
  Transformer,
  Outage,
  ForecastSummary,
  AnomalyRecord,
  MaintenanceRecord,
  DashboardSummary,
  SimulationParams,
  SimulationResult,
  CopilotMessage,
  ReliabilityMetrics,
  AuditLogItem,
  User,
  UserRole
} from '../types';
import {
  MOCK_SUBSTATIONS,
  MOCK_FEEDERS,
  MOCK_TRANSFORMERS,
  MOCK_OUTAGES,
  MOCK_FORECASTS,
  MOCK_ANOMALIES,
  MOCK_MAINTENANCE,
  MOCK_DASHBOARD_SUMMARY,
  MOCK_RELIABILITY,
  MOCK_AUDIT_LOGS,
  DEMO_USERS
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('gridsense_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Auth API
  async login(email: string, role?: UserRole): Promise<{ user: User; token: string }> {
    try {
      const res = await apiClient.post('/auth/login', { email, role });
      return res.data;
    } catch {
      // Fallback demo login
      const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || DEMO_USERS[0];
      const token = 'demo-jwt-token-xyz-' + matched.role.toLowerCase();
      localStorage.setItem('gridsense_token', token);
      localStorage.setItem('gridsense_user', JSON.stringify(matched));
      return { user: matched, token };
    }
  },

  async getCurrentUser(): Promise<User> {
    const saved = localStorage.getItem('gridsense_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS[0];
      }
    }
    return DEMO_USERS[0];
  },

  // Dashboard API
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const res = await apiClient.get('/dashboard/summary');
      return res.data;
    } catch {
      return MOCK_DASHBOARD_SUMMARY;
    }
  },

  // Substations API
  async getSubstations(): Promise<Substation[]> {
    try {
      const res = await apiClient.get('/substations');
      return res.data;
    } catch {
      return MOCK_SUBSTATIONS;
    }
  },

  // Feeders API
  async getFeeders(): Promise<Feeder[]> {
    try {
      const res = await apiClient.get('/feeders');
      return res.data;
    } catch {
      return MOCK_FEEDERS;
    }
  },

  // Transformers API
  async getTransformers(): Promise<Transformer[]> {
    try {
      const res = await apiClient.get('/transformers');
      return res.data;
    } catch {
      return MOCK_TRANSFORMERS;
    }
  },

  async getAssetById(id: string): Promise<Transformer | undefined> {
    try {
      const res = await apiClient.get(`/assets/${id}`);
      return res.data;
    } catch {
      return MOCK_TRANSFORMERS.find((t) => t.id === id || t.code.toLowerCase() === id.toLowerCase());
    }
  },

  // Outages API
  async getOutages(): Promise<Outage[]> {
    try {
      const res = await apiClient.get('/outages');
      return res.data;
    } catch {
      return MOCK_OUTAGES;
    }
  },

  async updateOutageStatus(id: string, status: Outage['status']): Promise<Outage> {
    try {
      const res = await apiClient.patch(`/outages/${id}`, { status });
      return res.data;
    } catch {
      const outage = MOCK_OUTAGES.find((o) => o.id === id);
      if (outage) outage.status = status;
      return outage || MOCK_OUTAGES[0];
    }
  },

  // Forecast API
  async getForecast(horizon: '1H' | '6H' | '24H' | '7D' | '30D' = '24H'): Promise<ForecastSummary> {
    try {
      const res = await apiClient.get(`/forecast?horizon=${horizon}`);
      return res.data;
    } catch {
      return MOCK_FORECASTS[horizon] || MOCK_FORECASTS['24H'];
    }
  },

  // Anomalies API
  async getAnomalies(): Promise<AnomalyRecord[]> {
    try {
      const res = await apiClient.get('/anomalies');
      return res.data;
    } catch {
      return MOCK_ANOMALIES;
    }
  },

  async updateAnomalyStatus(id: string, status: AnomalyRecord['status']): Promise<AnomalyRecord> {
    try {
      const res = await apiClient.patch(`/anomalies/${id}`, { status });
      return res.data;
    } catch {
      const anom = MOCK_ANOMALIES.find((a) => a.id === id);
      if (anom) anom.status = status;
      return anom || MOCK_ANOMALIES[0];
    }
  },

  // Maintenance API
  async getMaintenance(): Promise<MaintenanceRecord[]> {
    try {
      const res = await apiClient.get('/maintenance');
      return res.data;
    } catch {
      return MOCK_MAINTENANCE;
    }
  },

  // Reliability Metrics API
  async getReliabilityMetrics(): Promise<ReliabilityMetrics> {
    try {
      const res = await apiClient.get('/analytics/reliability');
      return res.data;
    } catch {
      return MOCK_RELIABILITY;
    }
  },

  // Audit Logs API
  async getAuditLogs(): Promise<AuditLogItem[]> {
    try {
      const res = await apiClient.get('/audit-logs');
      return res.data;
    } catch {
      return MOCK_AUDIT_LOGS;
    }
  },

  // Simulation Engine API
  async runSimulation(params: SimulationParams): Promise<SimulationResult> {
    try {
      const res = await apiClient.post('/simulation', params);
      return res.data;
    } catch {
      // High-precision simulation physics calculation
      const baseDemand = 82.4;
      const tempFactor = 1 + (params.temperatureChangeC * 0.024); // +2.4% per °C above normal
      const resFactor = 1 + (params.residentialDemandDeltaPct / 100) * 0.42; // Residential is 42% share
      const indFactor = 1 + (params.industrialDemandDeltaPct / 100) * 0.46; // Industrial is 46% share
      const evFactor = 1 + (params.evChargingSpikePct / 100) * 0.12;
      const holidayFactor = params.isHoliday ? 0.88 : 1.0;

      const multiplier = tempFactor * resFactor * indFactor * evFactor * holidayFactor;
      const simDemand = parseFloat((baseDemand * multiplier).toFixed(1));
      const demandDeltaPct = parseFloat((((simDemand - baseDemand) / baseDemand) * 100).toFixed(1));
      const simPeak = parseFloat((simDemand * 1.18).toFixed(1));

      const overloadedFeeders = simDemand > 95 ? (simDemand > 105 ? 5 : 3) : 1;
      const atRiskTransformers = simDemand > 95 ? (simDemand > 105 ? 18 : 12) : 6;
      const gridStability = Math.max(55, Math.min(99, parseFloat((98 - Math.abs(demandDeltaPct) * 1.1).toFixed(1))));

      const hourly = Array.from({ length: 24 }, (_, h) => {
        const hourBase = 45 + Math.sin((h - 5) / 3.5) * 35 + (h >= 18 && h <= 21 ? 12 : 0);
        return {
          hour: h,
          timeLabel: `${h.toString().padStart(2, '0')}:00`,
          baselineMw: parseFloat(hourBase.toFixed(1)),
          simulatedMw: parseFloat((hourBase * multiplier).toFixed(1))
        };
      });

      const criticalAssets = [
        {
          id: 'tr-104',
          name: 'Transformer TR-104 (Cyber Corridor)',
          type: 'Distribution Transformer',
          simulatedUtilizationPct: Math.min(135, parseFloat((92 * multiplier).toFixed(1))),
          riskLevel: 'CRITICAL' as const
        },
        {
          id: 'tr-202',
          name: 'Transformer TR-202 (Heavy Foundry)',
          type: 'Industrial Step-Down',
          simulatedUtilizationPct: Math.min(142, parseFloat((96.2 * multiplier).toFixed(1))),
          riskLevel: 'CRITICAL' as const
        },
        {
          id: 'f-33',
          name: 'Feeder F-33 (South Port)',
          type: '11kV Feeder Line',
          simulatedUtilizationPct: Math.min(138, parseFloat((99.2 * multiplier).toFixed(1))),
          riskLevel: 'CRITICAL' as const
        },
        {
          id: 'f-21',
          name: 'Feeder F-21 (Cyber Corridor)',
          type: '11kV Feeder Line',
          simulatedUtilizationPct: Math.min(125, parseFloat((94.0 * multiplier).toFixed(1))),
          riskLevel: 'HIGH' as const
        }
      ];

      const recommendations = [
        simDemand > 95
          ? 'Initiate dynamic peak load shifting across Industrial Zone East to curtail 8.5 MW.'
          : 'Maintain standard spinning reserve allocation at 15%.',
        simDemand > 100
          ? 'Switch Substation SS-E02 tie-breaker to offload Feeder F-21 onto auxiliary bus.'
          : 'Schedule voluntary demand response signal for commercial HVAC systems.',
        'Deploy mobile thermal telemetry monitoring on TR-104 & TR-202.'
      ];

      return {
        baselineDemandMw: baseDemand,
        simulatedDemandMw: simDemand,
        demandChangePct: demandDeltaPct,
        simulatedPeakMw: simPeak,
        peakHour: `${params.peakLoadHour.toString().padStart(2, '0')}:30`,
        gridStabilityIndexPct: gridStability,
        overloadedFeedersCount: overloadedFeeders,
        atRiskTransformersCount: atRiskTransformers,
        co2EmissionsTonsPerHour: parseFloat((simDemand * 0.72).toFixed(1)),
        hourlyProfile: hourly,
        criticalAssetsAtRisk: criticalAssets,
        aiMitigationRecommendations: recommendations
      };
    }
  },

  // Copilot AI Query API
  async queryCopilot(question: string): Promise<CopilotMessage> {
    try {
      const res = await apiClient.post('/copilot/query', { question });
      return res.data;
    } catch {
      const q = question.toLowerCase();

      if (q.includes('risk') || q.includes('transformer') || q.includes('attention') || q.includes('failing')) {
        return {
          id: 'copilot-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          intent: 'RISK_INSPECTION',
          text: 'Analysis of real-time telemetry indicates **3 transformers are operating at critical risk thresholds**. Primary concern is **TR-104** due to continuous thermal stress (78.4°C) and overdue oil insulation testing.',
          metrics: [
            { label: 'Highest Risk Asset', value: 'TR-104 (87%)', delta: '+12% this week' },
            { label: 'Critical Assets Count', value: '3 Units' },
            { label: 'Overdue Inspections', value: '2 Units' }
          ],
          affectedAssets: [
            { id: 'tr-104', name: 'Transformer TR-104', type: 'Distribution', risk: 87, status: 'CRITICAL' },
            { id: 'tr-202', name: 'Transformer TR-202', type: 'Industrial', risk: 82, status: 'CRITICAL' },
            { id: 'tr-118', name: 'Transformer TR-118', type: 'Commercial', risk: 79, status: 'WARNING' }
          ],
          recommendedActions: [
            'Deploy immediate oil dielectric inspection crew to Transformer TR-104.',
            'Shift 1.8 MW load from Feeder F-21 to Feeder F-08 via Tie-Breaker TB-12.',
            'Trigger thermographic drone scan on Substation SS-S05 capacitor bank.'
          ],
          confidencePct: 96.4,
          dataSource: 'Grid Telemetry DB & Random Forest Risk Classifier'
        };
      }

      if (q.includes('peak') || q.includes('tomorrow') || q.includes('forecast') || q.includes('demand')) {
        return {
          id: 'copilot-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          intent: 'FORECAST_QUERY',
          text: 'The ensemble forecasting model predicts **evening peak demand reaching 97.8 MW at 19:30** (+18.7% over current load). High ambient temperature (38°C) is driving residential HVAC demand.',
          metrics: [
            { label: 'Current Demand', value: '82.4 MW' },
            { label: 'Predicted Peak', value: '97.8 MW', delta: '+18.7%' },
            { label: 'Peak Window', value: '19:00 - 20:30' },
            { label: 'Model Confidence', value: '94.6% R²' }
          ],
          recommendedActions: [
            'Pre-cool commercial cold storage facilities before 17:00 peak ramp.',
            'Verify 18 MW spinning reserve readiness at North Generation Substation.',
            'Activate automated demand response for participating industrial loads.'
          ],
          confidencePct: 94.6,
          dataSource: 'XGBoost + Prophet Time-Series Model'
        };
      }

      if (q.includes('outage') || q.includes('fault') || q.includes('blackout')) {
        return {
          id: 'copilot-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          intent: 'OUTAGE_STATUS',
          text: 'There are currently **4 active outage events** affecting **1,431 consumers** across South, East, North, and West zones. The highest priority is on **Feeder F-33 (South Port)** where 842 consumers are affected.',
          metrics: [
            { label: 'Active Outages', value: '4' },
            { label: 'Consumers Affected', value: '1,431' },
            { label: 'Avg Est. Restoration', value: '45 mins' }
          ],
          affectedAssets: [
            { id: 'f-33', name: 'Feeder F-33 (South Port)', type: 'Feeder Line', risk: 89, status: 'CRITICAL' },
            { id: 'f-21', name: 'Feeder F-21 (Cyber Corridor)', type: 'Feeder Line', risk: 78, status: 'WARNING' }
          ],
          recommendedActions: [
            'Expedite Crew Beta restoration on South Port line (estimated ETA 14:15).',
            'Isolate transformer TR-202 circuit breaker to prevent secondary cascade.'
          ],
          confidencePct: 98.0,
          dataSource: 'OMS (Outage Management System) Real-Time Feed'
        };
      }

      // Default Copilot response
      return {
        id: 'copilot-' + Date.now(),
        sender: 'assistant',
        timestamp: 'Just now',
        intent: 'GENERAL',
        text: `Grid telemetry indicates the overall power distribution system is in a **STABLE / NOMINAL** operating envelope with **82.4 MW current load** and **91.4% composite health**. Key operational items to track are **TR-104 (87% risk)** and the anticipated **19:30 evening peak (97.8 MW)**.`,
        metrics: [
          { label: 'System Load', value: '82.4 MW' },
          { label: 'Grid Health', value: '91.4%' },
          { label: 'Active Alerts', value: '4' }
        ],
        recommendedActions: [
          'Review the Needs Attention panel on the dashboard.',
          'Run a scenario simulation to evaluate extreme heat effects.',
          'Export the Daily Operations PDF report for shift handoff.'
        ],
        confidencePct: 95.0,
        dataSource: 'GridSense Analytics Engine'
      };
    }
  }
};
