import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Substation, Feeder, Transformer, Outage } from '../../types';
import { useGridStore } from '../../store/gridStore';
import { Filter, Layers, Zap, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

interface GridMapProps {
  substations: Substation[];
  feeders: Feeder[];
  transformers: Transformer[];
  outages: Outage[];
  height?: string;
  onSelectTransformer?: (transformer: Transformer) => void;
}

export const GridMap: React.FC<GridMapProps> = ({
  substations,
  feeders,
  transformers,
  outages,
  height = 'h-[500px]',
  onSelectTransformer
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const { openAssetDrawer } = useGridStore();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OUTAGES'>('ALL');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map once
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.0330, 72.5780],
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      // Add zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Dark CartoDB Tile Layer for enterprise grid look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layers = layerGroupRef.current;
    if (!map || !layers) return;

    layers.clearLayers();

    // 1. Draw Feeder Polylines
    feeders.forEach((feeder) => {
      const isCritical = feeder.status === 'CRITICAL';
      const isWarning = feeder.status === 'WARNING';
      const color = isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#00E5FF';

      if (activeFilter === 'HEALTHY' && feeder.status !== 'HEALTHY') return;
      if (activeFilter === 'WARNING' && feeder.status !== 'WARNING') return;
      if (activeFilter === 'CRITICAL' && feeder.status !== 'CRITICAL') return;
      if (activeFilter === 'OUTAGES') return;

      const polyline = L.polyline(feeder.coordinates, {
        color,
        weight: 3.5,
        opacity: 0.85,
        dashArray: isCritical ? '6, 6' : undefined
      }).addTo(layers);

      polyline.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #fff;">
          <div style="font-weight: 700; color: ${color}; margin-bottom: 4px;">${feeder.name}</div>
          <div>Capacity: <b>${feeder.capacityMw} MW</b></div>
          <div>Current Load: <b>${feeder.currentLoadMw} MW (${feeder.utilizationPct}%)</b></div>
          <div>Power Factor: <b>${feeder.powerFactor}</b></div>
          <div style="margin-top: 4px; font-size: 11px; color: #94a3b8;">Substation: ${feeder.substationName}</div>
        </div>
      `);
    });

    // 2. Draw Substations (Square/Large Pulse Markers)
    if (activeFilter !== 'OUTAGES') {
      substations.forEach((sub) => {
        const icon = L.divIcon({
          className: 'custom-substation-marker',
          html: `
            <div style="
              width: 22px; 
              height: 22px; 
              background: #0B1727; 
              border: 2px solid #00E5FF; 
              border-radius: 6px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: #00E5FF; 
              font-weight: bold; 
              font-size: 11px;
              box-shadow: 0 0 15px rgba(0,229,255,0.6);
            ">
              ⚡
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const marker = L.marker([sub.latitude, sub.longitude], { icon }).addTo(layers);
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #fff;">
            <div style="font-weight: 700; color: #00E5FF; margin-bottom: 4px;">${sub.name} (${sub.code})</div>
            <div>Rating: <b>${sub.voltageRatingKv} kV</b></div>
            <div>Capacity: <b>${sub.capacityMva} MVA</b></div>
            <div>Load: <b>${sub.currentLoadMva} MVA (${sub.utilizationPct}%)</b></div>
            <div>Health Score: <b style="color: #10B981;">${sub.healthScore}%</b></div>
            <div>Feeders: <b>${sub.feederCount}</b> | Transformers: <b>${sub.transformerCount}</b></div>
          </div>
        `);
      });
    }

    // 3. Draw Transformers
    transformers.forEach((tr) => {
      const isCritical = tr.status === 'CRITICAL';
      const isWarning = tr.status === 'WARNING';
      const isHealthy = tr.status === 'HEALTHY';

      if (activeFilter === 'HEALTHY' && !isHealthy) return;
      if (activeFilter === 'WARNING' && !isWarning) return;
      if (activeFilter === 'CRITICAL' && !isCritical) return;
      if (activeFilter === 'OUTAGES') return;

      const fillColor = isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981';
      const strokeColor = isCritical ? '#FF3366' : isWarning ? '#FFB800' : '#00E5FF';

      const circle = L.circleMarker([tr.latitude, tr.longitude], {
        radius: isCritical ? 9 : 7,
        fillColor,
        fillOpacity: 0.9,
        color: strokeColor,
        weight: 2
      }).addTo(layers);

      circle.on('click', () => {
        if (onSelectTransformer) {
          onSelectTransformer(tr);
        } else {
          openAssetDrawer(tr);
        }
      });

      circle.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #fff; min-width: 180px;">
          <div style="font-weight: 700; color: ${fillColor};">${tr.code} — ${tr.name}</div>
          <div style="margin-top: 4px;">Health: <b>${tr.healthScore}%</b> | Risk: <b style="color: ${fillColor};">${tr.riskScore}%</b></div>
          <div>Load: <b>${tr.utilizationPct}%</b> | Temp: <b>${tr.temperatureC}°C</b></div>
          <div>Voltage: <b>${tr.voltageKv} kV</b> | PF: <b>${tr.powerFactor}</b></div>
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #00E5FF; cursor: pointer;">
            👉 Click marker to open telemetry diagnostics
          </div>
        </div>
      `);
    });

    // 4. Draw Outages (Pulsing Red Markers)
    if (activeFilter === 'ALL' || activeFilter === 'OUTAGES' || activeFilter === 'CRITICAL') {
      outages.forEach((outage) => {
        const outageIcon = L.divIcon({
          className: 'custom-outage-marker',
          html: `
            <div style="position: relative; width: 24px; height: 24px;">
              <div style="
                position: absolute; 
                inset: 0; 
                border-radius: 9999px; 
                background: #EF4444; 
                opacity: 0.4; 
                animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></div>
              <div style="
                position: relative; 
                width: 24px; 
                height: 24px; 
                border-radius: 9999px; 
                background: #EF4444; 
                border: 2px solid #fff; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 11px; 
                color: #fff; 
                font-weight: bold;
                box-shadow: 0 0 15px #EF4444;
              ">
                ⚠️
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([outage.latitude, outage.longitude], { icon: outageIcon }).addTo(layers);
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #fff;">
            <div style="font-weight: 700; color: #EF4444; margin-bottom: 4px;">ACTIVE OUTAGE: ${outage.code}</div>
            <div>Feeder: <b>${outage.feederName}</b></div>
            <div>Cause: <b>${outage.cause}</b></div>
            <div>Affected Consumers: <b style="color: #EF4444;">${outage.affectedConsumers}</b></div>
            <div>Status: <b style="color: #F59E0B;">${outage.status}</b></div>
            <div>Est. Restoration: <b>${outage.estimatedRestorationTime}</b></div>
          </div>
        `);
      });
    }
  }, [substations, feeders, transformers, outages, activeFilter, openAssetDrawer, onSelectTransformer]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
      {/* Top Filter Bar Overlay */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 shadow-lg text-xs font-mono">
        <div className="flex items-center gap-1 px-2 text-slate-400">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">LAYER:</span>
        </div>

        {(['ALL', 'HEALTHY', 'WARNING', 'CRITICAL', 'OUTAGES'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === filter
                ? filter === 'CRITICAL' || filter === 'OUTAGES'
                  ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                  : 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Legend Overlay Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center gap-4 px-3 py-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-cyan-400"></span>
          <span>Substation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>Healthy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>Critical Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <span>Outage</span>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className={`w-full ${height} z-0`} />
    </div>
  );
};
