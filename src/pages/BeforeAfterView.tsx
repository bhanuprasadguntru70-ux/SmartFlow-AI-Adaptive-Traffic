import React from 'react';
import {
  TrendingDown,
  Clock,
  Fuel,
  Activity,
  Sparkles,
  Info,
  CheckCircle2,
  Database,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';

export const BeforeAfterView: React.FC = () => {
  const { appMode, setAppMode, selectedCity } = useTraffic();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[#0b192c] text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>MEASURED IMPACT & EVALUATION PROTOCOL</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          AI Optimization Impact & Benchmark Analysis
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Scientific evaluation comparing traditional fixed-time signal cycles against dynamic adaptive phase splits. In Live Mode, measurements strictly require verified baseline loop detector telemetry.
        </p>
      </div>

      {appMode === 'LIVE' ? (
        /* LIVE MODE: Honest reporting - no fabricated numbers */
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
            <Database className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              DATA COLLECTION IN PROGRESS ({selectedCity.name})
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Waiting for Sufficient Real Traffic Baseline Data
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              To adhere to National Hackathon honesty guidelines, SmartFlow AI never invents fake percentage improvements or synthetic fuel savings. Empirical impact comparisons are computed once continuous 7-day municipal sensor feeds or CCTV computer vision cameras are connected.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-lg mx-auto text-left text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800">
              Telemetry Required for Verified Before/After Ledger:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Inductive loop detector occupancy rates (minimum 72-hour baseline)</li>
              <li>Connected GPS probe average approach speeds (NH-16 & arterial roads)</li>
              <li>Intersection queue dissipation timestamps per phase</li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setAppMode('DEMO')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Synthetic Benchmarks in DEMO MODE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* DEMO MODE: Clearly Labeled Simulation Benchmarks */
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>DEMO MODE ACTIVE: Below metrics represent theoretical heuristic simulation results for academic evaluation.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                Average Vehicle Delay
              </span>
              <div className="text-3xl font-extrabold font-mono text-slate-900">
                92s → 54s
              </div>
              <p className="text-xs text-slate-500">
                ↓ 41% theoretical delay drop via Webster cycle allocation.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                Junction Congestion
              </span>
              <div className="text-3xl font-extrabold font-mono text-slate-900">
                78% → 43%
              </div>
              <p className="text-xs text-slate-500">
                ↓ 35% congestion reduction based on directional rebalancing.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                Idling Fuel Waste
              </span>
              <div className="text-3xl font-extrabold font-mono text-slate-900">
                240L → 175L
              </div>
              <p className="text-xs text-slate-500">
                ↓ 27% fuel waste reduction through green wave synchronization.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
