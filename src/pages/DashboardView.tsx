import React from 'react';
import {
  Activity,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Shield,
  LifeBuoy,
  Clock,
  Sparkles,
  Car,
  Footprints,
  Radio,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { RealCityMap } from '../components/RealCityMap';
import { DataTransparencyPanel } from '../components/DataTransparencyPanel';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  onOpenArchitecture: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenArchitecture,
}) => {
  const {
    cities,
    selectedCity,
    setSelectedCityId,
    transparencyStatus,
    incidents,
    appMode,
  } = useTraffic();

  const activeIncidents = incidents.filter((i) => i.status === 'ACTIVE');

  return (
    <div className="space-y-8">
      {/* Hero Section (Section 20) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b192c] via-[#0f2744] to-[#1e3a5f] text-white p-8 sm:p-12 shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 font-mono text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SMART MOBILITY & TRAFFIC INTELLIGENCE PLATFORM
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            See traffic. Understand traffic. Improve traffic.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Real-time traffic intelligence for safer and more efficient Indian cities. Monitoring 22 metropolitan regions with honest data transparency and AI-guided signal recommendations.
          </p>

          {/* 4 Hero Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('map')}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>VIEW LIVE TRAFFIC</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('india-overview')}
              className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>EXPLORE CITIES</span>
            </button>

            <button
              onClick={() => onNavigate('awareness')}
              className="px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              TRAFFIC SAFETY
            </button>

            <button
              onClick={() => onNavigate('signal-intelligence')}
              className="px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-blue-300 font-semibold text-sm rounded-xl border border-blue-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>AI INTELLIGENCE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Cards (Section 21) - Only actual verifiable values */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-0.5">
            VERIFIABLE METRIC TELEMETRY
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Live Traffic Network Status
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cities Monitored */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Cities Monitored</span>
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900">
              {cities.length}
            </div>
            <span className="text-xs text-slate-500 mt-1">
              Across 11 Indian States
            </span>
          </div>

          {/* Live Data Sources */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Live Data Sources</span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-600 truncate">
              {transparencyStatus.trafficProviderName}
            </div>
            <span className="text-xs text-slate-500 mt-1">
              Vector Cartography & ITS Probes
            </span>
          </div>

          {/* Active Incidents */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Active Incidents</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-amber-600">
              {activeIncidents.length}
            </div>
            <span className="text-xs text-slate-500 mt-1">
              Municipal + Citizen Reports
            </span>
          </div>

          {/* Data Availability */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Data Availability</span>
              <Radio className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1.5 text-xl font-bold font-mono text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{transparencyStatus.trafficState}</span>
            </div>
            <span className="text-xs text-slate-500 mt-1 font-mono">
              Last sync: {transparencyStatus.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Embedded Real Map Spotlight */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Real-Time City Traffic Map ({selectedCity.name})
            </h2>
            <p className="text-xs text-slate-500">
              Real geographic coordinates, OpenStreetMap GIS vectors, and official emergency facilities
            </p>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Open Fullscreen Map View
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-[480px]">
          <RealCityMap />
        </div>
      </div>

      {/* Audience Stakeholder Value Cards */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-0.5">
            DESIGNED FOR EVERY CITIZEN & STAKEHOLDER
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            Intelligent Mobility for Modern Indian Cities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Citizens & Commuters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check road conditions before heading out, avoid peak bottle-necks, and reduce travel delays.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Traffic Police & Enforcement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time incident awareness, road closure reporting, and signal duration tuning guidance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Emergency & Ambulance 108</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hospital route visualization and green corridor priority clearance for critical trauma care.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">City Administrators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Data-backed corridor synchronization, sustainable fuel conservation, and clean air initiatives.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Students & Researchers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educational road safety campaigns, AI prediction architectures, and civic urban planning data.
            </p>
          </div>
        </div>
      </div>

      {/* Data Transparency & Source Panel (Section 16) */}
      <DataTransparencyPanel />
    </div>
  );
};
