import React from 'react';
import {
  Clock,
  Fuel,
  Wind,
  HeartPulse,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Car,
  Footprints,
  PhoneOff,
  Siren,
  Sparkles,
  ArrowRight,
  Shield,
  LifeBuoy,
} from 'lucide-react';

export const AwarenessView: React.FC = () => {
  const whyItMatters = [
    {
      title: 'Time Lost',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      desc: 'Indian commuters in major metropolitan regions spend an average of 1.5 to 2 hours daily stuck in avoidable intersection queues, draining productive economic hours.',
    },
    {
      title: 'Fuel Wasted',
      icon: <Fuel className="w-5 h-5 text-amber-600" />,
      desc: 'Stationary stop-and-go engine idling consumes up to 0.8 liters of fuel per hour without moving an inch, directly increasing personal transportation costs.',
    },
    {
      title: 'Air Pollution & Smog',
      icon: <Wind className="w-5 h-5 text-emerald-600" />,
      desc: 'Vehicle deceleration and idling emit high concentrations of PM2.5, Nitrogen Dioxide (NO₂), and Carbon Monoxide directly into urban breathing zones.',
    },
    {
      title: 'Emergency Response Delays',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      desc: 'Blocked traffic junctions delay ambulances during the critical "Golden Hour", where every minute saved increases trauma survival probability by up to 10%.',
    },
    {
      title: 'Driver Stress & Fatigue',
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      desc: 'Prolonged gridlock elevates blood pressure and cognitive stress, contributing directly to aggressive driving behaviors and road incidents.',
    },
  ];

  const civicActions = [
    {
      icon: <Car className="w-5 h-5 text-emerald-600" />,
      title: 'Avoid Unnecessary Idling',
      desc: 'Turn off your vehicle engine at long traffic stops exceeding 30 seconds. Modern engines restart with negligible fuel penalty.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'Follow Traffic Signals',
      desc: 'Never jump amber or red lights. Stop behind the marked pedestrian stop line to prevent pedestrian conflicts and gridlock.',
    },
    {
      icon: <Siren className="w-5 h-5 text-rose-600" />,
      title: 'Give Emergency Vehicles Priority',
      desc: 'Move safely to the left edge of your lane immediately upon hearing emergency sirens. Never follow ambulances in their wake.',
    },
    {
      icon: <ArrowRight className="w-5 h-5 text-amber-600" />,
      title: 'Use Alternate Routes When Advised',
      desc: 'Consult real-time congestion heatmaps before commencing peak-hour journeys to distribute vehicular loads across ring roads.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      title: 'Check Live Traffic Before Travelling',
      desc: 'Planning departures 15 minutes earlier or later frequently cuts commute durations by 30% by bypassing peak rush crests.',
    },
    {
      icon: <Footprints className="w-5 h-5 text-teal-600" />,
      title: 'Follow Pedestrian Signals',
      desc: 'Always cross at zebra markings when the pedestrian signal illuminates green. Pedestrian priority maintains safe urban speeds.',
    },
  ];

  const safetyCampaigns = [
    {
      title: "Don't Block the Junction",
      tagline: 'Keep the intersection yellow box clear',
      explanation:
        'Entering an intersection when your exit lane is blocked traps vehicles when the cross-traffic light turns green, triggering multi-arterial gridlock.',
      safetyTip: 'Rule: If your exit is not clear, stay behind the stop line even if your light is green.',
      themeBg: 'bg-amber-50 border-amber-200 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'Give Way to Ambulances',
      tagline: 'Every second counts in the Golden Hour',
      explanation:
        'Emergency response vehicles carry patients fighting critical trauma or cardiac emergencies. Creating an emergency path is both a civic duty and legal requirement.',
      safetyTip: 'Rule: Signal and move your vehicle to the left edge to form a center emergency corridor.',
      themeBg: 'bg-rose-50 border-rose-200 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
    {
      title: "Don't Use Your Phone While Driving",
      tagline: 'A 2-second glance causes a 50-meter blind drive',
      explanation:
        'Texting or checking notifications multiplies accident probability by 4x. Distracted drivers cause delayed signal reactions that stall entire lanes.',
      safetyTip: 'Rule: Keep mobile phones on silent or in dashboard docks for GPS navigation only.',
      themeBg: 'bg-blue-50 border-blue-200 text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Wear Your Helmet',
      tagline: 'Two-wheeler protection saves lives',
      explanation:
        'Standard ISI-certified helmets reduce the risk of fatal head injuries by over 70% in two-wheeler incidents. Both rider and pillion must be secured.',
      safetyTip: 'Rule: Secure the chin strap firmly every single time, even on short local neighborhood trips.',
      themeBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Wear Your Seatbelt',
      tagline: 'Primary restraint system for all vehicle occupants',
      explanation:
        'Seatbelts keep passengers securely positioned inside the cabin and prevent severe impact with steering wheels and windscreens during sudden braking.',
      safetyTip: 'Rule: Fasten seatbelts immediately upon entering the vehicle, including rear-seat passengers.',
      themeBg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      title: 'Keep Emergency Lanes Clear',
      tagline: 'Shoulders are reserved for rescue responders',
      explanation:
        'Driving or parking on highway shoulders delays tow trucks, police interceptors, and ambulances from reaching accident scenes quickly.',
      safetyTip: 'Rule: Never use highway shoulder lanes for overtaking or routine transit queues.',
      themeBg: 'bg-purple-50 border-purple-200 text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase block mb-1">
            CIVIC RESPONSIBILITY & PUBLIC EDUCATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Traffic Awareness & Road Safety Campaigns
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            "Small actions can save thousands of hours." Technology and smart signal algorithms can optimize road networks, but true congestion relief starts with citizen awareness.
          </p>
        </div>
      </div>

      {/* Section 1: Why Traffic Congestion Matters */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Why Traffic Congestion Matters
          </h2>
          <p className="text-xs text-slate-500">
            Understanding the real-world economic, health, and environmental tolls of metropolitan gridlock
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyItMatters.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 w-fit mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Everyday Citizen Actions */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            6 High-Impact Driver & Pedestrian Habits
          </h2>
          <p className="text-xs text-slate-500">
            Individual decisions that cumulatively prevent city-wide traffic deadlocks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {civicActions.map((action, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{action.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{action.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Smart City Public Safety Campaigns */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Smart City Public Traffic Safety Campaigns
          </h2>
          <p className="text-xs text-slate-500">
            Official guidelines supported by Indian Municipal Traffic Police & Transport Authorities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {safetyCampaigns.map((camp, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border flex flex-col justify-between ${camp.themeBg} transition-transform hover:-translate-y-0.5 shadow-xs`}
            >
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${camp.badgeColor}`}>
                  Campaign #{idx + 1}
                </span>
                <h3 className="text-base font-bold mt-2 mb-0.5">{camp.title}</h3>
                <span className="text-xs font-medium opacity-80 block mb-2">{camp.tagline}</span>
                <p className="text-xs leading-relaxed opacity-90 mb-3">{camp.explanation}</p>
              </div>

              <div className="pt-3 border-t border-current/15 text-[11px] font-semibold">
                {camp.safetyTip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
