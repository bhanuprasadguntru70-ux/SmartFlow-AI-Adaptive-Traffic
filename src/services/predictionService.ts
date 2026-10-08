export interface RealMLInputs {
  cityId: string;
  intersectionId: string;
  currentSpeedKmh?: number;
  freeFlowSpeedKmh?: number;
  timeOfDay: string;
  dayOfWeek: string;
  weatherCondition: string;
  incidentNearby: boolean;
  roadCapacityVehPerHour?: number;
}

export interface RealMLPrediction {
  status: 'CONNECTED' | 'UNAVAILABLE';
  predictedCongestion?: 'FREE_FLOW' | 'MODERATE' | 'HEAVY' | 'SEVERE';
  trafficTrend?: 'INCREASING' | 'STABLE' | 'DECREASING';
  signalRecommendation?: {
    action: 'EXTEND_GREEN' | 'REDUCE_GREEN' | 'COORDINATE_CORRIDOR' | 'PRIORITIZE_EMERGENCY';
    targetPhase: string;
    recommendedAdjustmentSeconds: number;
    reason: string;
    dataSource: string;
  };
  modelName?: string;
  message?: string;
}

export class PredictionService {
  private backendUrl: string;

  constructor() {
    this.backendUrl = (import.meta.env.VITE_ML_BACKEND_URL as string) || '';
  }

  /**
   * Checks if an external Python ML model / backend API is connected
   */
  public async isModelConnected(): Promise<boolean> {
    if (!this.backendUrl) return false;
    try {
      const res = await fetch(`${this.backendUrl}/api/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Real ML Prediction Interface.
   * If no external trained ML backend is connected, explicitly returns UNAVAILABLE
   * rather than generating fabricated fake AI results.
   */
  public async predict(inputs: RealMLInputs): Promise<RealMLPrediction> {
    if (!this.backendUrl) {
      return {
        status: 'UNAVAILABLE',
        message: 'AI prediction unavailable – ML model backend not connected (POST /api/predict endpoint awaiting Python ML service).',
      };
    }

    try {
      const response = await fetch(`${this.backendUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error(`ML server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        status: 'CONNECTED',
        ...data,
      };
    } catch (error: any) {
      return {
        status: 'UNAVAILABLE',
        message: `AI prediction unavailable – ML model not connected (${error?.message || 'Network error'}).`,
      };
    }
  }

  /**
   * Heuristic Signal Optimization Recommendation based on observed traffic flow asymmetry.
   * Clearly specifies the exact data source.
   */
  public generateSignalRecommendation(
    nsTrafficDensity: 'HEAVY' | 'MODERATE' | 'LIGHT',
    ewTrafficDensity: 'HEAVY' | 'MODERATE' | 'LIGHT',
    intersectionName: string
  ): {
    recommendation: string;
    reason: string;
    dataSource: string;
  } {
    if (nsTrafficDensity === 'HEAVY' && ewTrafficDensity !== 'HEAVY') {
      return {
        recommendation: 'Increase north-south green phase duration by 15-20 seconds.',
        reason: `Observed traffic conditions indicate heavier arterial flow on the North-South corridor at ${intersectionName}.`,
        dataSource: 'Live Road Geometry & Sensor Telemetry',
      };
    } else if (ewTrafficDensity === 'HEAVY' && nsTrafficDensity !== 'HEAVY') {
      return {
        recommendation: 'Increase east-west green phase duration by 15-20 seconds.',
        reason: `Observed cross-street congestion indicates heavier buildup on the East-West corridor at ${intersectionName}.`,
        dataSource: 'Live Road Geometry & Sensor Telemetry',
      };
    }

    return {
      recommendation: 'Maintain balanced phase cycle allocation.',
      reason: 'Directional flow patterns across approach corridors appear approximately symmetrical.',
      dataSource: 'Live Road Geometry & Sensor Telemetry',
    };
  }
}

export const predictionService = new PredictionService();
