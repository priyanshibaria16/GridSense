import { Request, Response } from 'express';

export const copilotController = {
  async query(req: Request, res: Response) {
    const { question } = req.body;
    const q = (question || '').toLowerCase();

    if (q.includes('risk') || q.includes('transformer') || q.includes('attention') || q.includes('failing')) {
      return res.json({
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
      });
    }

    if (q.includes('peak') || q.includes('tomorrow') || q.includes('forecast') || q.includes('demand')) {
      return res.json({
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
      });
    }

    // Default Copilot response
    res.json({
      id: 'copilot-' + Date.now(),
      sender: 'assistant',
      timestamp: 'Just now',
      intent: 'GENERAL',
      text: 'Grid telemetry indicates the overall power distribution system is in a **STABLE / NOMINAL** operating envelope with **82.4 MW current load** and **91.4% composite health**. Key operational items to track are **TR-104 (87% risk)** and the anticipated **19:30 evening peak (97.8 MW)**.',
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
    });
  }
};
