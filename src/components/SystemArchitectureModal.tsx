import React from 'react';
import { X, ArrowDown, Database, Activity, Cpu, Sliders, Siren, ShieldCheck, Check } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pipeline = [
    {
      step: '01',
      title: 'REAL TRAFFIC DATA',
      icon: <Database className="w-5 h-5 text-blue-600" />,
      desc: 'GPS probes, OpenStreetMap road vectors, Mapbox traffic tiles, municipal camera feeds & inductive loop detector sensors.',
    },
    {
      step: '02',
      title: 'TRAFFIC ANALYSIS',
      icon: <Activity className="w-5 h-5 text-indigo-600" />,
      desc: 'Directional flow density aggregation, spatial asymmetry mapping between main arterials and secondary cross-streets.',
    },
    {
      step: '03',
      title: 'CONGESTION DETECTION',
      icon: <Activity className="w-5 h-5 text-amber-600" />,
      desc: 'Real-time bottleneck identification, junction queue accumulation, and incident spillover tracking.',
    },
    {
      step: '04',
      title: 'ML PREDICTION',
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      desc: 'Multi-horizon neural sequence models (LSTM / Gradient Boosted Trees) forecast diurnal commute peaks via POST /api/predict.',
    },
    {
      step: '05',
      title: 'SIGNAL RECOMMENDATION',
      icon: <Sliders className="w-5 h-5 text-emerald-600" />,
      desc: 'Calculates dynamic phase split extensions using Webster minimum delay formula to relieve heavier approaches.',
    },
    {
      step: '06',
      title: 'EMERGENCY PRIORITY',
      icon: <Siren className="w-5 h-5 text-rose-600" />,
      desc: 'Pre-emptive transit corridor routing for Ambulance 108, Fire, and Police towards trauma care centers.',
    },
    {
      step: '07',
      title: 'SAFER + SMOOTHER ROADS',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      desc: 'Reduced stationary idling, minimized vehicular carbon emissions, and saved commuter travel hours.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              NATIONAL HACKATHON EVALUATION
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
              How SmartFlow AI Works
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7 Step Pipeline */}
        <div className="py-6 space-y-3">
          {pipeline.map((item, idx) => (
            <React.Fragment key={item.step}>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 shrink-0 shadow-2xs">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-600">{item.step}.</span>
                    <h3 className="text-xs font-extrabold tracking-wide text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {idx < pipeline.length - 1 && (
                <div className="flex justify-center -my-1 text-slate-400">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
