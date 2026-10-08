import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  PlusCircle,
  CheckCircle2,
  MapPin,
  Clock,
  Info,
  Filter,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { IncidentType } from '../services/incidentService';

export const IncidentView: React.FC = () => {
  const {
    incidents,
    addIncident,
    resolveIncident,
    selectedCity,
    cities,
    setSelectedCityId,
  } = useTraffic();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');

  // Form State
  const [type, setType] = useState<IncidentType>('ACCIDENT');
  const [title, setTitle] = useState('');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !locationName) return;

    addIncident({
      type,
      title,
      description: description || 'Traffic disruption reported at location.',
      cityName: selectedCity.name,
      locationName,
      lat: selectedCity.lat,
      lng: selectedCity.lng,
    });

    setTitle('');
    setLocationName('');
    setDescription('');
    setIsFormOpen(false);
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (filterType === 'ALL') return true;
    return inc.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[#0b192c] text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>ROAD CLOSURE & TRAFFIC INCIDENT LOG</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          Traffic Incident Management System
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Aggregating municipal roadwork notifications and verified citizen hazard reports. Manually entered records are clearly designated as <strong className="text-amber-400">USER REPORTED</strong> to maintain official data integrity.
        </p>
      </div>

      {/* Control Bar: City Filter & Report Button */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
            <MapPin className="w-4 h-4 text-blue-600" />
            <select
              value={selectedCity.id}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl text-xs overflow-x-auto">
            {['ALL', 'ACCIDENT', 'ROAD_CLOSURE', 'CONSTRUCTION', 'FLOODING', 'VEHICLE_BREAKDOWN'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-colors ${
                  filterType === f
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isFormOpen ? 'Close Form' : 'Report Incident'}</span>
        </button>
      </div>

      {/* Manual Report Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-6 bg-white border border-amber-300 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Submit Citizen Incident Report</span>
            </h3>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded uppercase">
              Will be labeled: USER REPORTED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-500 font-semibold block mb-1">Incident Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-slate-900 focus:outline-none focus:border-amber-500"
              >
                <option value="ACCIDENT">Accident</option>
                <option value="ROAD_CLOSURE">Road Closure</option>
                <option value="CONSTRUCTION">Construction / Metro Work</option>
                <option value="FLOODING">Monsoon Flooding / Waterlogging</option>
                <option value="VEHICLE_BREAKDOWN">Vehicle Breakdown</option>
                <option value="PUBLIC_EVENT">Public Event / Procession</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Incident Headline</label>
              <input
                type="text"
                placeholder="e.g. Flyover approach waterlogged"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Specific Location / Road</label>
              <input
                type="text"
                placeholder="e.g. Benz Circle towards Bandar Road"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-500 font-semibold block mb-1">Detailed Description & Lane Blockage</label>
            <textarea
              rows={2}
              placeholder="e.g. Water accumulation in center lane; traffic moving slowly via service road."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-xs"
            >
              Publish Report
            </button>
          </div>
        </form>
      )}

      {/* Incidents List */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No incidents reported for this filter category. All monitored transit lines operating normally.
          </div>
        ) : (
          filteredIncidents.map((inc) => (
            <div
              key={inc.id}
              className={`p-5 rounded-2xl bg-white border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
                inc.status === 'CLEARED'
                  ? 'border-slate-200 opacity-60'
                  : inc.source === 'OFFICIAL_MUNICIPAL'
                  ? 'border-blue-200'
                  : 'border-amber-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    inc.source === 'OFFICIAL_MUNICIPAL'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        inc.source === 'OFFICIAL_MUNICIPAL'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inc.source === 'OFFICIAL_MUNICIPAL' ? 'OFFICIAL MUNICIPAL' : 'USER REPORTED'}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{inc.title}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {inc.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span>Location: <strong className="text-slate-800">{inc.locationName}</strong></span>
                    <span>·</span>
                    <span>City: <strong className="text-slate-800">{inc.cityName}</strong></span>
                    <span>·</span>
                    <span>Reported at: <strong className="text-slate-800 font-mono">{inc.reportedAt}</strong></span>
                  </div>
                </div>
              </div>

              {inc.status === 'ACTIVE' && (
                <button
                  onClick={() => resolveIncident(inc.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 transition-colors shrink-0"
                >
                  Mark Cleared
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Transparency Disclaimer */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Civic Transparency Policy:</strong> SmartFlow AI strictly segregates verified municipal notices from crowd-sourced citizen reports. Citizen submissions are highlighted as <em>USER REPORTED</em> to prevent misinformation from entering official dispatch systems.
        </p>
      </div>
    </div>
  );
};
