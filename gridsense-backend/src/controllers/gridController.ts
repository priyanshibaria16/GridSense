import { Request, Response } from 'express';
import prisma from '../config/database';

// In-memory structured fallback dataset representing enterprise grid topology
const SUBSTATIONS = [
  { id: 'sub-01', name: 'North Heights Substation', code: 'SS-N01', zone: 'North', latitude: 23.0525, longitude: 72.5667, capacityMva: 100, currentLoadMva: 82.4, utilizationPct: 82.4, voltageRatingKv: 66, feederCount: 8, transformerCount: 24, healthScore: 88, status: 'HEALTHY' },
  { id: 'sub-02', name: 'Cyber Park Substation', code: 'SS-E02', zone: 'East', latitude: 23.0650, longitude: 72.6100, capacityMva: 120, currentLoadMva: 112.8, utilizationPct: 94.0, voltageRatingKv: 132, feederCount: 10, transformerCount: 32, healthScore: 74, status: 'WARNING' },
  { id: 'sub-03', name: 'Westgate Industrial Hub', code: 'SS-W03', zone: 'West', latitude: 23.0210, longitude: 72.5050, capacityMva: 150, currentLoadMva: 128.5, utilizationPct: 85.6, voltageRatingKv: 132, feederCount: 12, transformerCount: 40, healthScore: 92, status: 'HEALTHY' },
  { id: 'sub-04', name: 'Riverside Central Substation', code: 'SS-C04', zone: 'Central', latitude: 23.0330, longitude: 72.5780, capacityMva: 90, currentLoadMva: 64.2, utilizationPct: 71.3, voltageRatingKv: 66, feederCount: 6, transformerCount: 18, healthScore: 95, status: 'HEALTHY' },
  { id: 'sub-05', name: 'South Port Logistics Grid', code: 'SS-S05', zone: 'South', latitude: 22.9850, longitude: 72.5920, capacityMva: 80, currentLoadMva: 77.2, utilizationPct: 96.5, voltageRatingKv: 66, feederCount: 6, transformerCount: 20, healthScore: 68, status: 'CRITICAL' },
  { id: 'sub-06', name: 'Apex Tech Valley', code: 'SS-N06', zone: 'North', latitude: 23.0900, longitude: 72.5450, capacityMva: 110, currentLoadMva: 79.4, utilizationPct: 72.1, voltageRatingKv: 132, feederCount: 8, transformerCount: 26, healthScore: 91, status: 'HEALTHY' }
];

const FEEDERS = [
  { id: 'f-21', name: 'Feeder F-21 (Cyber Corridor)', code: 'FDR-21', substationId: 'sub-02', substationName: 'Cyber Park Substation', zone: 'East', capacityMw: 18.0, currentLoadMw: 16.92, utilizationPct: 94.0, voltageKv: 11.0, currentAmps: 888, powerFactor: 0.88, consumerCount: 1240, riskScore: 78, riskLevel: 'HIGH', status: 'WARNING', coordinates: [[23.0650, 72.6100], [23.0620, 72.6220], [23.0580, 72.6350], [23.0510, 72.6410]] },
  { id: 'f-08', name: 'Feeder F-08 (North Residential Trunk)', code: 'FDR-08', substationId: 'sub-01', substationName: 'North Heights Substation', zone: 'North', capacityMw: 15.0, currentLoadMw: 11.4, utilizationPct: 76.0, voltageKv: 11.0, currentAmps: 598, powerFactor: 0.94, consumerCount: 2890, riskScore: 24, riskLevel: 'LOW', status: 'HEALTHY', coordinates: [[23.0525, 72.5667], [23.0610, 72.5590], [23.0720, 72.5510]] },
  { id: 'f-14', name: 'Feeder F-14 (Westgate Heavy Rolling)', code: 'FDR-14', substationId: 'sub-03', substationName: 'Westgate Industrial Hub', zone: 'West', capacityMw: 25.0, currentLoadMw: 21.2, utilizationPct: 84.8, voltageKv: 22.0, currentAmps: 556, powerFactor: 0.91, consumerCount: 420, riskScore: 48, riskLevel: 'MEDIUM', status: 'HEALTHY', coordinates: [[23.0210, 72.5050], [23.0150, 72.4920], [23.0080, 72.4810]] },
  { id: 'f-33', name: 'Feeder F-33 (South Port Cold Storage)', code: 'FDR-33', substationId: 'sub-05', substationName: 'South Port Logistics Grid', zone: 'South', capacityMw: 14.0, currentLoadMw: 13.9, utilizationPct: 99.2, voltageKv: 11.0, currentAmps: 729, powerFactor: 0.82, consumerCount: 680, riskScore: 89, riskLevel: 'CRITICAL', status: 'CRITICAL', coordinates: [[22.9850, 72.5920], [22.9760, 72.6040], [22.9690, 72.6150]] },
  { id: 'f-02', name: 'Feeder F-02 (Central Commercial Loop)', code: 'FDR-02', substationId: 'sub-04', substationName: 'Riverside Central Substation', zone: 'Central', capacityMw: 16.0, currentLoadMw: 10.2, utilizationPct: 63.7, voltageKv: 11.0, currentAmps: 535, powerFactor: 0.96, consumerCount: 1850, riskScore: 18, riskLevel: 'LOW', status: 'HEALTHY', coordinates: [[23.0330, 72.5780], [23.0390, 72.5850], [23.0450, 72.5920]] }
];

const TRANSFORMERS = [
  {
    id: 'tr-104',
    name: 'Transformer TR-104 (Sub-Station A)',
    code: 'TR-104',
    feederId: 'f-21',
    feederName: 'Feeder F-21 (Cyber Corridor)',
    substationId: 'sub-02',
    substationName: 'Cyber Park Substation',
    zone: 'East',
    latitude: 23.0620,
    longitude: 72.6220,
    capacityKva: 1000,
    currentLoadKva: 920,
    utilizationPct: 92.0,
    ageYears: 19,
    temperatureC: 78.4,
    voltageDeviationPct: 6.8,
    voltageKv: 11.2,
    currentAmps: 284,
    powerFactor: 0.81,
    oilLevelPct: 62,
    vibrationMmS: 4.8,
    failureCount: 3,
    daysSinceMaintenance: 412,
    lastMaintenance: '2025-07-18',
    nextInspectionDue: 'OVERDUE (by 47 days)',
    healthScore: 42,
    riskScore: 87,
    riskLevel: 'CRITICAL',
    status: 'CRITICAL',
    aiRecommendation: 'Immediate priority maintenance required. High winding temperature (78.4°C) coupled with 412 days without oil dielectric testing signals elevated insulation breakdown risk.',
    topContributingFactors: [{ factor: 'Winding Temperature (>75°C)', impact: 38 }, { factor: 'Days Since Maintenance (>365d)', impact: 29 }, { factor: 'Peak Load Ratio (92%)', impact: 18 }, { factor: 'Low Power Factor (0.81)', impact: 15 }],
    history: [
      { timestamp: '08:00', load: 68, temperature: 54, voltage: 11.0, risk: 62 },
      { timestamp: '10:00', load: 74, temperature: 60, voltage: 11.1, risk: 68 },
      { timestamp: '12:00', load: 85, temperature: 69, voltage: 11.1, risk: 77 },
      { timestamp: '14:00', load: 89, temperature: 74, voltage: 11.2, risk: 82 },
      { timestamp: '16:00', load: 92, temperature: 78.4, voltage: 11.2, risk: 87 }
    ]
  },
  {
    id: 'tr-202',
    name: 'Transformer TR-202 (Heavy Foundry)',
    code: 'TR-202',
    feederId: 'f-33',
    feederName: 'Feeder F-33 (South Port Cold Storage)',
    substationId: 'sub-05',
    substationName: 'South Port Logistics Grid',
    zone: 'South',
    latitude: 22.9760,
    longitude: 72.6040,
    capacityKva: 1600,
    currentLoadKva: 1540,
    utilizationPct: 96.2,
    ageYears: 23,
    temperatureC: 82.1,
    voltageDeviationPct: 7.4,
    voltageKv: 10.8,
    currentAmps: 412,
    powerFactor: 0.79,
    oilLevelPct: 58,
    vibrationMmS: 5.2,
    failureCount: 4,
    daysSinceMaintenance: 380,
    lastMaintenance: '2025-08-20',
    nextInspectionDue: 'OVERDUE (by 15 days)',
    healthScore: 38,
    riskScore: 82,
    riskLevel: 'CRITICAL',
    status: 'CRITICAL',
    aiRecommendation: 'High harmonic distortion and sustained thermal overload. Initiate load curtailment on secondary feeder and deploy thermal scan inspection crew.',
    topContributingFactors: [{ factor: 'Extreme Temperature (82.1°C)', impact: 42 }, { factor: 'Utilization > 95%', impact: 32 }, { factor: 'Asset Age (23 yrs)', impact: 16 }, { factor: 'Voltage Deviation (-7.4%)', impact: 10 }],
    history: [
      { timestamp: '08:00', load: 72, temperature: 58, voltage: 11.0, risk: 65 },
      { timestamp: '12:00', load: 93, temperature: 78, voltage: 10.8, risk: 79 },
      { timestamp: '16:00', load: 96.2, temperature: 82.1, voltage: 10.8, risk: 82 }
    ]
  },
  {
    id: 'tr-118',
    name: 'Transformer TR-118 (Tech Park Phase 2)',
    code: 'TR-118',
    feederId: 'f-21',
    feederName: 'Feeder F-21 (Cyber Corridor)',
    substationId: 'sub-02',
    substationName: 'Cyber Park Substation',
    zone: 'East',
    latitude: 23.0580,
    longitude: 72.6350,
    capacityKva: 800,
    currentLoadKva: 690,
    utilizationPct: 86.2,
    ageYears: 14,
    temperatureC: 68.2,
    voltageDeviationPct: 3.5,
    voltageKv: 11.1,
    currentAmps: 215,
    powerFactor: 0.89,
    oilLevelPct: 80,
    vibrationMmS: 2.9,
    failureCount: 1,
    daysSinceMaintenance: 210,
    lastMaintenance: '2026-02-04',
    nextInspectionDue: 'In 45 days',
    healthScore: 67,
    riskScore: 79,
    riskLevel: 'HIGH',
    status: 'WARNING',
    aiRecommendation: 'Approaching warning threshold due to rising midday ambient temperature. Monitor dissolved gas analysis (DGA) in next routine cycle.',
    topContributingFactors: [{ factor: 'Elevated Daily Peak Utilization', impact: 40 }, { factor: 'Winding Temp Trend', impact: 35 }, { factor: 'Feeder Loading Strain', impact: 25 }],
    history: [
      { timestamp: '08:00', load: 60, temperature: 48, voltage: 11.1, risk: 45 },
      { timestamp: '16:00', load: 86.2, temperature: 68.2, voltage: 11.1, risk: 79 }
    ]
  },
  {
    id: 'tr-305',
    name: 'Transformer TR-305 (Green Meadows Residential)',
    code: 'TR-305',
    feederId: 'f-08',
    feederName: 'Feeder F-08 (North Residential Trunk)',
    substationId: 'sub-01',
    substationName: 'North Heights Substation',
    zone: 'North',
    latitude: 23.0610,
    longitude: 72.5590,
    capacityKva: 630,
    currentLoadKva: 480,
    utilizationPct: 76.1,
    ageYears: 8,
    temperatureC: 56.4,
    voltageDeviationPct: 1.8,
    voltageKv: 11.0,
    currentAmps: 151,
    powerFactor: 0.94,
    oilLevelPct: 92,
    vibrationMmS: 1.8,
    failureCount: 0,
    daysSinceMaintenance: 115,
    lastMaintenance: '2026-05-10',
    nextInspectionDue: 'In 140 days',
    healthScore: 88,
    riskScore: 28,
    riskLevel: 'LOW',
    status: 'HEALTHY',
    aiRecommendation: 'Asset performing stably within nominal operational envelopes.',
    topContributingFactors: [{ factor: 'Low Operating Temperature (56°C)', impact: 60 }, { factor: 'Healthy Power Factor (0.94)', impact: 40 }],
    history: [
      { timestamp: '08:00', load: 52, temperature: 44, voltage: 11.0, risk: 22 },
      { timestamp: '16:00', load: 76.1, temperature: 56.4, voltage: 11.0, risk: 28 }
    ]
  }
];

const OUTAGES = [
  { id: 'out-01', code: 'OUT-2026-0842', feederId: 'f-33', feederName: 'Feeder F-33 (South Port Cold Storage)', substationName: 'South Port Logistics Grid', zone: 'South', latitude: 22.9690, longitude: 72.6150, startTime: '2026-09-02 11:42:00', estimatedRestorationTime: '2026-09-02 14:15:00', durationMinutes: 78, cause: 'Grid Overload', affectedConsumers: 842, affectedLoadMw: 4.8, priority: 'CRITICAL', status: 'RESTORING', crewsDispatched: 3 },
  { id: 'out-02', code: 'OUT-2026-0841', feederId: 'f-21', feederName: 'Feeder F-21 (Cyber Corridor)', substationName: 'Cyber Park Substation', zone: 'East', latitude: 23.0510, longitude: 72.6410, startTime: '2026-09-02 12:10:00', estimatedRestorationTime: '2026-09-02 13:45:00', durationMinutes: 50, cause: 'Equipment Failure', affectedConsumers: 310, affectedLoadMw: 2.1, priority: 'HIGH', status: 'DISPATCHED', crewsDispatched: 2 },
  { id: 'out-03', code: 'OUT-2026-0839', feederId: 'f-08', feederName: 'Feeder F-08 (North Residential Trunk)', substationName: 'North Heights Substation', zone: 'North', latitude: 23.0720, longitude: 72.5510, startTime: '2026-09-02 10:15:00', estimatedRestorationTime: '2026-09-02 13:30:00', durationMinutes: 165, cause: 'Vegetation Overgrowth', affectedConsumers: 184, affectedLoadMw: 1.2, priority: 'MEDIUM', status: 'RESTORING', crewsDispatched: 1 },
  { id: 'out-04', code: 'OUT-2026-0835', feederId: 'f-14', feederName: 'Feeder F-14 (Westgate Heavy Rolling)', substationName: 'Westgate Industrial Hub', zone: 'West', latitude: 23.0080, longitude: 72.4810, startTime: '2026-09-02 09:30:00', estimatedRestorationTime: '2026-09-02 13:00:00', durationMinutes: 210, cause: 'Weather / Lightning', affectedConsumers: 95, affectedLoadMw: 3.4, priority: 'MEDIUM', status: 'ACTIVE', crewsDispatched: 2 }
];

export const gridController = {
  async getDashboardSummary(req: Request, res: Response) {
    res.json({
      systemStatus: 'GRID_OPERATIONAL',
      gridPulse: { loadMw: 82.4, peakDemandMw: 97.8, gridHealthPct: 91.4, riskStatus: 'LOW', activeOutagesCount: 4, frequencyHz: 50.02, energyTodayGwh: 2.84, loadChangePct: 8.2 },
      kpis: { currentLoadMw: 82.4, currentLoadChangePct: 8.2, peakDemandMw: 97.8, peakTime: '19:30', activeOutages: 4, outageChangeCount: -1, highRiskAssets: 17, energyTodayGwh: 2.84, gridHealthPct: 91.4, healthChangePct: 0.8 },
      healthDistribution: { healthyPct: 78, warningPct: 15, criticalPct: 7, totalAssets: 182 },
      needsAttention: [
        { id: 'att-01', severity: 'CRITICAL', type: 'TRANSFORMER_RISK', title: 'Transformer TR-104', description: '87% Failure Risk — Winding temperature reached 78.4°C at 92% continuous load.', metric: '87% Risk', actionRoute: '/assets/tr-104' },
        { id: 'att-02', severity: 'HIGH', type: 'FEEDER_OVERLOAD', title: 'Feeder F-21 (Cyber Corridor)', description: 'Operating at 94.0% capacity with 888A current draw. Near tripping threshold.', metric: '94% Util', actionRoute: '/feeders' },
        { id: 'att-03', severity: 'CRITICAL', type: 'OUTAGE_EVENT', title: 'Outage: South Port Cold Storage', description: 'Feeder F-33 tripped on overload. 842 consumers affected.', metric: '842 Consumers', actionRoute: '/outages' },
        { id: 'att-04', severity: 'WARNING', type: 'PEAK_SPIKE', title: 'Evening Peak Forecast Surge', description: 'Predicted demand surge to 97.8 MW at 19:30 (+18.7% above baseline).', metric: '97.8 MW @ 19:30', actionRoute: '/forecast' }
      ],
      aiInsights: [
        { id: 'ins-01', category: 'DEMAND', insight: 'Demand forecasted to surge 18.7% during 19:30 evening peak due to rising ambient temperature (38°C).', timestamp: '10 mins ago', impact: 'HIGH' },
        { id: 'ins-02', category: 'ASSET', insight: '3 transformers show elevated failure risk (>75%). Priority inspection of TR-104 recommended.', timestamp: '25 mins ago', impact: 'HIGH' },
        { id: 'ins-03', category: 'EFFICIENCY', insight: 'Zone East recorded the highest consumption delta (+14.2% vs 7-day average).', timestamp: '1 hour ago', impact: 'MEDIUM' }
      ]
    });
  },

  async getSubstations(req: Request, res: Response) {
    res.json(SUBSTATIONS);
  },

  async getFeeders(req: Request, res: Response) {
    res.json(FEEDERS);
  },

  async getTransformers(req: Request, res: Response) {
    res.json(TRANSFORMERS);
  },

  async getAssetById(req: Request, res: Response) {
    const { id } = req.params;
    const found = TRANSFORMERS.find((t) => t.id === id || t.code.toLowerCase() === id.toLowerCase());
    if (!found) {
      return res.status(404).json({ error: 'Asset not found in grid inventory' });
    }
    res.json(found);
  },

  async getOutages(req: Request, res: Response) {
    res.json(OUTAGES);
  },

  async updateOutageStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const outage = OUTAGES.find((o) => o.id === id);
    if (outage) outage.status = status;
    res.json(outage || OUTAGES[0]);
  }
};
