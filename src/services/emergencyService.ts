import { EmergencyVehicle, Intersection } from '../models/traffic';

export class EmergencyService {
  private audioCtx: AudioContext | null = null;

  /**
   * Generates a brief, soft warning acoustic tone using Web Audio API
   * without needing external sound MP3 assets
   */
  public playEmergencyChime(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(880.0, this.audioCtx.currentTime + 0.15); // A5
      osc.frequency.exponentialRampToValueAtTime(659.25, this.audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.45);
    } catch {
      // Audio autoplay policy or unavailable, silently handle
    }
  }

  /**
   * Applies pre-emptive emergency green override to an intersection
   */
  public activateEmergencyPriorityOnIntersection(
    intersection: Intersection,
    vehicle: EmergencyVehicle
  ): Intersection {
    return {
      ...intersection,
      signalState: {
        ...intersection.signalState,
        mode: 'EMERGENCY_PRIORITY',
        currentPhase: 'NORTH_SOUTH', // Route along arterial
        phaseRemainingSeconds: 60,
        currentLightColor: {
          northSouth: 'GREEN',
          eastWest: 'RED',
        },
      },
      waitingTimeSeconds: Math.max(12, Math.round(intersection.waitingTimeSeconds * 0.4)),
      averageSpeed: Math.min(55, intersection.averageSpeed + 15),
    };
  }

  /**
   * Reverts emergency priority to adaptive mode
   */
  public revertEmergencyPriority(intersection: Intersection): Intersection {
    return {
      ...intersection,
      signalState: {
        ...intersection.signalState,
        mode: 'AI_ADAPTIVE',
      },
    };
  }
}

export const emergencyService = new EmergencyService();
