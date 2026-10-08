import React from 'react';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { INDIA_CITIES, CityLocation } from '../data/indiaCities';
import { useTraffic } from '../context/TrafficContext';

interface IndiaMapOverviewProps {
  onSelectCity: (cityId: string) => void;
}

export const IndiaMapOverview: React.FC<IndiaMapOverviewProps> = ({ onSelectCity }) => {
  const { selectedCity, setSelectedCityId } = useTraffic();

  // Group by State
  const stateGroups = INDIA_CITIES.reduce((acc, city) => {
    if (!acc[city.state]) acc[city.state] = [];
    acc[city.state].push(city);
    return acc;
  }, {} as Record<string, CityLocation[]>);

  const getStatusDot = (status: CityLocation['trafficStatus']) => {
    switch (status) {
      case 'LIVE':
        return <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" title="Live Traffic Connected" />;
      case 'DATA_DELAYED':
        return <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-200" title="Data Delayed" />;
      case 'UNAVAILABLE':
      default:
        return <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-200" title="Data Unavailable" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-0.5">
            PAN-INDIA METROPOLITAN GRID
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Live Traffic Across India (22 Cities Monitored)
          </h2>
          <p className="text-xs text-slate-500">
            Select any metropolitan transit hub to center real-time GIS layers and intersection telemetry
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>🟢 Live</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>🟡 Data Delayed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>🔴 Data Unavailable</span>
          </div>
        </div>
      </div>

      {/* State by State City Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stateGroups).map(([stateName, citiesInState]) => (
          <div
            key={stateName}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5"
          >
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
              <span>{stateName}</span>
              <span className="text-[10px] text-slate-400 font-mono">({citiesInState.length})</span>
            </h3>

            <div className="space-y-1.5">
              {citiesInState.map((city) => {
                const isSelected = selectedCity.id === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCityId(city.id);
                      onSelectCity(city.id);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {getStatusDot(city.trafficStatus)}
                      <span className="truncate">{city.name}</span>
                    </div>

                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
