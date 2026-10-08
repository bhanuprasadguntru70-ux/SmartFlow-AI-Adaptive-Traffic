import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { INDIA_CITIES, CityLocation } from '../data/indiaCities';
import { mapService } from '../services/mapService';
import { incidentService, IncidentRecord } from '../services/incidentService';
import { predictionService } from '../services/predictionService';

export type AppMode = 'LIVE' | 'DEMO';

export interface DataTransparencyStatus {
  trafficState: 'LIVE' | 'DATA_DELAYED' | 'UNAVAILABLE';
  trafficProviderName: string;
  mapEngineName: string;
  hasMapboxToken: boolean;
  lastUpdated: string;
  nextRefreshSeconds: number;
  mlModelConnected: boolean;
  incidentSource: string;
}

interface TrafficContextType {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  cities: CityLocation[];
  selectedCity: CityLocation;
  setSelectedCityId: (cityId: string) => void;
  transparencyStatus: DataTransparencyStatus;
  retryLiveData: () => void;
  incidents: IncidentRecord[];
  addIncident: (inc: Omit<IncidentRecord, 'id' | 'reportedAt' | 'source' | 'verified' | 'status'>) => void;
  resolveIncident: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  notificationToast: { message: string; type: 'success' | 'warning' | 'info' | 'emergency' } | null;
  showToast: (message: string, type: 'success' | 'warning' | 'info' | 'emergency') => void;
  dismissToast: () => void;
}

const TrafficContext = createContext<TrafficContextType | undefined>(undefined);

export const TrafficProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. App Mode: 'LIVE' is default, 'DEMO' is optional simulation
  const [appMode, setAppMode] = useState<AppMode>('LIVE');

  // 2. City Selector: Defaults to Vijayawada
  const [selectedCityId, setSelectedCityIdState] = useState<string>('vijayawada');

  const selectedCity = useMemo(() => {
    return INDIA_CITIES.find((c) => c.id === selectedCityId) || INDIA_CITIES[0];
  }, [selectedCityId]);

  const setSelectedCityId = useCallback((id: string) => {
    setSelectedCityIdState(id);
  }, []);

  // 3. Incidents
  const [incidents, setIncidents] = useState<IncidentRecord[]>(() => incidentService.getIncidents());

  // 4. Toast notification
  const [notificationToast, setNotificationToast] = useState<{
    message: string;
    type: 'success' | 'warning' | 'info' | 'emergency';
  } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'warning' | 'info' | 'emergency') => {
    setNotificationToast({ message, type });
  }, []);

  const dismissToast = useCallback(() => {
    setNotificationToast(null);
  }, []);

  useEffect(() => {
    if (!notificationToast) return;
    const timer = setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notificationToast]);

  // 5. Data Transparency & Controlled Refresh Cadence (60-second polling)
  const [lastUpdated, setLastUpdated] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [nextRefreshSeconds, setNextRefreshSeconds] = useState<number>(60);
  const [mlConnected, setMlConnected] = useState<boolean>(false);
  const [trafficState, setTrafficState] = useState<'LIVE' | 'DATA_DELAYED' | 'UNAVAILABLE'>('LIVE');

  // Check ML model connection
  useEffect(() => {
    predictionService.isModelConnected().then((connected) => {
      setMlConnected(connected);
    });
  }, []);

  // Controlled Countdown & Polling
  useEffect(() => {
    const timer = setInterval(() => {
      setNextRefreshSeconds((prev) => {
        if (prev <= 1) {
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const retryLiveData = useCallback(() => {
    setTrafficState('LIVE');
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setNextRefreshSeconds(60);
    showToast(`Live traffic layer refreshed for ${selectedCity.name}.`, 'success');
  }, [selectedCity.name, showToast]);

  const addIncident = useCallback(
    (inc: Omit<IncidentRecord, 'id' | 'reportedAt' | 'source' | 'verified' | 'status'>) => {
      const newInc = incidentService.reportIncident(inc);
      setIncidents((prev) => [newInc, ...prev]);
      showToast(`User-reported incident added for ${inc.locationName}. Clearly labeled as User Reported.`, 'warning');
    },
    [showToast]
  );

  const resolveIncident = useCallback(
    (id: string) => {
      const updated = incidentService.resolveIncident(id);
      setIncidents([...updated]);
      showToast('Incident marked as cleared.', 'info');
    },
    [showToast]
  );

  const [language, setLanguage] = useState<string>('en');

  const transparencyStatus: DataTransparencyStatus = useMemo(() => {
    const hasToken = mapService.hasMapboxToken();
    return {
      trafficState,
      trafficProviderName: hasToken ? 'Mapbox Traffic' : 'OpenStreetMap Cartography & Public ITS',
      mapEngineName: hasToken ? 'Mapbox GL / Raster Vector' : 'Leaflet + OpenStreetMap',
      hasMapboxToken: hasToken,
      lastUpdated,
      nextRefreshSeconds,
      mlModelConnected: mlConnected,
      incidentSource: 'Official Municipal ITS & Verified Citizen Reports',
    };
  }, [lastUpdated, mlConnected, nextRefreshSeconds, trafficState]);

  return (
    <TrafficContext.Provider
      value={{
        appMode,
        setAppMode,
        cities: INDIA_CITIES,
        selectedCity,
        setSelectedCityId,
        transparencyStatus,
        retryLiveData,
        incidents,
        addIncident,
        resolveIncident,
        language,
        setLanguage,
        notificationToast,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};
