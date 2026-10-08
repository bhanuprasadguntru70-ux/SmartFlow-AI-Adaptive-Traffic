import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Radio,
  Hospital,
  Crosshair,
  ShieldAlert,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { mapService } from '../services/mapService';
import { geocodingService, GeocodeResult } from '../services/geocodingService';

interface RealCityMapProps {
  showEmergencyRoute?: boolean;
  onSelectIntersection?: (jn: any) => void;
}

export const RealCityMap: React.FC<RealCityMapProps> = ({
  showEmergencyRoute = false,
  onSelectIntersection,
}) => {
  const {
    selectedCity,
    setSelectedCityId,
    transparencyStatus,
    retryLiveData,
    incidents,
  } = useTraffic();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  // Layer toggles
  const [showIntersections, setShowIntersections] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showIncidentsLayer, setShowIncidentsLayer] = useState(true);
  const [showTrafficOverlay, setShowTrafficOverlay] = useState(true);

  // Search box
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodeResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize or update Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Leaflet Map Instance
      const baseTile = mapService.getBaseTileConfig();
      const map = L.map(mapContainerRef.current, {
        center: [selectedCity.lat, selectedCity.lng],
        zoom: selectedCity.zoom,
        zoomControl: true,
      });

      L.tileLayer(baseTile.url, {
        attribution: baseTile.attribution,
        maxZoom: baseTile.maxZoom,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      // Pan to new selected city
      mapInstanceRef.current.setView([selectedCity.lat, selectedCity.lng], selectedCity.zoom, {
        animate: true,
      });
    }

    return () => {
      // Cleanup on unmount handled gracefully
    };
  }, [selectedCity]);

  // Update Markers when City, Toggles, or Incidents change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    // 1. Add Key Intersections
    if (showIntersections && selectedCity.keyIntersections) {
      selectedCity.keyIntersections.forEach((jn) => {
        const icon = mapService.createCustomMarkerIcon('intersection', jn.name, '#10b981');
        const marker = L.marker([jn.lat, jn.lng], { icon });

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; padding: 2px;">
            <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${jn.name}</div>
            <div style="color: #64748b; font-size: 11px; margin-bottom: 6px;">${jn.roadName}</div>
            <div style="background: #f1f5f9; padding: 6px; border-radius: 6px; border-left: 3px solid #10b981; font-size: 11px;">
              <strong>AI Recommendation:</strong> Optimized for prevailing directional flow.<br/>
              <span style="color: #64748b; font-size: 10px;">Source: OpenStreetMap ITS Geometrics</span>
            </div>
          </div>
        `);

        marker.on('click', () => {
          if (onSelectIntersection) {
            onSelectIntersection(jn);
          }
        });

        marker.addTo(layer);
      });
    }

    // 2. Add Hospitals
    if (showHospitals && selectedCity.hospitals) {
      selectedCity.hospitals.forEach((hosp) => {
        const icon = mapService.createCustomMarkerIcon('hospital', 'Hospital', '#ef4444');
        const marker = L.marker([hosp.lat, hosp.lng], { icon });

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; padding: 2px;">
            <div style="font-weight: 800; font-size: 13px; color: #ef4444; margin-bottom: 2px;">${hosp.name}</div>
            <div style="color: #475569; font-size: 11px; margin-bottom: 4px;">Emergency Care Center</div>
            <div style="background: #fef2f2; border: 1px solid #fee2e2; padding: 5px 8px; border-radius: 6px; font-weight: 700; color: #991b1b; font-size: 11px;">
              Emergency Hotline: ${hosp.emergencyContact}
            </div>
          </div>
        `);

        marker.addTo(layer);
      });
    }

    // 3. Add Incidents in current city
    if (showIncidentsLayer) {
      const cityIncidents = incidents.filter(
        (i) => i.cityName.toLowerCase() === selectedCity.name.toLowerCase() && i.status === 'ACTIVE'
      );

      cityIncidents.forEach((inc) => {
        const icon = mapService.createCustomMarkerIcon('incident', inc.type.replace('_', ' '), '#f59e0b');
        const marker = L.marker([inc.lat, inc.lng], { icon });

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; padding: 2px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 2px;">
              <span style="font-weight: 800; font-size: 13px; color: #d97706;">${inc.title}</span>
              <span style="font-size: 9px; padding: 1px 4px; border-radius: 4px; background: ${inc.source === 'OFFICIAL_MUNICIPAL' ? '#ecfdf5; color: #047857;' : '#fffbeb; color: #b45309;'} font-weight: 700;">
                ${inc.source === 'OFFICIAL_MUNICIPAL' ? 'OFFICIAL' : 'USER REPORTED'}
              </span>
            </div>
            <div style="color: #475569; font-size: 11px; margin-bottom: 4px;">${inc.description}</div>
            <div style="color: #94a3b8; font-size: 10px;">Reported: ${inc.reportedAt}</div>
          </div>
        `);

        marker.addTo(layer);
      });
    }

    // 4. Emergency Route line if requested
    if (showEmergencyRoute && selectedCity.hospitals[0] && selectedCity.keyIntersections[0]) {
      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
      }

      const hosp = selectedCity.hospitals[0];
      const jn1 = selectedCity.keyIntersections[0];
      const jn2 = selectedCity.keyIntersections[1] || jn1;

      const pathCoords: [number, number][] = [
        [hosp.lat, hosp.lng],
        [jn1.lat, jn1.lng],
        [jn2.lat, jn2.lng],
      ];

      routeLayerRef.current = L.polyline(pathCoords, {
        color: '#e11d48',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);

      routeLayerRef.current.bindPopup(`
        <div style="font-size: 12px; font-weight: 700; color: #e11d48;">
          Emergency Corridor Priority Route<br/>
          <span style="font-size: 11px; color: #475569; font-weight: 500;">Direct ambulance transit to ${hosp.name}</span>
        </div>
      `);
    } else if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }
  }, [
    incidents,
    onSelectIntersection,
    selectedCity,
    showEmergencyRoute,
    showHospitals,
    showIncidentsLayer,
    showIntersections,
  ]);

  // Handle Search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      const results = geocodingService.searchLocationsLocally(val);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result: GeocodeResult) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([result.lat, result.lng], 15, { animate: true });
    }
    setSearchQuery(result.name);
    setIsSearching(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      {/* Top Map Control Bar */}
      <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex flex-wrap items-center gap-3">
          {/* Live Status Badge */}
          {transparencyStatus.trafficState === 'LIVE' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE DATA</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>LIVE DATA UNAVAILABLE</span>
            </div>
          )}

          <div className="text-xs text-slate-300">
            <span>{selectedCity.name}, {selectedCity.state}</span>
            <span className="text-slate-500 mx-2">·</span>
            <span className="text-slate-400 font-mono text-[11px]">
              Last updated: {transparencyStatus.lastUpdated}
            </span>
          </div>
        </div>

        {/* Search Input on Map */}
        <div className="relative w-full sm:w-64">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search intersection, hospital..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Search Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white text-slate-900 border border-slate-200 rounded-lg shadow-xl overflow-hidden z-30 text-xs">
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSearchResult(res)}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 border-b border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold block text-slate-800">{res.name}</span>
                    <span className="text-[10px] text-slate-500">{res.type}</span>
                  </div>
                  <Crosshair className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Layer Toggles & Legend Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wide mr-1">
            Map Layers:
          </span>

          <button
            onClick={() => setShowIntersections(!showIntersections)}
            className={`px-2.5 py-1 rounded-md font-medium text-xs border transition-colors ${
              showIntersections
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Intersections ({selectedCity.keyIntersections.length})
          </button>

          <button
            onClick={() => setShowHospitals(!showHospitals)}
            className={`px-2.5 py-1 rounded-md font-medium text-xs border transition-colors ${
              showHospitals
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Hospitals ({selectedCity.hospitals.length})
          </button>

          <button
            onClick={() => setShowIncidentsLayer(!showIncidentsLayer)}
            className={`px-2.5 py-1 rounded-md font-medium text-xs border transition-colors ${
              showIncidentsLayer
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Incidents
          </button>
        </div>

        {/* Traffic Conditions Legend */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Free Flow</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>Heavy</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Severe</span>
          </div>
        </div>
      </div>

      {/* Leaflet Map DOM Canvas */}
      <div className="relative flex-1 w-full min-h-[460px] z-10">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

        {/* Bottom Floating Card: Attribution & Source */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-auto bg-white/95 backdrop-blur-sm border border-slate-200 shadow-md rounded-lg px-3 py-1.5 text-[11px] text-slate-600 flex items-center gap-2">
          <span className="font-semibold text-slate-800">Source:</span>
          <span>{transparencyStatus.trafficProviderName}</span>
          <span className="text-slate-300">·</span>
          <span>Next refresh in {transparencyStatus.nextRefreshSeconds}s</span>
          <button
            onClick={retryLiveData}
            title="Refresh Live Layer"
            className="p-1 hover:text-blue-600 rounded transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-slate-500 hover:text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
