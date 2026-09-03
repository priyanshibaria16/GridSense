import React from 'react';
import { GlassCard } from '../Common/GlassCard';
import { Transformer } from '../../types';
import { useGridStore } from '../../store/gridStore';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface RiskMatrixProps {
  transformers: Transformer[];
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ transformers }) => {
  const { openAssetDrawer } = useGridStore();

  const data = transformers.map((t) => ({
    id: t.id,
    name: t.name,
    code: t.code,
    load: t.utilizationPct,
    temperature: t.temperatureC,
    risk: t.riskScore,
    health: t.healthScore,
    age: t.ageYears,
    status: t.riskLevel,
    raw: t
  }));

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">Asset Risk Matrix (Load vs Temp)</h3>
          </div>
          <p className="text-xs text-slate-400">Quadrant scatter mapping electrical load against thermal stress</p>
        </div>
        <span className="text-xs font-mono text-cyan-400">Click node to inspect</span>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
            <XAxis
              type="number"
              dataKey="load"
              name="Utilization"
              unit="%"
              domain={[40, 105]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              label={{ value: 'Utilization Load (%)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8', fontSize: 10 }}
            />
            <YAxis
              type="number"
              dataKey="temperature"
              name="Temperature"
              unit="°C"
              domain={[35, 90]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              label={{ value: 'Winding Temp (°C)', angle: -90, position: 'insideLeft', offset: 15, fill: '#94a3b8', fontSize: 10 }}
            />
            <ZAxis type="number" dataKey="risk" range={[100, 400]} name="Risk Score" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="p-3 bg-[#0B1727] border border-cyan-500/40 rounded-xl shadow-xl text-xs font-sans text-white">
                      <div className="font-bold text-cyan-400 mb-1">{p.code} — {p.name}</div>
                      <div>Load: <b>{p.load}%</b></div>
                      <div>Temp: <b>{p.temperature}°C</b></div>
                      <div>Failure Risk: <b className={p.risk > 75 ? 'text-rose-400' : 'text-amber-400'}>{p.risk}%</b></div>
                      <div>Health Score: <b>{p.health}%</b></div>
                      <div className="text-[10px] text-cyan-300 mt-1">Click to open diagnostics</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              data={data}
              onClick={(node: any) => {
                if (node && node.raw) openAssetDrawer(node.raw);
                else if (node && node.payload && node.payload.raw) openAssetDrawer(node.payload.raw);
              }}
              cursor="pointer"
            >
              {data.map((entry, index) => {
                const color =
                  entry.risk >= 80 ? '#EF4444' : entry.risk >= 60 ? '#F59E0B' : '#10B981';
                return <Cell key={`cell-${index}`} fill={color} fillOpacity={0.85} stroke="#fff" strokeWidth={1} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-center">
        <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Low Risk (&lt;50%)
        </div>
        <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Warning (50-75%)
        </div>
        <div className="p-2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
          Critical Risk (&gt;75%)
        </div>
      </div>
    </GlassCard>
  );
};
