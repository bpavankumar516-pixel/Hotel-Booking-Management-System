import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, UserPlus, BedDouble, LogIn, LogOut, CreditCard } from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'booking',
      label: 'New Reservation',
      icon: PlusCircle,
      badgeColor: 'bg-[#C5A059] text-white',
      hoverBorder: 'hover:border-[#C5A059] hover:bg-[#F7F2E7]',
      onClick: () => navigate('/reservations'),
    },
    {
      id: 'guest',
      label: 'Add Guest',
      icon: UserPlus,
      badgeColor: 'bg-[#1E2B37] text-white',
      hoverBorder: 'hover:border-[#1E2B37] hover:bg-slate-50',
      onClick: () => navigate('/guests'),
    },
    {
      id: 'room',
      label: 'Add Room',
      icon: BedDouble,
      badgeColor: 'bg-[#2563EB] text-white',
      hoverBorder: 'hover:border-[#2563EB] hover:bg-blue-50',
      onClick: () => navigate('/rooms'),
    },
    {
      id: 'checkin',
      label: 'Check-In',
      icon: LogIn,
      badgeColor: 'bg-emerald-600 text-white',
      hoverBorder: 'hover:border-emerald-600 hover:bg-emerald-50',
      onClick: () => navigate('/reservations'),
    },
    {
      id: 'checkout',
      label: 'Check-Out',
      icon: LogOut,
      badgeColor: 'bg-rose-500 text-white',
      hoverBorder: 'hover:border-rose-500 hover:bg-rose-50',
      onClick: () => navigate('/reservations'),
    },
    {
      id: 'payments',
      label: 'Guest Directory',
      icon: CreditCard,
      badgeColor: 'bg-slate-800 text-white',
      hoverBorder: 'hover:border-slate-800 hover:bg-slate-100',
      onClick: () => navigate('/guests'),
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs space-y-4 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Quick Actions</h3>
          <p className="text-[10px] text-slate-400 font-medium">Instant operational triggers</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F7F2E7] text-[#C5A059] border border-amber-200 font-mono">
          Interactive Shortcuts
        </span>
      </div>

      {/* Grid of 6 Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 my-auto">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className={`p-3 rounded-lg border border-slate-200/80 bg-slate-50/60 flex flex-col items-center justify-center text-center space-y-2 transition-all duration-200 cursor-pointer ${act.hoverBorder}`}
            >
              <div className={`p-2 rounded-lg ${act.badgeColor} shadow-2xs`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
