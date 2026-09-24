import React, { useState } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  LogOut,
  Key,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  History,
  Eye,
  CalendarCheck,
} from 'lucide-react';

export const CheckInOutPage = () => {
  const navigate = useNavigate();
  const {
    reservations,
    checkInReservation,
    checkOutReservation,
    checkInLogs,
    checkOutLogs,
    calculateStayProgress,
  } = useHotel();

  const [activeTab, setActiveTab] = useState('checkin'); // 'checkin' | 'checkout' | 'in_history' | 'out_history'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyCard, setSelectedKeyCard] = useState('');
  const [processingResId, setProcessingResId] = useState(null);

  // Real-Time Queue Filters from Context State
  const arrivalQueue = reservations.filter((r) => r.status === 'Confirmed');
  const departureQueue = reservations.filter((r) => r.status === 'Checked-In');

  // Filtered History Logs
  const filteredCheckInLogs = checkInLogs.filter((log) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      log.guestName.toLowerCase().includes(q) ||
      log.resId.toLowerCase().includes(q) ||
      log.roomNumber.toLowerCase().includes(q) ||
      log.keyCard.toLowerCase().includes(q)
    );
  });

  const filteredCheckOutLogs = checkOutLogs.filter((log) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      log.guestName.toLowerCase().includes(q) ||
      log.resId.toLowerCase().includes(q) ||
      log.roomNumber.toLowerCase().includes(q)
    );
  });

  const handlePerformCheckIn = (res) => {
    const defaultKeyCard = `KC-${res.roomNumber.replace(/[^0-9]/g, '') || '101'}-A`;
    const keyToAssign = selectedKeyCard && processingResId === res.id ? selectedKeyCard : defaultKeyCard;
    checkInReservation(res.id, keyToAssign);
    setProcessingResId(null);
    setSelectedKeyCard('');
  };

  const handlePerformCheckOut = (res) => {
    checkOutReservation(res.id);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Module Title & Navigation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
              Module 06 Ops
            </span>
            <span className="text-xs text-[#C5A059] font-bold font-mono">Front Desk Check-In / Check-Out Engine</span>
          </div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37] mt-1">
            Express Guest Arrivals, Departures & Stay Logs
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Process RFID key card issuance, dynamic room availability sync, stay duration tracking, and immutable history logs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'checkin' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Arrival Check-In ({arrivalQueue.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'checkout' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span>Departure Check-Out ({departureQueue.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('in_history')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'in_history' ? 'bg-[#1E2B37] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Check-In History ({checkInLogs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('out_history')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'out_history' ? 'bg-[#1E2B37] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Check-Out History ({checkOutLogs.length})</span>
          </button>
        </div>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Arrivals Ready</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-emerald-600">{arrivalQueue.length}</span>
          </div>
          <UserCheck className="w-8 h-8 text-emerald-500/30" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">In-House Departures</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-blue-600">{departureQueue.length}</span>
          </div>
          <LogOut className="w-8 h-8 text-blue-500/30" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Total Check-In Logs</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{checkInLogs.length}</span>
          </div>
          <History className="w-8 h-8 text-[#C5A059]/30" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Total Check-Out Logs</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{checkOutLogs.length}</span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500/30" />
        </div>
      </div>

      {/* TAB 1: ARRIVAL CHECK-IN QUEUE */}
      {activeTab === 'checkin' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
              Pending Arrival Express Check-In Queue
            </h3>
            <span className="text-xs text-slate-400 font-medium">Auto-synced with Live Inventory</span>
          </div>

          {arrivalQueue.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3 shadow-xs">
              <UserCheck className="w-12 h-12 text-emerald-300 mx-auto" />
              <h4 className="font-['Poppins'] text-base font-bold text-[#1E2B37]">All Scheduled Arrivals Checked-In</h4>
              <p className="text-xs text-slate-500">There are no pending confirmed reservations awaiting arrival check-in right now.</p>
              <button
                onClick={() => navigate('/reservations')}
                className="px-4 py-2 bg-[#C5A059] text-white font-bold rounded-xl text-xs hover:bg-[#b08d48] cursor-pointer"
              >
                Go to Reservations Engine
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {arrivalQueue.map((res) => {
                const stayMeta = calculateStayProgress(res.checkIn, res.checkOut, res.status);
                const defaultKey = `KC-${res.roomNumber.replace(/[^0-9]/g, '') || '101'}-A`;

                return (
                  <div key={res.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#C5A059] block">{res.id}</span>
                        <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{res.guestName}</h4>
                        <span className="text-xs text-slate-400 font-mono">{res.guestEmail || res.guestPhone}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                        {res.roomNumber} ({res.roomType})
                      </span>
                    </div>

                    {/* Stay Duration Meta */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                      <div className="flex justify-between text-slate-600">
                        <span>Check-In / Out Dates:</span>
                        <strong className="font-mono text-[#1E2B37]">{res.checkIn} → {res.checkOut}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Calculated Stay Duration:</span>
                        <strong className="font-mono text-emerald-600">{stayMeta.statusLabel}</strong>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-600">
                        <span>Total Folio Amount:</span>
                        <strong className="font-mono text-emerald-600 text-sm">${res.totalAmount} ({res.paymentStatus})</strong>
                      </div>
                    </div>

                    {/* Key Card Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Assign RFID Digital Key Card Code</label>
                      <input
                        type="text"
                        placeholder={`Default: ${defaultKey}`}
                        value={processingResId === res.id ? selectedKeyCard : ''}
                        onChange={(e) => {
                          setProcessingResId(res.id);
                          setSelectedKeyCard(e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    {/* Confirm Action Button */}
                    <button
                      onClick={() => handlePerformCheckIn(res)}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Key className="w-4 h-4" />
                      <span>Execute Express Check-In & Mark Room Occupied</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DEPARTURE CHECK-OUT QUEUE */}
      {activeTab === 'checkout' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
              In-House Guest Express Check-Out Queue
            </h3>
            <span className="text-xs text-slate-400 font-medium">Auto-synced with Live Folios</span>
          </div>

          {departureQueue.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3 shadow-xs">
              <LogOut className="w-12 h-12 text-blue-300 mx-auto" />
              <h4 className="font-['Poppins'] text-base font-bold text-[#1E2B37]">No In-House Guests Pending Departure</h4>
              <p className="text-xs text-slate-500">There are no currently checked-in guests queued for departure check-out right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departureQueue.map((res) => {
                const stayMeta = calculateStayProgress(res.checkIn, res.checkOut, res.status);

                return (
                  <div key={res.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#C5A059] block">{res.id}</span>
                        <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{res.guestName}</h4>
                        <span className="text-xs text-slate-400 font-mono">{res.guestEmail || res.guestPhone}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold border border-blue-300">
                        {res.roomNumber} ({res.roomType})
                      </span>
                    </div>

                    {/* Stay Duration Meta */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                      <div className="flex justify-between text-slate-600">
                        <span>Stay Period:</span>
                        <strong className="font-mono text-[#1E2B37]">{res.checkIn} → {res.checkOut}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Stay Progress:</span>
                        <strong className="font-mono text-blue-600">{stayMeta.statusLabel}</strong>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-600">
                        <span>Settled Folio Bill:</span>
                        <strong className="font-mono text-emerald-600 text-sm">${res.totalAmount} USD</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePerformCheckOut(res)}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Finalize Check-Out & Mark Room Available</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CHECK-IN HISTORY LOGS */}
      {activeTab === 'in_history' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Check-In History Audit Trail
              </h3>
              <p className="text-xs text-slate-400">Timestamped logs of guest check-ins and RFID key card allocations</p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter logs by guest, room, ID..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-3">Log Ref</th>
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest Name</th>
                  <th className="py-3 px-3">Room</th>
                  <th className="py-3 px-3">Check-In Timestamp</th>
                  <th className="py-3 px-3">RFID Key Card</th>
                  <th className="py-3 px-3">Operator Officer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {filteredCheckInLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-400">{log.id}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#C5A059]">{log.resId}</td>
                    <td className="py-3 px-3 font-bold text-[#1E2B37]">{log.guestName}</td>
                    <td className="py-3 px-3 font-semibold text-slate-700">{log.roomNumber} ({log.roomType})</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{log.checkInTime}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block my-2">
                      {log.keyCard}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-500">{log.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CHECK-OUT HISTORY LOGS */}
      {activeTab === 'out_history' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Check-Out History Audit Trail
              </h3>
              <p className="text-xs text-slate-400">Timestamped logs of guest check-outs and folio settlements</p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter logs by guest, room, ID..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-3">Log Ref</th>
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest Name</th>
                  <th className="py-3 px-3">Room</th>
                  <th className="py-3 px-3">Check-Out Timestamp</th>
                  <th className="py-3 px-3">Total Folio</th>
                  <th className="py-3 px-3">Operator Officer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {filteredCheckOutLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-400">{log.id}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#C5A059]">{log.resId}</td>
                    <td className="py-3 px-3 font-bold text-[#1E2B37]">{log.guestName}</td>
                    <td className="py-3 px-3 font-semibold text-slate-700">{log.roomNumber} ({log.roomType})</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{log.checkOutTime}</td>
                    <td className="py-3 px-3 font-mono font-extrabold text-emerald-600">{log.totalFolio}</td>
                    <td className="py-3 px-3 font-medium text-slate-500">{log.operator}</td>
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
