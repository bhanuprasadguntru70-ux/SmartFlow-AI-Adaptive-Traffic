import React from 'react';
import { CheckCircle2, AlertTriangle, Info, ShieldAlert, X } from 'lucide-react';

interface ToastProps {
  notification: {
    message: string;
    type: 'success' | 'warning' | 'info' | 'emergency';
  } | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onDismiss }) => {
  if (!notification) return null;

  const { message, type } = notification;

  let borderColor = 'border-emerald-500/40';
  let bgColor = 'bg-slate-900/95';
  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;

  if (type === 'warning') {
    borderColor = 'border-amber-500/40';
    icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
  } else if (type === 'info') {
    borderColor = 'border-cyan-500/40';
    icon = <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
  } else if (type === 'emergency') {
    borderColor = 'border-rose-500/60';
    bgColor = 'bg-rose-950/90 text-white';
    icon = <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md ${bgColor} ${borderColor} text-slate-100`}
      >
        {icon}
        <div className="flex-1 text-xs leading-relaxed font-medium">
          {message}
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
