'use client';

import { Check } from 'lucide-react';

export default function StepProgress({ currentStep = 0, totalSteps = 6 }) {
  const steps = ['Triage', 'Locator', 'Booking', 'Transport', 'Navigation', 'Report'];
  return (
    <div className="flex items-center gap-2 w-full max-w-2xl mx-auto px-4 py-3">
      {steps.map((label, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        return (
          <div key={idx} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                isCompleted ? 'bg-green-500 text-white' :
                isActive ? 'bg-primary-600 text-white ring-4 ring-primary-200' :
                'bg-slate-200 text-slate-500'
              }`}>
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${idx < currentStep ? 'bg-green-500' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}