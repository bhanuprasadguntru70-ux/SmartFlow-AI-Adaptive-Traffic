import React, { useState } from 'react';
import {
  MapPin,
  RefreshCw,
  AlertTriangle,
  Radio,
  ExternalLink,
  ShieldAlert,
  Hospital,
  Layers,
  Info,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { RealCityMap } from '../components/RealCityMap';
import { INDIA_CITIES } from '../data/indiaCities';

export const LiveMapView: React.FC = () => {
  const {
    selectedCity,
    setSelectedCityId,
    transparencyStatus,
    retryLiveData,
  } = useTraffic();

  const [emergencyRouteActive, setEmergencyRouteActive] = useState(false);
  const [selectedIntersectionData, setSelectedIntersectionData] = useState<any>(null);

  return (
    <div className="space-y-6">
      {/* City Header Strip */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              REAL-TIME GIS CARTOGRAPHY
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">{selectedCity.state}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>{selectedCity.name} Live Traffic Map</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real geographic coordinates, official road network topology, and municipal emergency hubs
          </p>
        </div>

        {/* City Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
            <MapPin className="w-4 h-4 text-blue-600" />
            <select
              value={selectedCity.id}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {INDIA_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setEmergencyRouteActive(!emergencyRouteActive)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              emergencyRouteActive
                ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {emergencyRouteActive ? 'Hide Emergency Route' : 'Show Emergency Route'}
          </button>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="h-[600px]">
        <RealCityMap
          showEmergencyRoute={emergencyRouteActive}
          onSelectIntersection={(jn) => setSelectedIntersectionData(jn)}
        />
      </div>

      {/* Selected Intersection Info Panel if clicked */}
      {selectedIntersectionData && (
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                SELECTED INTERSECTION SENSOR
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {selectedIntersectionData.name}
              </h3>
              <span className="text-xs text-slate-500">
                {selectedIntersectionData.roadName} · {selectedCity.name}
              </span>
            </div>

            <button
              onClick={() => setSelectedIntersectionData(null)}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Close
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed">
            <strong>Signal Adaptation Guidance:</strong> Inflow road geometry at this junction supports dynamic phase splits. Directional flow balance can be adapted in the Signal Intelligence panel without fabricating unverified vehicle count telemetry.
          </div>
        </div>
      )}

      {/* Data Source Notice */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong>Verified Cartographic Data:</strong> Real street geography and road vectors provided by {transparencyStatus.mapEngineName}. No synthetic vehicle counts or fabricated delay statistics are displayed on this live map screen.
        </div>
      </div>
    </div>
  );
};
