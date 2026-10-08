import React, { useState } from 'react';
import {
  Siren,
  Flame,
  Shield,
  MapPin,
  Hospital,
  ArrowRight,
  ShieldAlert,
  Info,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { RealCityMap } from '../components/RealCityMap';

export const EmergencyPriorityView: React.FC = () => {
  const { selectedCity, cities, setSelectedCityId, showToast } = useTraffic();

  const [vehicleType, setVehicleType] = useState<'AMBULANCE' | 'FIRE_ENGINE' | 'POLICE'>('AMBULANCE');
  const [selectedHospital, setSelectedHospital] = useState(selectedCity.hospitals[0]?.name || '');
  const [selectedStartPoint, setSelectedStartPoint] = useState(selectedCity.keyIntersections[0]?.name || '');

  const [routeCalculated, setRouteCalculated] = useState(true);

  const hospitals = selectedCity.hospitals;
  const intersections = selectedCity.keyIntersections;

  const handleComputeRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setRouteCalculated(true);
    showToast(`Emergency priority route computed for ${selectedCity.name}. Visualized on real GIS cartography.`, 'emergency');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-[#0b192c] via-[#1a0b16] to-[#0b192c] text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
          <Siren className="w-4 h-4 animate-bounce" />
          <span>EMERGENCY DISPATCH & ROUTE PRIORITY</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          AI Recommended Emergency Priority Route
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Visualizes optimal arterial transit paths for ambulances, fire engines, and police responders towards trauma centers and hospitals. Signals along the path are recommended for green wave prioritization.
        </p>
      </div>

      {/* Dispatch Controls Form */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-rose-600" />
          Emergency Route Planner
        </h2>

        <form onSubmit={handleComputeRoute} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Vehicle Type */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">Emergency Vehicle</label>
            <div className="flex gap-1.5">
              {(
                [
                  { id: 'AMBULANCE', label: 'Ambulance 108', icon: <Siren className="w-3.5 h-3.5 text-rose-600" /> },
                  { id: 'FIRE_ENGINE', label: 'Fire Engine', icon: <Flame className="w-3.5 h-3.5 text-orange-600" /> },
                  { id: 'POLICE', label: 'Police', icon: <Shield className="w-3.5 h-3.5 text-blue-600" /> },
                ] as const
              ).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleType(v.id)}
                  className={`flex-1 p-2 rounded-lg font-bold border flex items-center justify-center gap-1 transition-colors ${
                    vehicleType === v.id
                      ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {v.icon}
                  <span className="truncate">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* City Selector */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">Target Metro</label>
            <select
              value={selectedCity.id}
              onChange={(e) => {
                setSelectedCityId(e.target.value);
                const target = cities.find((c) => c.id === e.target.value);
                if (target) {
                  setSelectedHospital(target.hospitals[0]?.name || '');
                  setSelectedStartPoint(target.keyIntersections[0]?.name || '');
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          {/* Origin Location */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">Origin Intersection</label>
            <select
              value={selectedStartPoint}
              onChange={(e) => setSelectedStartPoint(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {intersections.map((j) => (
                <option key={j.id} value={j.name}>
                  {j.name} ({j.roadName})
                </option>
              ))}
            </select>
          </div>

          {/* Destination Hospital */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">Destination Trauma Center</label>
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {hospitals.map((h, i) => (
                <option key={i} value={h.name}>
                  {h.name} (Emergency: {h.emergencyContact})
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Real Map Showing the Route */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Real Map Route Visualization ({selectedCity.name})
          </h2>
          <span className="text-xs font-mono text-rose-600 font-bold">
            Red Dashed Line: Recommended Emergency Transit Spine
          </span>
        </div>

        <div className="h-[480px]">
          <RealCityMap showEmergencyRoute={routeCalculated} />
        </div>
      </div>

      {/* Legal & ITS Infrastructure Disclosure */}
      <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Municipal Notice:</strong> "AI recommended emergency priority route." SmartFlow AI generates decision-support route recommendations for emergency services. Physical signal pre-emption (changing traffic lights to green) requires certified hardware integration with municipal traffic-control infrastructure (e.g., optical strobe sensors, GPS transponders, or NTCIP municipal servers).
        </p>
      </div>
    </div>
  );
};
