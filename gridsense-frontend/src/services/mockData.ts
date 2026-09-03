import {
  Substation,
  Feeder,
  Transformer,
  Outage,
  ForecastSummary,
  AnomalyRecord,
  MaintenanceRecord,
  DashboardSummary,
  ReliabilityMetrics,
  AuditLogItem,
  User
} from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Eleanor Vance',
    email: 'admin@gridsense.ai',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-op-02',
    name: 'Marcus Chen',
    email: 'operator@gridsense.ai',
    role: 'OPERATOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-an-03',
    name: 'Dr. Sarah Jenkins',
    email: 'analyst@gridsense.ai',
    role: 'ANALYST',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const MOCK_SUBSTATIONS: Substation[] = [
  {
    id: 'sub-01',
    name: 'North Heights Substation',
    code: 'SS-N01',
    zone: 'North',
    latitude: 23.0525,
    longitude: 72.5667,
    capacityMva: 100,
    currentLoadMva: 82.4,
    utilizationPct: 82.4,
    voltageRatingKv: 66,
    feederCount: 8,
    transformerCount: 24,
    healthScore: 88,
    status: 'HEALTHY',
    lastUpdated: 'Just now'
  },
  {
    id: 'sub-02',
    name: 'Cyber Park Substation',
    code: 'SS-E02',
    zone: 'East',
    latitude: 23.0650,
    longitude: 72.6100,
    capacityMva: 120,
    currentLoadMva: 112.8,
    utilizationPct: 94.0,
    voltageRatingKv: 132,
    feederCount: 10,
    transformerCount: 32,
    healthScore: 74,
    status: 'WARNING',
    lastUpdated: '1 min ago'
  },
  {
    id: 'sub-03',
    name: 'Westgate Industrial Hub',
    code: 'SS-W03',
    zone: 'West',
    latitude: 23.0210,
    longitude: 72.5050,
    capacityMva: 150,
    currentLoadMva: 128.5,
    utilizationPct: 85.6,
    voltageRatingKv: 132,
    feederCount: 12,
    transformerCount: 40,
    healthScore: 92,
    status: 'HEALTHY',
    lastUpdated: 'Just now'
  },
  {
    id: 'sub-04',
    name: 'Riverside Central Substation',
    code: 'SS-C04',
    zone: 'Central',
    latitude: 23.0330,
    longitude: 72.5780,
    capacityMva: 90,
    currentLoadMva: 64.2,
    utilizationPct: 71.3,
    voltageRatingKv: 66,
    feederCount: 6,
    transformerCount: 18,
    healthScore: 95,
    status: 'HEALTHY',
    lastUpdated: '2 mins ago'
  },
  {
    id: 'sub-05',
    name: 'South Port Logistics Grid',
    code: 'SS-S05',
    zone: 'South',
    latitude: 22.9850,
    longitude: 72.5920,
    capacityMva: 80,
    currentLoadMva: 77.2,
    utilizationPct: 96.5,
    voltageRatingKv: 66,
    feederCount: 6,
    transformerCount: 20,
    healthScore: 68,
    status: 'CRITICAL',
    lastUpdated: 'Just now'
  },
  {
    id: 'sub-06',
    name: 'Apex Tech Valley',
    code: 'SS-N06',
    zone: 'North',
    latitude: 23.0900,
    longitude: 72.5450,
    capacityMva: 110,
    currentLoadMva: 79.4,
    utilizationPct: 72.1,
    voltageRatingKv: 132,
    feederCount: 8,
    transformerCount: 26,
    healthScore: 91,
    status: 'HEALTHY',
    lastUpdated: '3 mins ago'
  }
];

export const MOCK_FEEDERS: Feeder[] = [
  {
    id: 'f-21',
    name: 'Feeder F-21 (Cyber Corridor)',
    code: 'FDR-21',
    substationId: 'sub-02',
    substationName: 'Cyber Park Substation',
    zone: 'East',
    capacityMw: 18.0,
    currentLoadMw: 16.92,
    utilizationPct: 94.0,
    voltageKv: 11.0,
    currentAmps: 888,
    powerFactor: 0.88,
    consumerCount: 1240,
    riskScore: 78,
    riskLevel: 'HIGH',
    status: 'WARNING',
    coordinates: [
      [23.0650, 72.6100],
      [23.0620, 72.6220],
      [23.0580, 72.6350],
      [23.0510, 72.6410]
    ]
  },
  {
    id: 'f-08',
    name: 'Feeder F-08 (North Residential Trunk)',
    code: 'FDR-08',
    substationId: 'sub-01',
    substationName: 'North Heights Substation',
    zone: 'North',
    capacityMw: 15.0,
    currentLoadMw: 11.4,
    utilizationPct: 76.0,
    voltageKv: 11.0,
    currentAmps: 598,
    powerFactor: 0.94,
    consumerCount: 2890,
    riskScore: 24,
    riskLevel: 'LOW',
    status: 'HEALTHY',
    coordinates: [
      [23.0525, 72.5667],
      [23.0610, 72.5590],
      [23.0720, 72.5510]
    ]
  },
  {
    id: 'f-14',
    name: 'Feeder F-14 (Westgate Heavy Rolling)',
    code: 'FDR-14',
    substationId: 'sub-03',
    substationName: 'Westgate Industrial Hub',
    zone: 'West',
    capacityMw: 25.0,
    currentLoadMw: 21.2,
    utilizationPct: 84.8,
    voltageKv: 22.0,
    currentAmps: 556,
    powerFactor: 0.91,
    consumerCount: 420,
    riskScore: 48,
    riskLevel: 'MEDIUM',
    status: 'HEALTHY',
    coordinates: [
      [23.0210, 72.5050],
      [23.0150, 72.4920],
      [23.0080, 72.4810]
    ]
  },
  {
    id: 'f-33',
    name: 'Feeder F-33 (South Port Cold Storage)',
    code: 'FDR-33',
    substationId: 'sub-05',
    substationName: 'South Port Logistics Grid',
    zone: 'South',
    capacityMw: 14.0,
    currentLoadMw: 13.9,
    utilizationPct: 99.2,
    voltageKv: 11.0,
    currentAmps: 729,
    powerFactor: 0.82,
    consumerCount: 680,
    riskScore: 89,
    riskLevel: 'CRITICAL',
    status: 'CRITICAL',
    coordinates: [
      [22.9850, 72.5920],
      [22.9760, 72.6040],
      [22.9690, 72.6150]
    ]
  },
  {
    id: 'f-02',
    name: 'Feeder F-02 (Central Commercial Loop)',
    code: 'FDR-02',
    substationId: 'sub-04',
    substationName: 'Riverside Central Substation',
    zone: 'Central',
    capacityMw: 16.0,
    currentLoadMw: 10.2,
    utilizationPct: 63.7,
    voltageKv: 11.0,
    currentAmps: 535,
    powerFactor: 0.96,
    consumerCount: 1850,
    riskScore: 18,
    riskLevel: 'LOW',
    status: 'HEALTHY',
    coordinates: [
      [23.0330, 72.5780],
      [23.0390, 72.5850],
      [23.0450, 72.5920]
    ]
  }
];

export const MOCK_TRANSFORMERS: Transformer[] = [
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
    topContributingFactors: [
      { factor: 'Winding Temperature (>75°C)', impact: 38 },
      { factor: 'Days Since Maintenance (>365d)', impact: 29 },
      { factor: 'Peak Load Ratio (92%)', impact: 18 },
      { factor: 'Low Power Factor (0.81)', impact: 15 }
    ],
    history: [
      { timestamp: '08:00', load: 68, temperature: 54, voltage: 11.0, risk: 62 },
      { timestamp: '10:00', load: 74, temperature: 60, voltage: 11.1, risk: 68 },
      { timestamp: '12:00', load: 85, temperature: 69, voltage: 11.1, risk: 77 },
      { timestamp: '14:00', load: 89, temperature: 74, voltage: 11.2, risk: 82 },
      { timestamp: '16:00', load: 92, temperature: 78.4, voltage: 11.2, risk: 87 },
      { timestamp: '18:00', load: 91, temperature: 77.2, voltage: 11.2, risk: 85 }
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
    topContributingFactors: [
      { factor: 'Extreme Temperature (82.1°C)', impact: 42 },
      { factor: 'Utilization > 95%', impact: 32 },
      { factor: 'Asset Age (23 yrs)', impact: 16 },
      { factor: 'Voltage Deviation (-7.4%)', impact: 10 }
    ],
    history: [
      { timestamp: '08:00', load: 72, temperature: 58, voltage: 11.0, risk: 65 },
      { timestamp: '10:00', load: 84, temperature: 68, voltage: 10.9, risk: 72 },
      { timestamp: '12:00', load: 93, temperature: 78, voltage: 10.8, risk: 79 },
      { timestamp: '14:00', load: 96.2, temperature: 82.1, voltage: 10.8, risk: 82 },
      { timestamp: '16:00', load: 95, temperature: 81.0, voltage: 10.9, risk: 80 }
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
    topContributingFactors: [
      { factor: 'Elevated Daily Peak Utilization', impact: 40 },
      { factor: 'Winding Temp Trend', impact: 35 },
      { factor: 'Feeder Loading Strain', impact: 25 }
    ],
    history: [
      { timestamp: '08:00', load: 60, temperature: 48, voltage: 11.1, risk: 45 },
      { timestamp: '12:00', load: 78, temperature: 61, voltage: 11.1, risk: 65 },
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
    aiRecommendation: 'Asset performing stably within nominal operational envelopes. No immediate interventions recommended.',
    topContributingFactors: [
      { factor: 'Low Operating Temperature (56°C)', impact: 60 },
      { factor: 'Healthy Power Factor (0.94)', impact: 40 }
    ],
    history: [
      { timestamp: '08:00', load: 52, temperature: 44, voltage: 11.0, risk: 22 },
      { timestamp: '12:00', load: 68, temperature: 51, voltage: 11.0, risk: 25 },
      { timestamp: '16:00', load: 76.1, temperature: 56.4, voltage: 11.0, risk: 28 }
    ]
  },
  {
    id: 'tr-412',
    name: 'Transformer TR-412 (Central Metro Line)',
    code: 'TR-412',
    feederId: 'f-02',
    feederName: 'Feeder F-02 (Central Commercial Loop)',
    substationId: 'sub-04',
    substationName: 'Riverside Central Substation',
    zone: 'Central',
    latitude: 23.0390,
    longitude: 72.5850,
    capacityKva: 1250,
    currentLoadKva: 790,
    utilizationPct: 63.2,
    ageYears: 5,
    temperatureC: 49.8,
    voltageDeviationPct: 0.9,
    voltageKv: 11.0,
    currentAmps: 247,
    powerFactor: 0.97,
    oilLevelPct: 96,
    vibrationMmS: 1.2,
    failureCount: 0,
    daysSinceMaintenance: 60,
    lastMaintenance: '2026-07-04',
    nextInspectionDue: 'In 195 days',
    healthScore: 97,
    riskScore: 12,
    riskLevel: 'LOW',
    status: 'HEALTHY',
    aiRecommendation: 'Asset operating in optimal condition with excellent power factor (0.97) and minimal vibration.',
    topContributingFactors: [
      { factor: 'Low Age (5 yrs)', impact: 50 },
      { factor: 'Optimal Oil Dielectric', impact: 50 }
    ],
    history: [
      { timestamp: '08:00', load: 45, temperature: 40, voltage: 11.0, risk: 10 },
      { timestamp: '12:00', load: 60, temperature: 46, voltage: 11.0, risk: 11 },
      { timestamp: '16:00', load: 63.2, temperature: 49.8, voltage: 11.0, risk: 12 }
    ]
  },
  {
    id: 'tr-510',
    name: 'Transformer TR-510 (Westgate Steel Mill B)',
    code: 'TR-510',
    feederId: 'f-14',
    feederName: 'Feeder F-14 (Westgate Heavy Rolling)',
    substationId: 'sub-03',
    substationName: 'Westgate Industrial Hub',
    zone: 'West',
    latitude: 23.0150,
    longitude: 72.4920,
    capacityKva: 2000,
    currentLoadKva: 1720,
    utilizationPct: 86.0,
    ageYears: 16,
    temperatureC: 72.5,
    voltageDeviationPct: 4.8,
    voltageKv: 21.8,
    currentAmps: 451,
    powerFactor: 0.86,
    oilLevelPct: 71,
    vibrationMmS: 3.7,
    failureCount: 2,
    daysSinceMaintenance: 290,
    lastMaintenance: '2025-11-15',
    nextInspectionDue: 'In 25 days',
    healthScore: 61,
    riskScore: 68,
    riskLevel: 'HIGH',
    status: 'WARNING',
    aiRecommendation: 'Elevated thermal cycles detected during shift changes. Recommend scheduling thermographic inspection within 14 days.',
    topContributingFactors: [
      { factor: 'Industrial Shock Loading', impact: 45 },
      { factor: 'Moderate Oil Level (71%)', impact: 30 },
      { factor: 'Temperature Peak (72.5°C)', impact: 25 }
    ],
    history: [
      { timestamp: '08:00', load: 70, temperature: 55, voltage: 22.0, risk: 50 },
      { timestamp: '12:00', load: 82, temperature: 66, voltage: 21.9, risk: 62 },
      { timestamp: '16:00', load: 86.0, temperature: 72.5, voltage: 21.8, risk: 68 }
    ]
  }
];

export const MOCK_OUTAGES: Outage[] = [
  {
    id: 'out-01',
    code: 'OUT-2026-0842',
    feederId: 'f-33',
    feederName: 'Feeder F-33 (South Port Cold Storage)',
    substationName: 'South Port Logistics Grid',
    zone: 'South',
    latitude: 22.9690,
    longitude: 72.6150,
    startTime: '2026-09-02 11:42:00',
    estimatedRestorationTime: '2026-09-02 14:15:00',
    durationMinutes: 78,
    cause: 'Grid Overload',
    affectedConsumers: 842,
    affectedLoadMw: 4.8,
    priority: 'CRITICAL',
    status: 'RESTORING',
    crewsDispatched: 3
  },
  {
    id: 'out-02',
    code: 'OUT-2026-0841',
    feederId: 'f-21',
    feederName: 'Feeder F-21 (Cyber Corridor)',
    substationName: 'Cyber Park Substation',
    zone: 'East',
    latitude: 23.0510,
    longitude: 72.6410,
    startTime: '2026-09-02 12:10:00',
    estimatedRestorationTime: '2026-09-02 13:45:00',
    durationMinutes: 50,
    cause: 'Equipment Failure',
    affectedConsumers: 310,
    affectedLoadMw: 2.1,
    priority: 'HIGH',
    status: 'DISPATCHED',
    crewsDispatched: 2
  },
  {
    id: 'out-03',
    code: 'OUT-2026-0839',
    feederId: 'f-08',
    feederName: 'Feeder F-08 (North Residential Trunk)',
    substationName: 'North Heights Substation',
    zone: 'North',
    latitude: 23.0720,
    longitude: 72.5510,
    startTime: '2026-09-02 10:15:00',
    estimatedRestorationTime: '2026-09-02 13:30:00',
    durationMinutes: 165,
    cause: 'Vegetation Overgrowth',
    affectedConsumers: 184,
    affectedLoadMw: 1.2,
    priority: 'MEDIUM',
    status: 'RESTORING',
    crewsDispatched: 1
  },
  {
    id: 'out-04',
    code: 'OUT-2026-0835',
    feederId: 'f-14',
    feederName: 'Feeder F-14 (Westgate Heavy Rolling)',
    substationName: 'Westgate Industrial Hub',
    zone: 'West',
    latitude: 23.0080,
    longitude: 72.4810,
    startTime: '2026-09-02 09:30:00',
    estimatedRestorationTime: '2026-09-02 13:00:00',
    durationMinutes: 210,
    cause: 'Weather / Lightning',
    affectedConsumers: 95,
    affectedLoadMw: 3.4,
    priority: 'MEDIUM',
    status: 'ACTIVE',
    crewsDispatched: 2
  }
];

export const MOCK_FORECASTS: Record<string, ForecastSummary> = {
  '24H': {
    horizon: '24H',
    currentDemandMw: 82.4,
    predictedPeakMw: 97.8,
    predictedPeakTime: '19:30',
    averageDemandMw: 74.2,
    modelAccuracyPct: 94.6,
    modelName: 'XGBoost + Prophet Ensemble',
    metrics: {
      mae: 1.42,
      rmse: 2.18,
      r2: 0.964,
      mape: 1.82
    },
    data: [
      { timestamp: '00:00', hour: 0, actualLoadMw: 48.2, predictedLoadMw: 49.0, lowerBoundMw: 46.2, upperBoundMw: 51.8, temperatureC: 24, humidityPct: 68, isPeak: false },
      { timestamp: '02:00', hour: 2, actualLoadMw: 42.1, predictedLoadMw: 43.2, lowerBoundMw: 40.5, upperBoundMw: 45.9, temperatureC: 23, humidityPct: 72, isPeak: false },
      { timestamp: '04:00', hour: 4, actualLoadMw: 40.8, predictedLoadMw: 41.5, lowerBoundMw: 39.0, upperBoundMw: 44.0, temperatureC: 22, humidityPct: 75, isPeak: false },
      { timestamp: '06:00', hour: 6, actualLoadMw: 51.4, predictedLoadMw: 50.8, lowerBoundMw: 48.0, upperBoundMw: 53.6, temperatureC: 25, humidityPct: 70, isPeak: false },
      { timestamp: '08:00', hour: 8, actualLoadMw: 68.9, predictedLoadMw: 67.5, lowerBoundMw: 64.2, upperBoundMw: 70.8, temperatureC: 29, humidityPct: 62, isPeak: false },
      { timestamp: '10:00', hour: 10, actualLoadMw: 79.3, predictedLoadMw: 78.4, lowerBoundMw: 75.0, upperBoundMw: 81.8, temperatureC: 33, humidityPct: 54, isPeak: false },
      { timestamp: '12:00', hour: 12, actualLoadMw: 84.6, predictedLoadMw: 83.9, lowerBoundMw: 80.2, upperBoundMw: 87.6, temperatureC: 36, humidityPct: 48, isPeak: false },
      { timestamp: '14:00', hour: 14, actualLoadMw: 88.2, predictedLoadMw: 87.5, lowerBoundMw: 83.8, upperBoundMw: 91.2, temperatureC: 38, humidityPct: 44, isPeak: false },
      { timestamp: '16:00', hour: 16, actualLoadMw: 82.4, predictedLoadMw: 83.0, lowerBoundMw: 79.5, upperBoundMw: 86.5, temperatureC: 37, humidityPct: 46, isPeak: false },
      { timestamp: '18:00', hour: 18, actualLoadMw: undefined, predictedLoadMw: 91.4, lowerBoundMw: 87.0, upperBoundMw: 95.8, temperatureC: 34, humidityPct: 52, isPeak: false },
      { timestamp: '19:30', hour: 19.5, actualLoadMw: undefined, predictedLoadMw: 97.8, lowerBoundMw: 93.2, upperBoundMw: 102.4, temperatureC: 32, humidityPct: 58, isPeak: true },
      { timestamp: '21:00', hour: 21, actualLoadMw: undefined, predictedLoadMw: 88.6, lowerBoundMw: 84.1, upperBoundMw: 93.1, temperatureC: 30, humidityPct: 62, isPeak: false },
      { timestamp: '23:00', hour: 23, actualLoadMw: undefined, predictedLoadMw: 62.1, lowerBoundMw: 58.8, upperBoundMw: 65.4, temperatureC: 27, humidityPct: 66, isPeak: false }
    ]
  },
  '7D': {
    horizon: '7D',
    currentDemandMw: 82.4,
    predictedPeakMw: 104.2,
    predictedPeakTime: 'Friday 19:30',
    averageDemandMw: 76.8,
    modelAccuracyPct: 92.8,
    modelName: 'XGBoost + Prophet Ensemble',
    metrics: {
      mae: 2.15,
      rmse: 3.42,
      r2: 0.941,
      mape: 2.76
    },
    data: [
      { timestamp: 'Mon', hour: 12, actualLoadMw: 81.2, predictedLoadMw: 82.0, lowerBoundMw: 77.0, upperBoundMw: 87.0, temperatureC: 35, humidityPct: 50, isPeak: false },
      { timestamp: 'Tue', hour: 12, actualLoadMw: 83.5, predictedLoadMw: 84.1, lowerBoundMw: 79.2, upperBoundMw: 89.0, temperatureC: 36, humidityPct: 48, isPeak: false },
      { timestamp: 'Wed (Today)', hour: 12, actualLoadMw: 84.6, predictedLoadMw: 85.0, lowerBoundMw: 80.0, upperBoundMw: 90.0, temperatureC: 38, humidityPct: 44, isPeak: false },
      { timestamp: 'Thu', hour: 12, actualLoadMw: undefined, predictedLoadMw: 89.4, lowerBoundMw: 83.5, upperBoundMw: 95.3, temperatureC: 39, humidityPct: 42, isPeak: false },
      { timestamp: 'Fri', hour: 12, actualLoadMw: undefined, predictedLoadMw: 104.2, lowerBoundMw: 97.0, upperBoundMw: 111.4, temperatureC: 40, humidityPct: 40, isPeak: true },
      { timestamp: 'Sat', hour: 12, actualLoadMw: undefined, predictedLoadMw: 71.0, lowerBoundMw: 65.2, upperBoundMw: 76.8, temperatureC: 37, humidityPct: 48, isPeak: false },
      { timestamp: 'Sun', hour: 12, actualLoadMw: undefined, predictedLoadMw: 64.8, lowerBoundMw: 59.0, upperBoundMw: 70.6, temperatureC: 36, humidityPct: 52, isPeak: false }
    ]
  }
};

export const MOCK_ANOMALIES: AnomalyRecord[] = [
  {
    id: 'anom-01',
    code: 'ANM-9041',
    consumerId: 'IND-8841',
    consumerName: 'Apex Precision Metallurgy Ltd',
    consumerCategory: 'Industrial',
    zone: 'East',
    feederId: 'f-21',
    timestamp: '2026-09-02 03:14:00',
    expectedConsumptionKwh: 120.5,
    actualConsumptionKwh: 488.2,
    deviationPct: 305.1,
    anomalyScore: 0.94,
    severity: 'CRITICAL',
    type: 'Nighttime Irregularity',
    status: 'INVESTIGATING',
    notes: 'Unscheduled off-peak induction furnace surge detected. Feeder loading spiked by 3.2 MW.'
  },
  {
    id: 'anom-02',
    code: 'ANM-9038',
    consumerId: 'COM-4219',
    consumerName: 'Metropolis Hypermarket Mall',
    consumerCategory: 'Commercial',
    zone: 'Central',
    feederId: 'f-02',
    timestamp: '2026-09-02 11:20:00',
    expectedConsumptionKwh: 340.0,
    actualConsumptionKwh: 82.0,
    deviationPct: -75.8,
    anomalyScore: 0.86,
    severity: 'HIGH',
    type: 'Sudden Drop',
    status: 'CONFIRMED',
    notes: 'Phase-C current drop indication. Potential primary metering CT failure or unauthorized load bypass.'
  },
  {
    id: 'anom-03',
    code: 'ANM-9032',
    consumerId: 'RES-1029',
    consumerName: 'Tower Block 14 (Green Valley)',
    consumerCategory: 'Residential',
    zone: 'North',
    feederId: 'f-08',
    timestamp: '2026-09-02 08:45:00',
    expectedConsumptionKwh: 45.0,
    actualConsumptionKwh: 112.4,
    deviationPct: 149.7,
    anomalyScore: 0.72,
    severity: 'MEDIUM',
    type: 'Sudden Spike',
    status: 'DETECTED',
    notes: 'Cluster of simultaneous fast EV chargers engaged concurrently during morning peak.'
  },
  {
    id: 'anom-04',
    code: 'ANM-9029',
    consumerId: 'AGR-3301',
    consumerName: 'South Agrico Irrigation Pumps',
    consumerCategory: 'Agricultural',
    zone: 'South',
    feederId: 'f-33',
    timestamp: '2026-09-01 22:15:00',
    expectedConsumptionKwh: 180.0,
    actualConsumptionKwh: 295.0,
    deviationPct: 63.8,
    anomalyScore: 0.65,
    severity: 'MEDIUM',
    type: 'Persistent Overdraw',
    status: 'RESOLVED',
    notes: 'Unmetered temporary submersible pump tap confirmed and regularized.'
  }
];

export const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'maint-01',
    assetId: 'tr-104',
    assetName: 'Transformer TR-104 (Sub-Station A)',
    assetType: 'Transformer',
    zone: 'East',
    riskScore: 87,
    priority: 'CRITICAL',
    type: 'Oil Dielectric Test',
    lastMaintenanceDate: '2025-07-18',
    nextInspectionDue: 'OVERDUE (47d)',
    estimatedCostUsd: 4800,
    status: 'OVERDUE',
    technicianAssigned: 'David Miller (Lead Tech)',
    aiSuggestedAction: 'Emergency oil filtration and bushing seal replacement required immediately to avert winding flashover.'
  },
  {
    id: 'maint-02',
    assetId: 'tr-202',
    assetName: 'Transformer TR-202 (Heavy Foundry)',
    assetType: 'Transformer',
    zone: 'South',
    riskScore: 82,
    priority: 'CRITICAL',
    type: 'Thermal Scan Inspection',
    lastMaintenanceDate: '2025-08-20',
    nextInspectionDue: 'OVERDUE (15d)',
    estimatedCostUsd: 6200,
    status: 'SCHEDULED',
    technicianAssigned: 'Vikram Patel',
    aiSuggestedAction: 'Deploy IR thermography crew to inspect tap changer contacts running at 82.1°C.'
  },
  {
    id: 'maint-03',
    assetId: 'f-33',
    assetName: 'Feeder F-33 (South Port Cold Storage)',
    assetType: 'Feeder',
    zone: 'South',
    riskScore: 89,
    priority: 'HIGH',
    type: 'Preventative Overhaul',
    lastMaintenanceDate: '2026-01-10',
    nextInspectionDue: 'In 12 days',
    estimatedCostUsd: 8500,
    status: 'SCHEDULED',
    technicianAssigned: 'Crews Team Beta',
    aiSuggestedAction: 'Re-tension sagged spans between poles 42-56 and clear eucalyptus canopy encroachment.'
  },
  {
    id: 'maint-04',
    assetId: 'tr-510',
    assetName: 'Transformer TR-510 (Westgate Steel Mill B)',
    assetType: 'Transformer',
    zone: 'West',
    riskScore: 68,
    priority: 'MEDIUM',
    type: 'Bushings Replacement',
    lastMaintenanceDate: '2025-11-15',
    nextInspectionDue: 'In 25 days',
    estimatedCostUsd: 3400,
    status: 'SCHEDULED',
    aiSuggestedAction: 'Replace aged HV porcelain bushings with composite silicone type.'
  }
];

export const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  systemStatus: 'GRID_OPERATIONAL',
  gridPulse: {
    loadMw: 82.4,
    peakDemandMw: 97.8,
    gridHealthPct: 91.4,
    riskStatus: 'LOW',
    activeOutagesCount: 4,
    frequencyHz: 50.02,
    energyTodayGwh: 2.84,
    loadChangePct: 8.2
  },
  kpis: {
    currentLoadMw: 82.4,
    currentLoadChangePct: 8.2,
    peakDemandMw: 97.8,
    peakTime: '19:30',
    activeOutages: 4,
    outageChangeCount: -1,
    highRiskAssets: 17,
    energyTodayGwh: 2.84,
    gridHealthPct: 91.4,
    healthChangePct: 0.8
  },
  healthDistribution: {
    healthyPct: 78,
    warningPct: 15,
    criticalPct: 7,
    totalAssets: 182
  },
  needsAttention: [
    {
      id: 'att-01',
      severity: 'CRITICAL',
      type: 'TRANSFORMER_RISK',
      title: 'Transformer TR-104',
      description: '87% Failure Risk — Winding temperature reached 78.4°C at 92% continuous load.',
      metric: '87% Risk',
      actionRoute: '/assets/tr-104'
    },
    {
      id: 'att-02',
      severity: 'HIGH',
      type: 'FEEDER_OVERLOAD',
      title: 'Feeder F-21 (Cyber Corridor)',
      description: 'Operating at 94.0% capacity with 888A current draw. Near tripping threshold.',
      metric: '94% Util',
      actionRoute: '/feeders'
    },
    {
      id: 'att-03',
      severity: 'CRITICAL',
      type: 'OUTAGE_EVENT',
      title: 'Outage: South Port Cold Storage',
      description: 'Feeder F-33 tripped on overload. 842 consumers affected, restoration crew on site.',
      metric: '842 Consumers',
      actionRoute: '/outages'
    },
    {
      id: 'att-04',
      severity: 'WARNING',
      type: 'PEAK_SPIKE',
      title: 'Evening Peak Forecast Surge',
      description: 'Predicted demand surge to 97.8 MW at 19:30 (+18.7% above baseline).',
      metric: '97.8 MW @ 19:30',
      actionRoute: '/forecast'
    }
  ],
  aiInsights: [
    {
      id: 'ins-01',
      category: 'DEMAND',
      insight: 'Demand is forecasted to surge 18.7% during the 19:30 evening peak due to rising ambient temperature (38°C).',
      timestamp: '10 mins ago',
      impact: 'HIGH'
    },
    {
      id: 'ins-02',
      category: 'ASSET',
      insight: '3 transformers show elevated failure risk (>75%). Priority inspection of TR-104 recommended.',
      timestamp: '25 mins ago',
      impact: 'HIGH'
    },
    {
      id: 'ins-03',
      category: 'EFFICIENCY',
      insight: 'Zone East recorded the highest consumption delta (+14.2% vs 7-day average), concentrated in tech corridors.',
      timestamp: '1 hour ago',
      impact: 'MEDIUM'
    },
    {
      id: 'ins-04',
      category: 'OUTAGE',
      insight: 'Average restoration duration reduced by 14.5 minutes following automated breaker recloser actuation.',
      timestamp: '2 hours ago',
      impact: 'INFO'
    }
  ]
};

export const MOCK_RELIABILITY: ReliabilityMetrics = {
  saidiMinutes: 42.6,
  saifiCount: 1.18,
  caidiMinutes: 36.1,
  maifiCount: 0.84,
  asaiPct: 99.982,
  monthlyTrend: [
    { month: 'Apr', saidi: 54.2, saifi: 1.45 },
    { month: 'May', saidi: 62.8, saifi: 1.62 },
    { month: 'Jun', saidi: 48.1, saifi: 1.28 },
    { month: 'Jul', saidi: 45.4, saifi: 1.21 },
    { month: 'Aug', saidi: 44.0, saifi: 1.19 },
    { month: 'Sep (YTD)', saidi: 42.6, saifi: 1.18 }
  ],
  outagesByCause: [
    { cause: 'Equipment Failure', count: 24, pct: 38 },
    { cause: 'Weather / Storms', count: 16, pct: 25 },
    { cause: 'Grid Overload', count: 12, pct: 19 },
    { cause: 'Vegetation', count: 8, pct: 12 },
    { cause: 'Third Party Damage', count: 4, pct: 6 }
  ],
  outagesByZone: [
    { zone: 'North', count: 12, durationHours: 18.4 },
    { zone: 'South', count: 22, durationHours: 34.2 },
    { zone: 'East', count: 18, durationHours: 26.8 },
    { zone: 'West', count: 8, durationHours: 11.5 },
    { zone: 'Central', count: 4, durationHours: 5.2 }
  ]
};

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-01',
    timestamp: '2026-09-02 12:45:12',
    user: 'Marcus Chen',
    role: 'OPERATOR',
    action: 'Dispatched Restoration Crew',
    category: 'OUTAGE_DISPATCH',
    details: 'Dispatched Crew Beta to Feeder F-33 pole 42 for fault isolation.',
    ipAddress: '192.168.1.45'
  },
  {
    id: 'log-02',
    timestamp: '2026-09-02 11:30:20',
    user: 'Eleanor Vance',
    role: 'ADMIN',
    action: 'Updated Asset Maintenance Schedule',
    category: 'MAINTENANCE_SCHEDULE',
    details: 'Scheduled priority oil dielectric test for Transformer TR-104.',
    ipAddress: '192.168.1.10'
  },
  {
    id: 'log-03',
    timestamp: '2026-09-02 10:15:04',
    user: 'Dr. Sarah Jenkins',
    role: 'ANALYST',
    action: 'Executed Grid Scenario Simulation',
    category: 'SIMULATION',
    details: 'Ran simulation: +4°C Temp, +15% Residential Demand, Peak Load Hour 19:30.',
    ipAddress: '192.168.1.88'
  },
  {
    id: 'log-04',
    timestamp: '2026-09-02 09:00:18',
    user: 'Eleanor Vance',
    role: 'ADMIN',
    action: 'User Login',
    category: 'AUTH',
    details: 'Successful SSO JWT login from Command Center Workstation 01.',
    ipAddress: '192.168.1.10'
  }
];
