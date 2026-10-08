import { TrafficAlert } from '../models/traffic';

const STORAGE_KEY_ALERTS = 'smartflow_alerts_store';

const INITIAL_ALERTS: TrafficAlert[] = [
  {
    id: 'alt-01',
    timestamp: '12:35 PM',
    intersectionId: 'blr-silk-board',
    intersectionName: 'Silk Board Junction',
    city: 'Bengaluru',
    severity: 'CRITICAL',
    title: 'Severe Congestion Spike (96%)',
    message: 'Silk Board Junction queue exceeded 115 vehicles. Inflow from Hosur Road elevated tollway creates spillover gridlock.',
    recommendedAction: 'Extend North-South green to 80s to drain highway approach before next signal cycle.',
    isRead: false,
  },
  {
    id: 'alt-02',
    timestamp: '12:32 PM',
    intersectionId: 'vja-benz-circle',
    intersectionName: 'Benz Circle Junction',
    city: 'Vijayawada',
    severity: 'WARNING',
    title: 'Sudden Traffic Buildup (+32%)',
    message: 'Traffic volume increased 32% at Benz Circle due to commercial school & office discharge on Bandar Road.',
    recommendedAction: 'Adjust signal split: give +20s to North-South phase to prevent NH-16 flyover backlog.',
    isRead: false,
  },
  {
    id: 'alt-03',
    timestamp: '12:28 PM',
    intersectionId: 'hyd-cyber-towers',
    intersectionName: 'HITEC City Cyber Towers',
    city: 'Hyderabad',
    severity: 'INFO',
    title: 'AI Signal Timing Recommended',
    message: 'North-South traffic volume is 2.1x higher than East-West. Machine learning model suggests +25s green extension for Southbound lane.',
    recommendedAction: 'Apply recommended 75s / 35s cycle split in Signal Optimization panel.',
    isRead: false,
  },
  {
    id: 'alt-04',
    timestamp: '12:20 PM',
    intersectionId: 'vja-enikepadu',
    intersectionName: 'Enikepadu Junction',
    city: 'Vijayawada',
    severity: 'EMERGENCY',
    title: 'Emergency Ambulance Corridor Active',
    message: 'Ambulance 108-ALS-09 en route from Andhra Hospitals to GGH. Pre-emptive green wave activated across 3 intersections.',
    recommendedAction: 'Maintain North-South continuous green until GPS telemetry confirms vehicle clearance.',
    isRead: true,
  },
  {
    id: 'alt-05',
    timestamp: '12:05 PM',
    intersectionId: 'del-ito-crossing',
    intersectionName: 'ITO Crossing',
    city: 'Delhi',
    severity: 'CRITICAL',
    title: 'Trans-Yamuna Commuter Pressure',
    message: 'Vikas Marg bridge inflow cresting at 158 veh/min. Congestion reached 90% with 88 waiting vehicles.',
    recommendedAction: 'Activate peak corridor timing protocol with 72s N-S clearance.',
    isRead: true,
  },
];

export class AlertService {
  public getAlerts(): TrafficAlert[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ALERTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_ALERTS;
  }

  public saveAlerts(alerts: TrafficAlert[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(alerts));
    } catch (e) {
      console.warn('Failed to save alerts', e);
    }
  }

  public addAlert(alert: Omit<TrafficAlert, 'id' | 'timestamp' | 'isRead'>): TrafficAlert {
    const alerts = this.getAlerts();
    const newAlert: TrafficAlert = {
      ...alert,
      id: `alt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    const updated = [newAlert, ...alerts].slice(0, 100);
    this.saveAlerts(updated);
    return newAlert;
  }

  public markAsRead(id: string): TrafficAlert[] {
    const alerts = this.getAlerts().map((a) => (a.id === id ? { ...a, isRead: true } : a));
    this.saveAlerts(alerts);
    return alerts;
  }

  public markAllAsRead(): TrafficAlert[] {
    const alerts = this.getAlerts().map((a) => ({ ...a, isRead: true }));
    this.saveAlerts(alerts);
    return alerts;
  }

  public clearAll(): TrafficAlert[] {
    this.saveAlerts([]);
    return [];
  }

  public resetToDefault(): TrafficAlert[] {
    this.saveAlerts(INITIAL_ALERTS);
    return INITIAL_ALERTS;
  }
}

export const alertService = new AlertService();
