export type IncidentType =
  | 'ACCIDENT'
  | 'ROAD_CLOSURE'
  | 'CONSTRUCTION'
  | 'FLOODING'
  | 'VEHICLE_BREAKDOWN'
  | 'PUBLIC_EVENT';

export interface IncidentRecord {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  cityName: string;
  locationName: string;
  lat: number;
  lng: number;
  reportedAt: string;
  source: 'OFFICIAL_MUNICIPAL' | 'USER_REPORTED';
  verified: boolean;
  status: 'ACTIVE' | 'RESOLVING' | 'CLEARED';
}

const STORAGE_KEY_INCIDENTS = 'smartflow_incident_records';

const DEFAULT_INCIDENTS: IncidentRecord[] = [
  {
    id: 'inc-vja-01',
    type: 'CONSTRUCTION',
    title: 'Flyover Expansion Work',
    description: 'Ramp expansion work on NH-16 near Ramavarappadu. Right lane restricted.',
    cityName: 'Vijayawada',
    locationName: 'Ramavarappadu Ring Road',
    lat: 16.5218,
    lng: 80.6729,
    reportedAt: '10:30 AM',
    source: 'OFFICIAL_MUNICIPAL',
    verified: true,
    status: 'ACTIVE',
  },
  {
    id: 'inc-hyd-01',
    type: 'ROAD_CLOSURE',
    title: 'Metro Underpass Maintenance',
    description: 'Service road closed for drainage maintenance near Cyber Towers approach.',
    cityName: 'Hyderabad',
    locationName: 'HITEC City Cyber Towers',
    lat: 17.4504,
    lng: 78.3808,
    reportedAt: '11:15 AM',
    source: 'OFFICIAL_MUNICIPAL',
    verified: true,
    status: 'ACTIVE',
  },
  {
    id: 'inc-blr-01',
    type: 'VEHICLE_BREAKDOWN',
    title: 'Bus Breakdown on Central Lane',
    description: 'Commercial carrier stalled near Silk Board towards BTM layout.',
    cityName: 'Bengaluru',
    locationName: 'Silk Board Junction',
    lat: 12.9172,
    lng: 77.6229,
    reportedAt: '12:05 PM',
    source: 'USER_REPORTED',
    verified: false,
    status: 'ACTIVE',
  },
];

export class IncidentService {
  public getIncidents(): IncidentRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INCIDENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return DEFAULT_INCIDENTS;
  }

  public reportIncident(incident: Omit<IncidentRecord, 'id' | 'reportedAt' | 'source' | 'verified' | 'status'>): IncidentRecord {
    const incidents = this.getIncidents();
    const newIncident: IncidentRecord = {
      ...incident,
      id: `inc-user-${Date.now()}`,
      reportedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'USER_REPORTED',
      verified: false,
      status: 'ACTIVE',
    };

    const updated = [newIncident, ...incidents];
    try {
      localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return newIncident;
  }

  public resolveIncident(id: string): IncidentRecord[] {
    const incidents = this.getIncidents().map((inc) =>
      inc.id === id ? { ...inc, status: 'CLEARED' as const } : inc
    );
    try {
      localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(incidents));
    } catch {
      // ignore
    }
    return incidents;
  }
}

export const incidentService = new IncidentService();
