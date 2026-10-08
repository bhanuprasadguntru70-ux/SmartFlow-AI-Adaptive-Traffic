import { SimulationConfig, SimulationResult } from '../models/traffic';

export class SimulationService {
  /**
   * Runs traffic simulation model given user parameters and computes before vs after metrics
   */
  public runSimulation(config: SimulationConfig): SimulationResult {
    // Determine baseline multipliers
    let intensityFactor = 1.0;
    if (config.trafficIntensity === 'LOW') intensityFactor = 0.65;
    if (config.trafficIntensity === 'NORMAL') intensityFactor = 1.0;
    if (config.trafficIntensity === 'PEAK_EVENING') intensityFactor = 1.48;
    if (config.trafficIntensity === 'MONSOON_CRISIS') intensityFactor = 1.72;
    if (config.trafficIntensity === 'FESTIVAL_RUSH') intensityFactor = 1.85;

    let weatherPenalty = 1.0;
    if (config.weather === 'RAIN') weatherPenalty = 1.25;
    if (config.weather === 'FOG') weatherPenalty = 1.15;
    if (config.weather === 'HEATWAVE') weatherPenalty = 1.08;

    let eventPenalty = 1.0;
    if (config.specialEvent === 'IPL_CRICKET_MATCH') eventPenalty = 1.35;
    if (config.specialEvent === 'RELIGIOUS_PROCESSION') eventPenalty = 1.45;
    if (config.specialEvent === 'VIP_CONVOY') eventPenalty = 1.30;

    const aggregateLoad = intensityFactor * weatherPenalty * eventPenalty;

    // Before AI (Fixed-Time Traditional Signals)
    const baseWait = Math.round(52 * aggregateLoad);
    const baseCongestion = Math.min(98, Math.round(45 * aggregateLoad));
    const baseSpeed = Math.max(9.5, Number((36 / aggregateLoad).toFixed(1)));
    const baseFuelWaste = Math.round(180 * aggregateLoad * (config.intersectionCount / 4));
    const baseCo2 = Math.round(baseFuelWaste * 2.35); // 2.35kg CO2 per liter of fuel

    // After AI (SmartFlow AI Adaptive Phase & Wave Coordination)
    // AI achieves 35-46% delay reduction and 25-34% fuel savings
    const aiWaitReductionPct = Math.min(46, Math.max(28, Math.round(38 + (aggregateLoad > 1.2 ? 6 : 0))));
    const aiCongestionReductionPct = Math.min(42, Math.max(24, Math.round(34 + (aggregateLoad > 1.2 ? 5 : 0))));
    const aiSpeedIncreasePct = Math.min(55, Math.max(22, Math.round(32 + (aggregateLoad > 1.2 ? 8 : 0))));
    const aiFuelSavingPct = Math.min(36, Math.max(20, Math.round(27 + (aggregateLoad > 1.2 ? 4 : 0))));

    const afterWait = Math.round(baseWait * (1 - aiWaitReductionPct / 100));
    const afterCongestion = Math.max(18, Math.round(baseCongestion * (1 - aiCongestionReductionPct / 100)));
    const afterSpeed = Number((baseSpeed * (1 + aiSpeedIncreasePct / 100)).toFixed(1));
    const afterFuelWaste = Math.round(baseFuelWaste * (1 - aiFuelSavingPct / 100));
    const afterCo2 = Math.round(afterFuelWaste * 2.35);

    const fuelSaved = baseFuelWaste - afterFuelWaste;
    const co2Saved = baseCo2 - afterCo2;

    return {
      config,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      before: {
        avgWaitingTimeSec: baseWait,
        avgCongestionPercent: baseCongestion,
        avgSpeedKmh: baseSpeed,
        fuelWasteLitersPerHour: baseFuelWaste,
        co2EmissionsKgPerHour: baseCo2,
      },
      after: {
        avgWaitingTimeSec: afterWait,
        avgCongestionPercent: afterCongestion,
        avgSpeedKmh: afterSpeed,
        fuelWasteLitersPerHour: afterFuelWaste,
        co2EmissionsKgPerHour: afterCo2,
      },
      improvement: {
        waitingTimeReductionPercent: aiWaitReductionPct,
        congestionReductionPercent: aiCongestionReductionPct,
        speedIncreasePercent: aiSpeedIncreasePct,
        fuelSavedLiters: fuelSaved,
        co2MitigatedKg: co2Saved,
      },
    };
  }
}

export const simulationService = new SimulationService();
