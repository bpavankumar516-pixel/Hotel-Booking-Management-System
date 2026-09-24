import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  ConciergeBell,
  UserCheck,
  LogOut,
  Key,
  CreditCard,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  DollarSign,
  Coffee,
} from 'lucide-react';

export const CheckInOutPage = () => {
  const [activeTab, setActiveTab] = useState('checkin'); // 'checkin' | 'checkout'
  const [guestIdInput, setGuestIdInput] = useState('');
  const [keyCardAssigned, setKeyCardAssigned] = useState(false);

  const pendingCheckIns = [
    { id: 'RES-8823', name: 'Sarah Wilson', room: '# No.401', dates: '2026-09-23 to 2026-09-28', deposit: '$250', keyCard: 'KC-401-A' },
    { id: 'RES-8827', name: 'David Beckham', room: '# No.301', dates: '2026-09-23 to 2026-09-27', deposit: '$300', keyCard: 'KC-301-B' },
  ];

  const pendingCheckOuts = [
    { id: 'RES-8822', name: 'Robert Affleck', room: '# No.102', dates: '2026-09-20 to 2026-09-23', minibar: '$45', totalPending: '$45' },
    { id: 'RES-8824', name: 'Alexander Wright', room: '# No.201', dates: '2026-09-19 to 2026-09-23', minibar: '$0', totalPending: '$0' },
  ];

  const handleProcessCheckIn = (res) => {
    toast.success(`Express Check-In completed for ${res.name}! Key Card ${res.keyCard} issued.`);
  };

  const handleProcessCheckOut = (res) => {
    toast.success(`Check-Out processed for ${res.name}. Room ${res.room} sent to Housekeeping.`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">
            Front Desk Express Ops
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Rapid guest check-in, key card allocation, minibar clearance, and express checkout processing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'checkin' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Arrival Check-In ({pendingCheckIns.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'checkout' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span>Departure Check-Out ({pendingCheckOuts.length})</span>
          </button>
        </div>
      </div>

      {/* Main Counter Card */}
      {activeTab === 'checkin' ? (
        <div className="space-y-4">
          <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">Today's Express Arrivals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCheckIns.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs text-[#C5A059] font-bold block">{item.id}</span>
                    <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{item.name}</h4>
                    <span className="text-xs text-slate-500">{item.dates}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                    {item.room}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 text-slate-600 border border-slate-100">
                  <p className="flex justify-between">
                    <span>Security Deposit Required:</span>
                    <strong className="text-slate-800 font-mono">{item.deposit}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Digital RFID Key Card:</span>
                    <strong className="text-[#2563EB] font-mono">{item.keyCard}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleProcessCheckIn(item)}
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Issue Key Card & Confirm Check-In</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">Today's Express Departures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCheckOuts.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs text-[#C5A059] font-bold block">{item.id}</span>
                    <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{item.name}</h4>
                    <span className="text-xs text-slate-500">{item.dates}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold">
                    {item.room}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 text-slate-600 border border-slate-100">
                  <p className="flex justify-between">
                    <span>Incidentals / Minibar:</span>
                    <strong className="text-slate-800 font-mono">{item.minibar}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Remaining Balance:</span>
                    <strong className="text-emerald-600 font-mono">{item.totalPending}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleProcessCheckOut(item)}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Clear Bill & Finalize Check-Out</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
