import React from 'react';
import { Layers } from 'lucide-react';

export const ModulePlaceholderPage = ({ title, moduleNumber, description }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-4">
      <div className="bg-white border border-slate-200/80 rounded-xl p-10 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 rounded-xl bg-[#F7F2E7] text-[#C5A059] border border-[#EFE6D5] mx-auto flex items-center justify-center">
          <Layers className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-mono font-extrabold text-white uppercase tracking-widest bg-[#1E2B37] px-3 py-1 rounded">
            Module {moduleNumber}
          </span>
          <h1 className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37] mt-3">{title}</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 font-medium">
            {description || `Module ${moduleNumber} layout structure is ready for full feature expansion.`}
          </p>
        </div>

        <div className="pt-4 inline-flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200/70 font-medium">
          <span>Hodelz PMS Active Dashboard & System Architecture</span>
        </div>
      </div>
    </div>
  );
};
