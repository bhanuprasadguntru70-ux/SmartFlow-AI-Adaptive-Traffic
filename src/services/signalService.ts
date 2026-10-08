import { Intersection, IntersectionSignalState } from '../models/traffic';

export interface AppliedOptimizationRecord {
  id: string;
  intersectionId: string;
  intersectionName: string;
  timestamp: string;
  previousTiming: {
    northSouthGreen: number;
    eastWestGreen: number;
  };
  appliedTiming: {
    northSouthGreen: number;
    eastWestGreen: number;
  };
  previousWaitingSec: number;
  newWaitingSec: number;
  waitingReducedPercent: number;
  previousCongestionPercent: number;
  newCongestionPercent: number;
  reason: string;
}

const STORAGE_KEY_OPTIMIZATIONS = 'smartflow_optimization_history';

export class SignalService {
  /**
   * Applies the AI recommended timing to an intersection, updates the signal state,
   * calculates delay & congestion reduction, and logs to localStorage history.
   */
  public applyAITiming(intersection: Intersection): {
    updatedIntersection: Intersection;
    record: AppliedOptimizationRecord;
  } {
    const rec = intersection.aiRecommendation;
    const oldNS = intersection.signalState.northSouth.greenSeconds;
    const oldEW = intersection.signalState.eastWest.greenSeconds;

    const newNSGreen = rec.recommendedNorthSouthGreen;
    const newEWGreen = rec.recommendedEastWestGreen;
    const yellow = 5;

    // Build new signal timings
    const newSignalState: IntersectionSignalState = {
      ...intersection.signalState,
      northSouth: {
        greenSeconds: newNSGreen,
        yellowSeconds: yellow,
        redSeconds: newEWGreen + yellow,
      },
      eastWest: {
        greenSeconds: newEWGreen,
        yellowSeconds: yellow,
        redSeconds: newNSGreen + yellow,
      },
      mode: 'AI_ADAPTIVE',
    };

    // Calculate simulated improvements
    const oldWait = intersection.waitingTimeSeconds;
    const waitDropFactor = 1 - (rec.expectedDelayReductionPercent / 100);
    const newWait = Math.max(18, Math.round(oldWait * waitDropFactor));
    const waitDiffPct = Math.round(((oldWait - newWait) / oldWait) * 100);

    const oldCong = intersection.congestionPercentage;
    const newCong = Math.max(22, Math.round(oldCong * 0.68));

    // Update queue length due to better throughput
    const newQueue = Math.max(5, Math.round(intersection.queueLength * 0.62));
    const newSpeed = Number(Math.min(48, intersection.averageSpeed * 1.35).toFixed(1));

    const updatedIntersection: Intersection = {
      ...intersection,
      waitingTimeSeconds: newWait,
      congestionPercentage: newCong,
      queueLength: newQueue,
      averageSpeed: newSpeed,
      congestionLevel: newCong >= 80 ? 'SEVERE' : newCong >= 65 ? 'HEAVY' : newCong >= 40 ? 'MODERATE' : 'FREE_FLOW',
      signalState: newSignalState,
      aiRecommendation: {
        ...rec,
        isApplied: true,
        appliedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };

    const record: AppliedOptimizationRecord = {
      id: `opt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      intersectionId: intersection.id,
      intersectionName: intersection.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      previousTiming: { northSouthGreen: oldNS, eastWestGreen: oldEW },
      appliedTiming: { northSouthGreen: newNSGreen, eastWestGreen: newEWGreen },
      previousWaitingSec: oldWait,
      newWaitingSec: newWait,
      waitingReducedPercent: waitDiffPct,
      previousCongestionPercent: oldCong,
      newCongestionPercent: newCong,
      reason: rec.reason,
    };

    this.saveOptimizationHistory(record);

    return { updatedIntersection, record };
  }

  /**
   * Manual override of signal timings
   */
  public overrideSignalTiming(
    intersection: Intersection,
    nsGreen: number,
    ewGreen: number
  ): Intersection {
    const yellow = 5;
    return {
      ...intersection,
      signalState: {
        ...intersection.signalState,
        northSouth: {
          greenSeconds: nsGreen,
          yellowSeconds: yellow,
          redSeconds: ewGreen + yellow,
        },
        eastWest: {
          greenSeconds: ewGreen,
          yellowSeconds: yellow,
          redSeconds: nsGreen + yellow,
        },
        mode: 'MANUAL_OVERRIDE',
      },
      aiRecommendation: {
        ...intersection.aiRecommendation,
        isApplied: false,
      },
    };
  }

  public getOptimizationHistory(): AppliedOptimizationRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_OPTIMIZATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveOptimizationHistory(record: AppliedOptimizationRecord): void {
    try {
      const existing = this.getOptimizationHistory();
      const updated = [record, ...existing].slice(0, 50); // Keep last 50
      localStorage.setItem(STORAGE_KEY_OPTIMIZATIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save optimization history to localStorage', e);
    }
  }

  public clearOptimizationHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_OPTIMIZATIONS);
    } catch {
      // ignore
    }
  }
}

export const signalService = new SignalService();
