import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { GlassCard } from '../Common/GlassCard';
import { ForecastSummary } from '../../types';
import { apiService } from '../../services/api';
import { TrendingUp, Clock, Target, Cpu } from 'lucide-react';

export const DemandForecastCard: React.FC = () => {
  const [horizon, setHorizon] = useState<'1H' | '6H' | '24H' | '7D' | '30D'>('24H');
  const [forecast, setForecast] = useState<ForecastSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiService.getForecast(horizon).then((res) => {
      if (mounted) {
        setForecast(res);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [horizon]);

  if (!forecast) return null;

  const horizons: ('1H' | '6H' | '24H' | '7D' | '30D')[] = ['1H', '6H', '24H', '7D', '30D'];

  return (
    <GlassCard className="flex flex-col space-y-4">
      {/* Header with Title and Horizon Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-wide">Electricity Demand Forecast</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated multi-variable ML model combining weather, historical loads, and industrial shifts
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {horizons.map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                horizon === h
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Predicted Peak</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">{forecast.predictedPeakMw} MW</div>
          <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Peak Time: {forecast.predictedPeakTime}</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Average Demand</div>
          <div className="text-xl font-bold text-slate-200 font-mono mt-0.5">{forecast.averageDemandMw} MW</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Baseline: 74.2 MW</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Model Accuracy</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{forecast.modelAccuracyPct}%</div>
          <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">R² Score: {forecast.metrics.r2}</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-[11px] text-slate-400 uppercase font-mono">Active Model</div>
          <div className="text-xs font-bold text-cyan-300 truncate mt-1">{forecast.modelName}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">MAE: {forecast.metrics.mae} MW | RMSE: {forecast.metrics.rmse} MW</div>
        </div>
      </div>

      {/* Recharts Forecast Graph */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={forecast.data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              {/* Confidence Band Gradient */}
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="timestamp"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              domain={['dataMin - 5', 'dataMax + 10']}
              unit=" MW"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(11, 23, 39, 0.95)',
                borderColor: 'rgba(0, 229, 255, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
              formatter={(val: any, name: any) => [`${val} MW`, name]}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />

            {/* Confidence Upper/Lower bounds area */}
            <Area
              type="monotone"
              dataKey="upperBoundMw"
              stroke="transparent"
              fill="url(#confidenceGradient)"
              name="Confidence Interval (95%)"
            />
            <Area
              type="monotone"
              dataKey="lowerBoundMw"
              stroke="transparent"
              fill="#07111F"
              name="Lower Bound"
              legendType="none"
            />

            {/* Actual Load Line */}
            <Line
              type="monotone"
              dataKey="actualLoadMw"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#10B981' }}
              activeDot={{ r: 6 }}
              name="Actual Load (MW)"
            />

            {/* Predicted Load Line */}
            <Line
              type="monotone"
              dataKey="predictedLoadMw"
              stroke="#00E5FF"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#00E5FF' }}
              activeDot={{ r: 6 }}
              name="Predicted Load (MW)"
            />

            {/* Peak reference line */}
            <ReferenceLine y={forecast.predictedPeakMw} stroke="#EF4444" strokeDasharray="3 3" label={{ value: `Peak: ${forecast.predictedPeakMw} MW`, fill: '#EF4444', fontSize: 10, position: 'top' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1.5 font-mono">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Model metrics calculated from evaluation dataset
        </span>
        <span className="text-cyan-400 font-mono">Updated: Real-time telemetry feed</span>
      </div>
    </GlassCard>
  );
};
