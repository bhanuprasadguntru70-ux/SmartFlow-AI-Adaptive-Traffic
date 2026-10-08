import React from 'react';
import { LightColor, SignalPhase } from '../models/traffic';

interface TrafficLightProps {
  phase: SignalPhase;
  currentColor: LightColor;
  secondsRemaining: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TrafficLightVisualizer: React.FC<TrafficLightProps> = ({
  currentColor,
  secondsRemaining,
  label,
  size = 'md',
}) => {
  const isRed = currentColor === 'RED';
  const isYellow = currentColor === 'YELLOW';
  const isGreen = currentColor === 'GREEN';

  const lensSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';
  const containerWidth = size === 'sm' ? 'w-8 py-1.5' : size === 'lg' ? 'w-14 py-3' : 'w-11 py-2';

  return (
    <div className="flex flex-col items-center gap-1.5">
      {label && <span className="text-[11px] font-medium text-slate-400 tracking-wide">{label}</span>}
      <div
        className={`relative ${containerWidth} bg-slate-900 border border-slate-700/80 rounded-xl flex flex-col items-center gap-1.5 shadow-inner`}
      >
        {/* Red light */}
        <div
          className={`${lensSize} rounded-full transition-all duration-300 ${
            isRed
              ? 'bg-rose-500 shadow-[0_0_14px_rgba(244,63,94,0.9)] ring-2 ring-rose-400/40'
              : 'bg-rose-950/40 border border-rose-900/30'
          }`}
        />

        {/* Yellow light */}
        <div
          className={`${lensSize} rounded-full transition-all duration-300 ${
            isYellow
              ? 'bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.9)] ring-2 ring-amber-300/40 animate-pulse'
              : 'bg-amber-950/40 border border-amber-900/30'
          }`}
        />

        {/* Green light */}
        <div
          className={`${lensSize} rounded-full transition-all duration-300 ${
            isGreen
              ? 'bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)] ring-2 ring-emerald-300/40'
              : 'bg-emerald-950/40 border border-emerald-900/30'
          }`}
        />
      </div>

      {/* Countdown timer badge */}
      <div
        className={`font-mono text-center font-bold tabular-nums rounded px-1.5 py-0.5 text-xs ${
          isRed
            ? 'text-rose-400 bg-rose-950/50 border border-rose-800/40'
            : isYellow
            ? 'text-amber-400 bg-amber-950/50 border border-amber-800/40'
            : 'text-emerald-400 bg-emerald-950/50 border border-emerald-800/40'
        }`}
      >
        {secondsRemaining}s
      </div>
    </div>
  );
};
