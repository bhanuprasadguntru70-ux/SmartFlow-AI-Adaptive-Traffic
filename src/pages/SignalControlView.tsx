import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { predictionService } from '../services/predictionService';

export const SignalControlView: React.FC = () => {
  const { selectedCity, cities, setSelectedCityId, transparencyStatus } = useTraffic();

  const [activeJnId, setActiveJnId] = useState(
    selectedCity.keyIntersections[0]?.id || ''
  );

  const activeJn =
    selectedCity.keyIntersections.find((j) => j.id === activeJnId) ||
    selectedCity.keyIntersections[0];

  const [nsDensity, setNsDensity] = useState<'HEAVY' | 'MODERATE' | 'LIGHT'>('HEAVY');
  const [ewDensity, setEwDensity] = useState<'HEAVY' | 'MODERATE' | 'LIGHT'>('MODERATE');

  // Compute recommendation using explainable heuristic
  const recommendation = predictionService.generateSignalRecommendation(
    nsDensity,
    ewDensity,
    activeJn?.name || 'Selected Junction'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[#0b192c] text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>INTERSECTION INTELLIGENCE & ADAPTIVE SIGNAL RECOMMENDATIONS</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          AI-Assisted Signal Timing Optimization
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          SmartFlow AI generates dynamic phase extension and green wave coordination recommendations based on observed arterial density. Recommendations are advisory and do not directly override municipal traffic controllers without authorized ITS integration.
        </p>
      </div>

      {/* Target Junction Selector */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-0.5">
            SELECTED METRO & JUNCTION
          </span>
          <h2 className="text-base font-bold text-slate-900">
            {activeJn?.name} ({selectedCity.name})
          </h2>
          <span className="text-xs text-slate-500">{activeJn?.roadName}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* City Selector */}
          <select
            value={selectedCity.id}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.state})
              </option>
            ))}
          </select>

          {/* Junction Selector */}
          <select
            value={activeJnId}
            onChange={(e) => setActiveJnId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {selectedCity.keyIntersections.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Signal vs AI Recommendation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Observed Traffic Conditions */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                CURRENT SIGNAL OBSERVATIONS
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Directional Flow Density
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
              Live Sensor Mode
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* North-South Corridor Density Selector */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">North-South Main Arterial:</span>
                <span className="font-bold text-blue-600">{nsDensity}</span>
              </div>
              <div className="flex gap-2">
                {(['LIGHT', 'MODERATE', 'HEAVY'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setNsDensity(d)}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      nsDensity === d
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* East-West Cross Corridor Density Selector */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">East-West Cross Corridor:</span>
                <span className="font-bold text-blue-600">{ewDensity}</span>
              </div>
              <div className="flex gap-2">
                {(['LIGHT', 'MODERATE', 'HEAVY'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setEwDensity(d)}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      ewDensity === d
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              Corridor observed: <strong>{activeJn?.roadName}</strong>
            </div>
          </div>
        </div>

        {/* Box 2: AI Recommendation Panel */}
        <div className="p-6 bg-white border border-blue-200 rounded-2xl shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI RECOMMENDATION
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Optimal Signal Timing Recommendation
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Heuristic
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 font-bold text-sm leading-relaxed">
              "{recommendation.recommendation}"
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">REASON</span>
                <p className="text-slate-700 font-medium leading-relaxed mt-0.5">
                  {recommendation.reason}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">DATA SOURCE</span>
                <span className="text-slate-950 font-mono font-bold text-[11px]">
                  {recommendation.dataSource}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">ML MODEL STATUS</span>
                <span className="text-slate-600 text-[11px]">
                  {transparencyStatus.mlModelConnected
                    ? 'Connected to Python LSTM Inference Engine'
                    : 'Rule-Based Saturation Heuristic (ML Backend Awaiting POST /api/predict)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Legal Disclosure */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Notice for Traffic Authorities:</strong> SmartFlow AI recommendations are advisory decision-support tools. Direct physical controller actuation requires integration with authorized municipal traffic infrastructure (e.g. NTCIP compliant controllers).
        </p>
      </div>
    </div>
  );
};
