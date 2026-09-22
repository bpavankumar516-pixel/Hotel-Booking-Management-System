import React, { useState } from 'react';
import { History, Search, Filter, Eye, Ban, CheckCircle2, X } from 'lucide-react';

export const BookingHistoryPage = () => {
  const [historyList, setHistoryList] = useState([
    { id: 'LG-B00109', guest: 'Mitchel Johnson', room: '# No.301', checkIn: '2026-09-15', checkOut: '2026-09-18', amount: '$535.50', status: 'Completed' },
    { id: 'LG-B00105', guest: 'Robert Affleck', room: '# No.105', checkIn: '2026-09-17', checkOut: '2026-09-20', amount: '$750.00', status: 'Completed' },
    { id: 'LG-B00102', guest: 'Chris Hemsworth', room: '# No.402', checkIn: '2026-09-22', checkOut: '2026-09-24', amount: '$420.00', status: 'Active' },
    { id: 'LG-B00098', guest: 'Sarah Wilson', room: '# No.281', checkIn: '2026-09-10', checkOut: '2026-09-12', amount: '$310.00', status: 'Canceled' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredHistory = historyList.filter((b) => {
    const matchesSearch =
      b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCancelBooking = (id) => {
    setHistoryList(
      historyList.map((b) => (b.id === id ? { ...b, status: 'Canceled' } : b))
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Module 08
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Booking History</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Archived booking records, cancellation management, and stay timelines.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ID, guest, or room..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Booking Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Active">Active</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Room</th>
                <th className="py-3 px-4">Check-In</th>
                <th className="py-3 px-4">Check-Out</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
              {filteredHistory.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E2B37]">{b.id}</td>
                  <td className="py-3.5 px-4 font-['Poppins'] font-bold">{b.guest}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{b.room}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{b.checkIn}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{b.checkOut}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold">{b.amount}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold text-white uppercase ${
                        b.status === 'Completed'
                          ? 'bg-[#2ECC71]'
                          : b.status === 'Active'
                          ? 'bg-[#2563EB]'
                          : 'bg-[#E74C3C]'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      title="View Details"
                      className="p-1.5 text-slate-600 hover:text-[#C5A059] rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {b.status === 'Active' && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        title="Cancel Booking"
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Booking Record ({selectedBooking.id})
              </h3>
              <button onClick={() => setSelectedBooking(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-slate-600">
              <p><span className="font-bold text-[#1E2B37]">Guest:</span> {selectedBooking.guest}</p>
              <p><span className="font-bold text-[#1E2B37]">Room Number:</span> {selectedBooking.room}</p>
              <p><span className="font-bold text-[#1E2B37]">Check-In:</span> {selectedBooking.checkIn}</p>
              <p><span className="font-bold text-[#1E2B37]">Check-Out:</span> {selectedBooking.checkOut}</p>
              <p><span className="font-bold text-[#1E2B37]">Amount Charged:</span> {selectedBooking.amount}</p>
              <p><span className="font-bold text-[#1E2B37]">Status:</span> {selectedBooking.status}</p>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full py-2.5 rounded-lg bg-[#1E2B37] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
