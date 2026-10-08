export type CongestionLevel = 'FREE_FLOW' | 'MODERATE' | 'HEAVY' | 'SEVERE';

export type SignalPhase = 'NORTH_SOUTH' | 'EAST_WEST';
export type LightColor = 'RED' | 'YELLOW' | 'GREEN';

export interface DirectionData {
  direction: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
  vehicleCount: number; // vehicles/min
  averageSpeed: number; // km/h
  queueLength: number; // vehicles waiting
  approachingSpeed: number; // km/h
}

export interface SignalTiming {
  greenSeconds: number;
  yellowSeconds: number;
  redSeconds: number;
}

export interface IntersectionSignalState {
  northSouth: SignalTiming;
  eastWest: SignalTiming;
  currentPhase: SignalPhase;
  phaseRemainingSeconds: number;
  currentLightColor: {
    northSouth: LightColor;
    eastWest: LightColor;
  };
  mode: 'AI_ADAPTIVE' | 'FIXED' | 'MANUAL_OVERRIDE' | 'EMERGENCY_PRIORITY';
}

export interface AIRecommendation {
  recommendedNorthSouthGreen: number;
  recommendedEastWestGreen: number;
  recommendedCycleTime: number;
  expectedDelayReductionPercent: number;
  expectedFuelSavingPercent: number;
  confidenceScore: number;
  reason: string;
  appliedAt?: string;
  isApplied: boolean;
}

export interface Intersection {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  x: number; // coordinate % on map canvas
  y: number; // coordinate % on map canvas
  trafficVolume: number; // veh/min
  averageSpeed: number; // km/h
  queueLength: number; // total vehicles
  waitingTimeSeconds: number;
  congestionPercentage: number;
  congestionLevel: CongestionLevel;
  signalState: IntersectionSignalState;
  directions: {
    north: DirectionData;
    south: DirectionData;
    east: DirectionData;
    west: DirectionData;
  };
  aiRecommendation: AIRecommendation;
  connectedRoads: string[];
  historicalPeakHour: string;
  dailyVehiclesCount: number;
  cctvStatus: 'ONLINE' | 'CALIBRATING' | 'OFFLINE';
  sensorReliability: number; // 0 - 100%
}

export interface TrafficPredictionPoint {
  timeOffsetMinutes: number;
  timestamp: string;
  actualVolume?: number;
  predictedVolume: number;
  confidence: number;
  expectedCongestion: CongestionLevel;
  lowerBound: number;
  upperBound: number;
  trendFactor: string;
}

export interface TrafficAlert {
  id: string;
  timestamp: string;
  intersectionId: string;
  intersectionName: string;
  city: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'EMERGENCY';
  title: string;
  message: string;
  recommendedAction?: string;
  isRead: boolean;
}

export interface EmergencyVehicle {
  id: string;
  type: 'AMBULANCE' | 'FIRE_ENGINE' | 'POLICE';
  callSign: string;
  hospitalOrStation: string;
  destination: string;
  routeIntersections: string[]; // intersection IDs
  currentLocationIndex: number;
  etaMinutes: number;
  status: 'DISPATCHED' | 'ACTIVE_CORRIDOR' | 'ARRIVED' | 'CANCELLED';
  speedKmh: number;
}

export interface SmartCorridor {
  id: string;
  name: string;
  city: string;
  intersectionIds: string[];
  totalDistanceKm: number;
  baselineTravelMinutes: number;
  optimizedTravelMinutes: number;
  currentAverageSpeed: number;
  recommendedWaveSpeed: number;
  isActive: boolean;
  activeSince?: string;
  totalVehiclesAssisted: number;
}

export interface TrafficIncident {
  id: string;
  type: 'ACCIDENT' | 'ROAD_BLOCK' | 'VEHICLE_BREAKDOWN' | 'CONSTRUCTION' | 'FLOODING' | 'VIP_MOVEMENT' | 'FESTIVAL_RUSH';
  intersectionId: string;
  intersectionName: string;
  city: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  reportedAt: string;
  estimatedClearanceMinutes: number;
  trafficSpilloverPercent: number;
  recommendedSignalAdjustment: string;
  status: 'ACTIVE' | 'RESOLVING' | 'CLEARED';
}

export interface SimulationConfig {
  city: string;
  intersectionCount: number;
  trafficIntensity: 'LOW' | 'NORMAL' | 'PEAK_EVENING' | 'MONSOON_CRISIS' | 'FESTIVAL_RUSH';
  weather: 'CLEAR' | 'RAIN' | 'FOG' | 'HEATWAVE';
  specialEvent: 'NONE' | 'IPL_CRICKET_MATCH' | 'RELIGIOUS_PROCESSION' | 'VIP_CONVOY';
  durationMinutes: number;
}

export interface SimulationResult {
  config: SimulationConfig;
  timestamp: string;
  before: {
    avgWaitingTimeSec: number;
    avgCongestionPercent: number;
    avgSpeedKmh: number;
    fuelWasteLitersPerHour: number;
    co2EmissionsKgPerHour: number;
  };
  after: {
    avgWaitingTimeSec: number;
    avgCongestionPercent: number;
    avgSpeedKmh: number;
    fuelWasteLitersPerHour: number;
    co2EmissionsKgPerHour: number;
  };
  improvement: {
    waitingTimeReductionPercent: number;
    congestionReductionPercent: number;
    speedIncreasePercent: number;
    fuelSavedLiters: number;
    co2MitigatedKg: number;
  };
}

export interface CitySummary {
  city: string;
  state: string;
  activeIntersections: number;
  avgCongestionPercent: number;
  avgSpeedKmh: number;
  avgWaitingTimeSec: number;
  aiOptimizationRate: number;
  status: 'OPTIMAL' | 'MODERATE' | 'CONGESTED';
}
