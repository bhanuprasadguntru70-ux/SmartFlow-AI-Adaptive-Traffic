import { Intersection, CongestionLevel } from '../models/traffic';

export interface TrafficDataProvider {
  getIntersections(): Promise<Intersection[]>;
  getIntersectionById(id: string): Promise<Intersection | undefined>;
  tickTrafficUpdate(currentIntersections: Intersection[]): Intersection[];
  providerName: string;
  isSimulated: boolean;
}

/**
 * DemoTrafficDataProvider simulates real-world stochastic traffic fluctuations:
 * - Poisson-like vehicle arrival shifts
 * - Countdown of signal phases
 * - Dynamic queue dissipation during green and queue accumulation during red
 * - Congestion level recalculation
 */
export class DemoTrafficDataProvider implements TrafficDataProvider {
  providerName = 'Demo Simulated ITS Engine (Pluggable to Municipal CCTV/IoT)';
  isSimulated = true;

  async getIntersections(): Promise<Intersection[]> {
    return [];
  }

  async getIntersectionById(id: string): Promise<Intersection | undefined> {
    return undefined;
  }

  tickTrafficUpdate(currentIntersections: Intersection[]): Intersection[] {
    return currentIntersections.map((intersection) => {
      // 1. Update signal timer countdown
      const signalState = { ...intersection.signalState };
      let newRemaining = signalState.phaseRemainingSeconds - 1;
      let newPhase = signalState.currentPhase;
      const currentLight = { ...signalState.currentLightColor };

      const nsTiming = signalState.northSouth;
      const ewTiming = signalState.eastWest;

      if (newRemaining <= 0) {
        if (newPhase === 'NORTH_SOUTH') {
          newPhase = 'EAST_WEST';
          newRemaining = ewTiming.greenSeconds;
          currentLight.northSouth = 'RED';
          currentLight.eastWest = 'GREEN';
        } else {
          newPhase = 'NORTH_SOUTH';
          newRemaining = nsTiming.greenSeconds;
          currentLight.northSouth = 'GREEN';
          currentLight.eastWest = 'RED';
        }
      } else if (newRemaining <= 5) {
        // Yellow warning phase
        if (newPhase === 'NORTH_SOUTH') {
          currentLight.northSouth = 'YELLOW';
        } else {
          currentLight.eastWest = 'YELLOW';
        }
      }

      signalState.currentPhase = newPhase;
      signalState.phaseRemainingSeconds = newRemaining;
      signalState.currentLightColor = currentLight;

      // 2. Realistic subtle traffic fluctuation (stochastic ±3 veh/min)
      const delta = (Math.random() - 0.48) * 4;
      const newVolume = Math.max(20, Math.min(220, Math.round(intersection.trafficVolume + delta)));

      // 3. Queue changes based on current active phase
      let currentQueue = intersection.queueLength;
      if (newPhase === 'NORTH_SOUTH' && currentLight.northSouth === 'GREEN') {
        // Discharging N-S queue faster, but E-W accumulating
        currentQueue = Math.max(4, Math.round(currentQueue - (Math.random() * 2.2) + (Math.random() * 1.5)));
      } else {
        // E-W green discharging, N-S accumulating
        currentQueue = Math.max(4, Math.round(currentQueue - (Math.random() * 2.0) + (Math.random() * 1.7)));
      }

      // 4. Congestion percentage based on volume, queue, and speed
      const baseCongestion = Math.min(99, Math.max(15, Math.round((newVolume / 180) * 60 + (currentQueue / 100) * 40)));

      let level: CongestionLevel = 'FREE_FLOW';
      if (baseCongestion >= 80) level = 'SEVERE';
      else if (baseCongestion >= 65) level = 'HEAVY';
      else if (baseCongestion >= 40) level = 'MODERATE';

      // 5. Speed inversely proportional to congestion
      const newSpeed = Number(Math.max(8, 48 - (baseCongestion * 0.38) + (Math.random() * 1.5 - 0.75)).toFixed(1));

      // 6. Waiting time calculation
      const waitingTime = Math.max(15, Math.round((currentQueue * 1.4) + (baseCongestion * 0.45)));

      // 7. Minor direction fluctuations
      const directions = { ...intersection.directions };
      const dirVolFactor = newVolume / (intersection.trafficVolume || 1);
      directions.north = {
        ...directions.north,
        vehicleCount: Math.max(5, Math.round(directions.north.vehicleCount * dirVolFactor)),
        queueLength: Math.max(2, Math.round(directions.north.queueLength + (Math.random() - 0.5) * 2)),
      };
      directions.south = {
        ...directions.south,
        vehicleCount: Math.max(5, Math.round(directions.south.vehicleCount * dirVolFactor)),
        queueLength: Math.max(2, Math.round(directions.south.queueLength + (Math.random() - 0.5) * 2)),
      };
      directions.east = {
        ...directions.east,
        vehicleCount: Math.max(4, Math.round(directions.east.vehicleCount * dirVolFactor)),
        queueLength: Math.max(1, Math.round(directions.east.queueLength + (Math.random() - 0.5) * 1.5)),
      };
      directions.west = {
        ...directions.west,
        vehicleCount: Math.max(4, Math.round(directions.west.vehicleCount * dirVolFactor)),
        queueLength: Math.max(1, Math.round(directions.west.queueLength + (Math.random() - 0.5) * 1.5)),
      };

      return {
        ...intersection,
        trafficVolume: newVolume,
        queueLength: currentQueue,
        averageSpeed: newSpeed,
        congestionPercentage: baseCongestion,
        congestionLevel: level,
        waitingTimeSeconds: waitingTime,
        signalState,
        directions,
      };
    });
  }
}
