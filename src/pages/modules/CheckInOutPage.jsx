import React, { useState } from 'react';
import { ConciergeBell, LogIn, LogOut, CheckCircle2, History } from 'lucide-react';

export const CheckInOutPage = () => {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

  const [activeStays, setActiveStays] = useState([
    {
      id: 1,
      guest: 'Mitchel Johnson',
      room: '# No.301',
      checkIn: '2026-09-20 11:00 AM',
      expectedCheckOut: '2026-09-23 12:00 PM',
      stayDuration: '3 Days',
      status: 'Checked In',
    },
    {
      id: 2,
      guest: 'Robert Affleck',
      room: '# No.105',
      checkIn: '2026-09-21 09:00 AM',
      expectedCheckOut: '2026-09-24 11:00 AM',
      stayDuration: '3 Days',
      status: 'Checked In',
    },
  ]);

  const [historyLogs, setHistoryLogs] = useState([
    {
      id: 101,
      guest: 'Chris Hemsworth',
      room: '# No.402',
      checkIn: '2026-09-17 10:00 AM',
      checkOut: '2026-09-19 11:00 AM',
      stayDuration: '2 Days',
      type: 'Check-Out Completed',
    },
  ]);

  const handlePerformCheckOut = (stay) => {
    setActiveStays(activeStays.filter((s) => s.id !== stay.id));
    const nowStr = new Date().toLocaleString();
    setHistoryLogs([
      {
        id: Date.now(),
        guest: stay.guest,
        room: stay.room,
        checkIn: stay.checkIn,
        checkOut: nowStr,
        stayDuration: stay.stayDuration,
        type: 'Check-Out Completed',
      },
      ...historyLogs,
    ]);
  };

  const handlePerformCheckIn = () => {
    const newStay = {
      id: Date.now(),
      guest: 'Sarah Wilson',
      room: `# No.${Math.floor(200 + Math.random() * 200)}`,
      checkIn: new Date().toLocaleString(),
      expectedCheckOut: '3 Days from now',
      stayDuration: '3 Days',
      status: 'Checked In',
    };
    setActiveStays([newStay, ...activeStays]);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Module 06
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Check-In / Check-Out</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Front desk check-in, check-out processing, stay duration tracking, and activity logs.
          </p>
        </div>

        <button
          onClick={handlePerformCheckIn}
          className="py-2.5 px-4 rounded-lg bg-[#2ECC71] hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <LogIn className="w-4 h-4" />
          <span>Instant Express Check-In</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs text-xs font-bold">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'active' ? 'bg-[#1E2B37] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Active Stays ({activeStays.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'history' ? 'bg-[#1E2B37] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Check-In / Check-Out History Logs ({historyLogs.length})
        </button>
      </div>

      {activeTab === 'active' ? (
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Check-In Time</th>
                  <th className="py-3 px-4">Expected Check-Out</th>
                  <th className="py-3 px-4">Stay Duration</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {activeStays.map((stay) => (
                  <tr key={stay.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-['Poppins'] font-bold">{stay.guest}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{stay.room}</td>
                    <td className="py-3.5 px-4 text-slate-600">{stay.checkIn}</td>
                    <td className="py-3.5 px-4 text-slate-600">{stay.expectedCheckOut}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{stay.stayDuration}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handlePerformCheckOut(stay)}
                        className="py-1.5 px-3 rounded bg-rose-500 hover:bg-rose-600 text-white font-bold text-[11px] flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Process Check-Out</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Check-In</th>
                  <th className="py-3 px-4">Check-Out</th>
                  <th className="py-3 px-4">Stay Duration</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {historyLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-['Poppins'] font-bold">{log.guest}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{log.room}</td>
                    <td className="py-3.5 px-4 text-slate-600">{log.checkIn}</td>
                    <td className="py-3.5 px-4 text-slate-600">{log.checkOut}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{log.stayDuration}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {log.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
