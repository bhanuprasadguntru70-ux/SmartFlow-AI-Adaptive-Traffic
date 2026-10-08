import React, { useState } from 'react';
import {
  Cpu,
  Brain,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Code2,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useTraffic } from '../context/TrafficContext';
import { predictionService, RealMLInputs } from '../services/predictionService';

export const AiPredictionView: React.FC = () => {
  const { selectedCity, transparencyStatus } = useTraffic();

  const [weatherCondition, setWeatherCondition] = useState('CLEAR');
  const [hasIncident, setHasIncident] = useState(false);
  const [roadCapacity, setRoadCapacity] = useState(6500);

  const [predictionResponse, setPredictionResponse] = useState<any>(null);
  const [isCallingApi, setIsCallingApi] = useState(false);

  const handleTestPredictionApi = async () => {
    setIsCallingApi(true);
    const inputs: RealMLInputs = {
      cityId: selectedCity.id,
      intersectionId: selectedCity.keyIntersections[0]?.id || 'default-jn',
      timeOfDay: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      weatherCondition,
      incidentNearby: hasIncident,
      roadCapacityVehPerHour: roadCapacity,
    };

    const res = await predictionService.predict(inputs);
    setPredictionResponse(res);
    setIsCallingApi(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[#0b192c] text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>MACHINE LEARNING PREDICTION ARCHITECTURE</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          AI & ML Traffic Prediction Interface
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Standardized input tensor schema and REST API contract designed for Python ML models (LSTM, XGBoost, Temporal Graph Convolutional Networks).
        </p>
      </div>

      {/* Model Connection Status Banner */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
            MODEL CONNECTION STATUS
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                transparencyStatus.mlModelConnected ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <h2 className="text-base font-bold text-slate-900">
              {transparencyStatus.mlModelConnected
                ? 'Python ML Inference Microservice Online'
                : 'ML Model Not Connected (Endpoint Standby)'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 mt-0.5 block">
            Target Endpoints: <code className="text-blue-600 font-mono text-[11px]">POST /api/predict</code> & <code className="text-blue-600 font-mono text-[11px]">POST /api/optimize-signal</code>
          </span>
        </div>

        <button
          onClick={handleTestPredictionApi}
          disabled={isCallingApi}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          {isCallingApi ? 'Querying API...' : 'Test POST /api/predict'}
        </button>
      </div>

      {/* Inputs Specification & API Contract */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ML Feature Inputs Card */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-600" />
            Standard Feature Inputs (Input Vector)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center">
              <span className="text-slate-600">Selected Metro Corridor:</span>
              <span className="font-bold text-slate-900">{selectedCity.name}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center">
              <span className="text-slate-600">Time & Diurnal Profile:</span>
              <span className="font-mono font-bold text-slate-900">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center">
              <span className="text-slate-600">Weather Condition:</span>
              <select
                value={weatherCondition}
                onChange={(e) => setWeatherCondition(e.target.value)}
                className="bg-white border border-slate-200 rounded px-2 py-1 font-bold text-slate-800"
              >
                <option value="CLEAR">Clear Skies</option>
                <option value="RAIN">Monsoon Rain</option>
                <option value="FOG">Dense Winter Fog</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center">
              <span className="text-slate-600">Active Incident Proximity:</span>
              <button
                onClick={() => setHasIncident(!hasIncident)}
                className={`px-3 py-1 rounded font-bold transition-colors ${
                  hasIncident ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {hasIncident ? 'YES (Incident Active)' : 'NO (Clear Corridor)'}
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Road Capacity (Vehicles / Hour):</span>
                <span className="font-mono font-bold text-slate-900">{roadCapacity}</span>
              </div>
              <input
                type="range"
                min={3000}
                max={12000}
                step={500}
                value={roadCapacity}
                onChange={(e) => setRoadCapacity(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* API Response Output & Transparent Status */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600" />
            Prediction Response Payload
          </h3>

          {predictionResponse ? (
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto space-y-2">
              <div className="text-emerald-400 font-bold">// Response from PredictionService:</div>
              <pre className="text-[11px] leading-relaxed text-slate-300">
                {JSON.stringify(predictionResponse, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 space-y-2">
              <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
              <div className="font-bold text-slate-800">
                AI prediction unavailable – ML model not connected.
              </div>
              <p className="max-w-md mx-auto text-slate-500 leading-relaxed">
                Click "Test POST /api/predict" to verify the client-side API contract. The frontend will seamlessly render predictions and confidence intervals as soon as your Python backend microservice is hosted.
              </p>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Zero-Fabrication Guarantee:</strong> SmartFlow AI deliberately refuses to hallucinate fake confidence percentages like "94.2% AI Confidence" when no actual model is executing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
