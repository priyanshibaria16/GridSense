// GridSense Enterprise Types

export type UserRole = 'ADMIN' | 'OPERATOR' | 'ANALYST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  token?: string;
}

export type HealthStatus = 'HEALTHY' | 'WARNING' | 'CRITICAL';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Substation {
  id: string;
  name: string;
  code: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central';
  latitude: number;
  longitude: number;
  capacityMva: number;
  currentLoadMva: number;
  utilizationPct: number;
  voltageRatingKv: number;
  feederCount: number;
  transformerCount: number;
  healthScore: number;
  status: HealthStatus;
  lastUpdated: string;
}

export interface Feeder {
  id: string;
  name: string;
  code: string;
  substationId: string;
  substationName: string;
  zone: string;
  capacityMw: number;
  currentLoadMw: number;
  utilizationPct: number;
  voltageKv: number;
  currentAmps: number;
  powerFactor: number;
  consumerCount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: HealthStatus;
  coordinates: [number, number][]; // Polyline for map
}

export interface Transformer {
  id: string;
  name: string;
  code: string;
  feederId: string;
  feederName: string;
  substationId: string;
  substationName: string;
  zone: string;
  latitude: number;
  longitude: number;
  capacityKva: number;
  currentLoadKva: number;
  utilizationPct: number;
  ageYears: number;
  temperatureC: number;
  voltageDeviationPct: number;
  voltageKv: number;
  currentAmps: number;
  powerFactor: number;
  oilLevelPct: number;
  vibrationMmS: number;
  failureCount: number;
  daysSinceMaintenance: number;
  lastMaintenance: string;
  nextInspectionDue: string;
  healthScore: number; // 0-100
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  status: HealthStatus;
  aiRecommendation: string;
  topContributingFactors: { factor: string; impact: number }[];
  history: {
    timestamp: string;
    load: number;
    temperature: number;
    voltage: number;
    risk: number;
  }[];
}

export interface Outage {
  id: string;
  code: string;
  feederId: string;
  feederName: string;
  substationName: string;
  zone: string;
  latitude: number;
  longitude: number;
  startTime: string;
  estimatedRestorationTime: string;
  durationMinutes: number;
  cause: 'Equipment Failure' | 'Weather / Lightning' | 'Vegetation Overgrowth' | 'Grid Overload' | 'Scheduled Maintenance' | 'Third Party Damage';
  affectedConsumers: number;
  affectedLoadMw: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'DISPATCHED' | 'RESTORING' | 'RESOLVED';
  crewsDispatched: number;
}

export interface DemandDataPoint {
  timestamp: string;
  hour: number;
  actualLoadMw?: number;
  predictedLoadMw: number;
  lowerBoundMw: number;
  upperBoundMw: number;
  temperatureC: number;
  humidityPct: number;
  isPeak: boolean;
}

export interface ForecastSummary {
  horizon: '1H' | '6H' | '24H' | '7D' | '30D';
  currentDemandMw: number;
  predictedPeakMw: number;
  predictedPeakTime: string;
  averageDemandMw: number;
  modelAccuracyPct: number;
  modelName: 'XGBoost + Prophet Ensemble' | 'Prophet v1.4' | 'XGBoost Regressor';
  metrics: {
    mae: number;
    rmse: number;
    r2: number;
    mape: number;
  };
  data: DemandDataPoint[];
}

export interface AnomalyRecord {
  id: string;
  code: string;
  consumerId: string;
  consumerName: string;
  consumerCategory: 'Industrial' | 'Commercial' | 'Residential' | 'Agricultural';
  zone: string;
  feederId: string;
  timestamp: string;
  expectedConsumptionKwh: number;
  actualConsumptionKwh: number;
  deviationPct: number;
  anomalyScore: number; // 0-1
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'Sudden Spike' | 'Sudden Drop' | 'Nighttime Irregularity' | 'Persistent Overdraw' | 'Voltage Sag Correlation';
  status: 'DETECTED' | 'INVESTIGATING' | 'CONFIRMED' | 'RESOLVED' | 'FALSE_POSITIVE';
  notes: string;
}

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  assetType: 'Transformer' | 'Feeder' | 'Substation Breaker' | 'Capacitor Bank';
  zone: string;
  riskScore: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'ROUTINE';
  type: 'Emergency Repair' | 'Thermal Scan Inspection' | 'Oil Dielectric Test' | 'Bushings Replacement' | 'Preventative Overhaul';
  lastMaintenanceDate: string;
  nextInspectionDue: string;
  estimatedCostUsd: number;
  status: 'OVERDUE' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  technicianAssigned?: string;
  aiSuggestedAction: string;
}

export interface SimulationParams {
  temperatureChangeC: number; // e.g. -10 to +15
  residentialDemandDeltaPct: number; // e.g. -20 to +30
  industrialDemandDeltaPct: number; // e.g. -20 to +30
  isHoliday: boolean;
  evChargingSpikePct: number; // 0 to 50
  peakLoadHour: number; // 0 to 23
}

export interface SimulationResult {
  baselineDemandMw: number;
  simulatedDemandMw: number;
  demandChangePct: number;
  simulatedPeakMw: number;
  peakHour: string;
  gridStabilityIndexPct: number;
  overloadedFeedersCount: number;
  atRiskTransformersCount: number;
  co2EmissionsTonsPerHour: number;
  hourlyProfile: {
    hour: number;
    timeLabel: string;
    baselineMw: number;
    simulatedMw: number;
  }[];
  criticalAssetsAtRisk: {
    id: string;
    name: string;
    type: string;
    simulatedUtilizationPct: number;
    riskLevel: RiskLevel;
  }[];
  aiMitigationRecommendations: string[];
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  intent?: 'FORECAST_QUERY' | 'RISK_INSPECTION' | 'OUTAGE_STATUS' | 'SIMULATION_EXEC' | 'ANOMALY_LOOKUP' | 'GENERAL';
  metrics?: { label: string; value: string; delta?: string }[];
  affectedAssets?: { id: string; name: string; type: string; risk: number; status: HealthStatus }[];
  recommendedActions?: string[];
  confidencePct?: number;
  dataSource?: string;
}

export interface DashboardSummary {
  systemStatus: 'GRID_OPERATIONAL' | 'DEGRADED_STATE' | 'CRITICAL_ALERT';
  gridPulse: {
    loadMw: number;
    peakDemandMw: number;
    gridHealthPct: number;
    riskStatus: RiskLevel;
    activeOutagesCount: number;
    frequencyHz: number;
    energyTodayGwh: number;
    loadChangePct: number;
  };
  kpis: {
    currentLoadMw: number;
    currentLoadChangePct: number;
    peakDemandMw: number;
    peakTime: string;
    activeOutages: number;
    outageChangeCount: number;
    highRiskAssets: number;
    energyTodayGwh: number;
    gridHealthPct: number;
    healthChangePct: number;
  };
  healthDistribution: {
    healthyPct: number;
    warningPct: number;
    criticalPct: number;
    totalAssets: number;
  };
  needsAttention: {
    id: string;
    severity: 'CRITICAL' | 'HIGH' | 'WARNING';
    type: 'TRANSFORMER_RISK' | 'FEEDER_OVERLOAD' | 'PEAK_SPIKE' | 'OUTAGE_EVENT' | 'ANOMALY';
    title: string;
    description: string;
    metric: string;
    actionRoute: string;
  }[];
  aiInsights: {
    id: string;
    category: 'DEMAND' | 'ASSET' | 'OUTAGE' | 'EFFICIENCY';
    insight: string;
    timestamp: string;
    impact: 'HIGH' | 'MEDIUM' | 'INFO';
  }[];
}

export interface ReliabilityMetrics {
  saidiMinutes: number; // System Average Interruption Duration Index
  saifiCount: number; // System Average Interruption Frequency Index
  caidiMinutes: number; // Customer Average Interruption Duration Index
  maifiCount: number;
  asaiPct: number; // Average Service Availability Index (99.98%)
  monthlyTrend: { month: string; saidi: number; saifi: number }[];
  outagesByCause: { cause: string; count: number; pct: number }[];
  outagesByZone: { zone: string; count: number; durationHours: number }[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  category: 'AUTH' | 'ASSET_UPDATE' | 'OUTAGE_DISPATCH' | 'SIMULATION' | 'REPORT_EXPORT' | 'MAINTENANCE_SCHEDULE' | 'SYSTEM_CONFIG';
  details: string;
  ipAddress: string;
}
