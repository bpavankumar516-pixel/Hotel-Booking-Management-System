import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Search, Filter, Eye, Ban, CheckCircle2 } from 'lucide-react';
import { useHotel } from '../../contexts/HotelContext';

export const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const { guests = [], reservations = [], cancelReservation } = useHotel();

  const historyList = (reservations.length > 0 ? reservations : []).map((r, idx) => {
    const matchedGuest = guests.find(
      (g) => g.fullName?.toLowerCase()?.trim() === r.guestName?.toLowerCase()?.trim()
    );
    return {
      id: r.id || `LG-B00${109 - idx}`,
      guest: r.guestName,
      email: r.guestEmail,
      phone: r.guestPhone,
      avatar: matchedGuest?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      room: r.roomNumber,
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      amount: `$${r.totalAmount}`,
      status: r.status === 'Cancelled' ? 'Canceled' : r.status === 'Checked-In' ? 'Active' : r.status,
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredHistory = historyList.filter((b) => {
    const matchesSearch =
      b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCancelBooking = (id) => {
    cancelReservation(id);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Booking History</h2>
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
            <option value="Confirmed">Confirmed</option>
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
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">
                    <button
                      onClick={() => navigate(`/reservations/${b.id}`)}
                      className="hover:underline cursor-pointer"
                    >
                      {b.id}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-['Poppins'] font-bold">{b.guest}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1E2B37]">{b.room}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{b.checkIn}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{b.checkOut}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-600">{b.amount}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        b.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : b.status === 'Active' || b.status === 'Checked-In'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Confirmed'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => navigate(`/reservations/${b.id}`)}
                      title="View Details"
                      className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {(b.status === 'Active' || b.status === 'Confirmed') && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        title="Cancel Booking"
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
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
    </div>
  );
};

