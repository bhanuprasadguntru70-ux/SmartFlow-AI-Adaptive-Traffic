import React, { useState } from 'react';
import {
  Activity,
  Layers,
  MapPin,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  Menu,
  X,
  Radio,
  BookOpen,
  Sliders,
  LifeBuoy,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenArchitecture,
}) => {
  const {
    appMode,
    setAppMode,
    cities,
    selectedCity,
    setSelectedCityId,
    transparencyStatus,
    incidents,
  } = useTraffic();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeIncidentsCount = incidents.filter((i) => i.status === 'ACTIVE').length;

  const navLinks = [
    { id: 'dashboard', label: 'Network' },
    { id: 'map', label: 'Live City Map' },
    { id: 'india-overview', label: 'All Cities' },
    { id: 'awareness', label: 'Traffic Safety' },
    { id: 'signal-intelligence', label: 'Signal Intel' },
    { id: 'emergency', label: 'Emergency Priority' },
    { id: 'smart-corridor', label: 'Green Corridor' },
    { id: 'incidents', label: 'Incidents', badge: activeIncidentsCount },
    { id: 'transparency', label: 'Transparency' },
    { id: 'simulation', label: 'Demo Sandbox' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b192c] text-white border-b border-slate-800 shadow-md">
      {/* Demo Warning Banner if in DEMO Mode */}
      {appMode === 'DEMO' && (
        <div className="bg-amber-500 text-slate-950 font-extrabold text-xs py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-2 shadow-inner">
          <AlertTriangle className="w-4 h-4" />
          <span>DEMO / SIMULATION MODE ACTIVE: DATA IS HEURISTICALLY SIMULATED FOR PROTOTYPE TESTING</span>
          <button
            onClick={() => setAppMode('LIVE')}
            className="ml-3 underline text-[11px] font-bold hover:text-black uppercase"
          >
            Switch to Live Mode
          </button>
        </div>
      )}

      {/* Top Telemetry Ticker Strip */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-1 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>● LIVE DATA STREAM</span>
          </div>
          <span className="text-slate-700">·</span>
          <span className="text-slate-300 text-[11px]">
            Source: <strong className="text-white">{transparencyStatus.trafficProviderName}</strong>
          </span>
          <span className="text-slate-700 hidden sm:inline">·</span>
          <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
            Updated: {transparencyStatus.lastUpdated}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenArchitecture}
            className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 flex items-center gap-1 transition-colors"
          >
            How SmartFlow AI Works
          </button>
          <span className="text-slate-700">·</span>
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-md p-0.5 text-[11px]">
            <button
              onClick={() => setAppMode('LIVE')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                appMode === 'LIVE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              LIVE MODE
            </button>
            <button
              onClick={() => setAppMode('DEMO')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                appMode === 'DEMO' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              DEMO MODE
            </button>
          </div>
        </div>
      </div>

      {/* Main One-Row Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & City Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
              <Activity className="w-5 h-5 text-white font-black" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                SmartFlow AI
              </span>
            </div>
          </button>

          {/* Quick Indian City Selector */}
          <div className="hidden lg:flex items-center gap-1.5 ml-3 pl-3 border-l border-slate-800 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedCity.id}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id} className="bg-slate-900 text-white">
                  {city.name} ({city.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto text-xs font-semibold text-slate-300">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'hover:text-white hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNavClick('map')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors hidden sm:flex items-center gap-1.5"
          >
            <span>Explore Map</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-md border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
            <span className="text-slate-400">Select City:</span>
            <select
              value={selectedCity.id}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.state})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-left text-xs rounded-md flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
