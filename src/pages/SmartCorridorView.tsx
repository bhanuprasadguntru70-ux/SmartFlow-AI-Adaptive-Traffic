import React from 'react';
import {
  Sliders,
  Zap,
  Navigation,
  ArrowRight,
  Info,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';

export const SmartCorridorView: React.FC = () => {
  const { selectedCity, cities, setSelectedCityId, appMode } = useTraffic();

  const corridorIntersections = selectedCity.keyIntersections.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[#0b192c] text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>ARTERIAL PROGRESSION & GREEN WAVE SYNCHRONIZATION</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          Smart Green Corridor Management
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Coordinates successive traffic signals along primary municipal avenues to enable vehicle platoons to move without frequent stop-and-go deceleration.
        </p>
      </div>

      {/* Target Corridor Header */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-0.5">
            CORRIDOR GEOMETRY
          </span>
          <h2 className="text-base font-bold text-slate-900">
            {selectedCity.name} Primary Arterial Spine
          </h2>
          <span className="text-xs text-slate-500">
            Connecting {corridorIntersections.length} major intersections along {corridorIntersections[0]?.roadName || 'main transit route'}
          </span>
        </div>

        <select
          value={selectedCity.id}
          onChange={(e) => setSelectedCityId(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.state})
            </option>
          ))}
        </select>
      </div>

      {/* Connected Intersections Progression Track */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-emerald-600" />
          Connected Intersections Along Route
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {corridorIntersections.map((jn, idx) => (
            <div
              key={jn.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Green Wave Node
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">{jn.name}</h4>
                <p className="text-xs text-slate-500 truncate">{jn.roadName}</p>
              </div>

              <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 space-y-1">
                <div>Coords: <span className="font-mono">{jn.lat.toFixed(4)}°, {jn.lng.toFixed(4)}°</span></div>
                <div>Status: <span className="text-emerald-700 font-semibold">Wave Offset Coordinated</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Green Wave Recommendation */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs text-emerald-950">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <Sparkles className="w-4 h-4" />
            <span>AI CORRIDOR PROGRESSION RECOMMENDATION</span>
          </div>
          <p className="leading-relaxed">
            Synchronize signal offsets at 42 km/h vehicle platoon progression speed along {selectedCity.name} arterial corridor. This coordinates green arrivals across nodes 1 through {corridorIntersections.length} to prevent secondary queue buildup.
          </p>
        </div>

        {/* Honest Impact Notice */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <strong>Measurement Transparency Notice:</strong> "Impact estimate unavailable until historical/real signal sensor data is connected." SmartFlow AI avoids fabricating synthetic percentages in live mode. Actual time savings and fuel metrics are measured once loop detector API streams or connected vehicle GPS probe logs are active.
          </div>
        </div>
      </div>
    </div>
  );
};
