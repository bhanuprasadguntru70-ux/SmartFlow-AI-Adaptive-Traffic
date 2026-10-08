import React, { useState } from 'react';
import { TrafficProvider, useTraffic } from './context/TrafficContext';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';

// Pages & Views
import { DashboardView } from './pages/DashboardView';
import { LiveMapView } from './pages/LiveMapView';
import { IndiaMapOverview } from './components/IndiaMapOverview';
import { AwarenessView } from './pages/AwarenessView';
import { SignalControlView } from './pages/SignalControlView';
import { EmergencyPriorityView } from './pages/EmergencyPriorityView';
import { SmartCorridorView } from './pages/SmartCorridorView';
import { IncidentView } from './pages/IncidentView';
import { DataTransparencyPanel } from './components/DataTransparencyPanel';
import { SimulationSandboxView } from './pages/SimulationSandboxView';
import { BeforeAfterView } from './pages/BeforeAfterView';

const MainContent: React.FC = () => {
  const { notificationToast, dismissToast, setSelectedCityId } = useTraffic();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
          />
        );
      case 'map':
        return <LiveMapView />;
      case 'india-overview':
        return (
          <IndiaMapOverview
            onSelectCity={(cityId) => {
              setSelectedCityId(cityId);
              setActiveTab('map');
            }}
          />
        );
      case 'awareness':
        return <AwarenessView />;
      case 'signal-intelligence':
        return <SignalControlView />;
      case 'emergency':
        return <EmergencyPriorityView />;
      case 'smart-corridor':
        return <SmartCorridorView />;
      case 'incidents':
        return <IncidentView />;
      case 'transparency':
        return <DataTransparencyPanel />;
      case 'simulation':
        return <SimulationSandboxView />;
      case 'before-after':
        return <BeforeAfterView />;
      default:
        return (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveView()}
      </main>

      {/* Modern Light Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-8 text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">SmartFlow AI</span>
            <span>·</span>
            <span>Intelligent Traffic Management & Public Safety System for Indian Cities</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              How SmartFlow AI Works
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setActiveTab('transparency')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Data Transparency Ledger
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setActiveTab('awareness')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Civic Safety Campaigns
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setActiveTab('india-overview')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Pan-India City Grid
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast notification={notificationToast} onDismiss={dismissToast} />

      {/* System Architecture Flow Modal */}
      <SystemArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <TrafficProvider>
      <MainContent />
    </TrafficProvider>
  );
}
