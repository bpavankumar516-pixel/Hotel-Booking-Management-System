import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle2,
  Calendar,
  User,
  BedDouble,
  DollarSign,
  Clock,
  X,
  Printer,
  ShieldCheck,
  Key,
  CalendarDays,
  FileText,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';

export const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const {
    guests = [],
    reservations = [],
    cancelReservation,
    checkOutReservation,
    calculateStayProgress,
  } = useHotel();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDateRange, setFilterDateRange] = useState('All Time');

  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  // Map Reservations into rich Booking History Records
  const historyList = reservations.map((r, idx) => {
    const matchedGuest = guests.find(
      (g) => g.fullName?.toLowerCase()?.trim() === r.guestName?.toLowerCase()?.trim()
    );

    const progressInfo = calculateStayProgress
      ? calculateStayProgress(r.checkIn, r.checkOut, r.status)
      : { nights: r.nights || 3, progressPercent: 100, statusLabel: r.status };

    const keyCardCode = `KC-${(r.roomNumber || '101').replace(/[^0-9]/g, '') || '101'}-A`;

    return {
      id: r.id || `RES-901${idx}`,
      guest: r.guestName,
      email: r.guestEmail || matchedGuest?.email || 'guest@horizon.com',
      phone: r.guestPhone || matchedGuest?.mobile || '+1 555-0199',
      idProof: matchedGuest?.idProof || 'PASSPORT-902188',
      nationality: matchedGuest?.nationality || 'United States',
      avatar: matchedGuest?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      room: r.roomNumber,
      roomType: r.roomType || 'Presidential Suite',
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      nights: r.nights || 3,
      guestsCount: r.guests || '2 Adults',
      totalAmount: Number(r.totalAmount) || 500,
      paymentStatus: r.paymentStatus || 'Paid',
      status: r.status || 'Confirmed',
      keyCard: keyCardCode,
      progress: progressInfo,
    };
  });

  // Filter Logic
  const filteredHistory = historyList.filter((b) => {
    const matchesSearch =
      b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'All'
        ? true
        : filterStatus === 'Active'
        ? b.status === 'Checked-In'
        : b.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Dynamic Statistics
  const totalCount = historyList.length;
  const activeCount = historyList.filter((b) => b.status === 'Checked-In').length;
  const completedCount = historyList.filter((b) => b.status === 'Completed').length;
  const cancelledCount = historyList.filter((b) => b.status === 'Cancelled').length;

  // Actions
  const handleConfirmCancel = (id) => {
    cancelReservation(id);
    setConfirmCancelId(null);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(null);
    }
  };

  const handleCompleteStay = (id) => {
    checkOutReservation(id);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(null);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059]">
              <History className="w-5 h-5" />
            </span>
            <h2 className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">Booking History Directory</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Archived reservation records, stay progress timelines, keycard audits, and reservation management.
          </p>
        </div>

        <button
          onClick={() => navigate('/reservations')}
          className="py-2.5 px-4 rounded-xl bg-[#1E2B37] hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center space-x-2 cursor-pointer transition-colors shadow-md"
        >
          <CalendarDays className="w-4 h-4 text-[#C5A059]" />
          <span>Go to Booking</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total Bookings</p>
            <h3 className="font-['Poppins'] text-2xl font-black text-[#1E2B37] mt-1">{totalCount}</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Historical reservations</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <History className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Active Checked-In</p>
            <h3 className="font-['Poppins'] text-2xl font-black text-emerald-600 mt-1">{activeCount}</h3>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">Currently in-house guests</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <BedDouble className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Completed Stays</p>
            <h3 className="font-['Poppins'] text-2xl font-black text-blue-600 mt-1">{completedCount}</h3>
            <p className="text-[11px] text-blue-700 font-medium mt-1">Checked out & finalized</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Cancelled Bookings</p>
            <h3 className="font-['Poppins'] text-2xl font-black text-rose-600 mt-1">{cancelledCount}</h3>
            <p className="text-[11px] text-rose-700 font-medium mt-1">Refunded & freed rooms</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
            <Ban className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ID, guest, mobile or room..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-medium focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Booking Statuses</option>
            <option value="Confirmed">Confirmed (Upcoming)</option>
            <option value="Active">Checked-In (Active)</option>
            <option value="Completed">Completed (Checked-Out)</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All Time">All Time History</option>
            <option value="Today">Today</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
      </div>

      {/* Booking History Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-['Poppins'] font-bold text-sm text-[#1E2B37]">
            Historical Reservation Logs ({filteredHistory.length})
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click view icon for complete stay details & keycard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Guest Profile</th>
                <th className="py-3.5 px-4">Room & Type</th>
                <th className="py-3.5 px-4">Stay Duration</th>
                <th className="py-3.5 px-4">Folio Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
              {filteredHistory.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-[#C5A059]">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="hover:underline cursor-pointer flex items-center space-x-1"
                    >
                      <span>{b.id}</span>
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={b.avatar}
                        alt={b.guest}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-['Poppins'] font-bold text-[#1E2B37] leading-tight">{b.guest}</p>
                        <p className="text-[10px] text-slate-400 leading-tight">{b.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-mono font-bold text-[#1E2B37] leading-tight">{b.room}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">{b.roomType}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-600">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>
                          {b.checkIn} → {b.checkOut} ({b.nights} {b.nights === 1 ? 'Night' : 'Nights'})
                        </span>
                      </div>

                      {/* Stay Timeline Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            b.status === 'Completed'
                              ? 'bg-blue-600'
                              : b.status === 'Checked-In'
                              ? 'bg-emerald-500'
                              : b.status === 'Cancelled'
                              ? 'bg-rose-400'
                              : 'bg-amber-400'
                          }`}
                          style={{
                            width: `${
                              b.status === 'Completed'
                                ? 100
                                : b.status === 'Cancelled'
                                ? 0
                                : b.progress?.progressPercent || 50
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono font-extrabold text-emerald-600 text-sm">
                    ${b.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        b.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : b.status === 'Checked-In'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : b.status === 'Confirmed'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {b.status === 'Checked-In' ? 'ACTIVE STAY' : b.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      title="View Stay Details"
                      className="p-2 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {b.status === 'Checked-In' && (
                      <button
                        onClick={() => handleCompleteStay(b.id)}
                        title="Checkout & Mark Completed"
                        className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl cursor-pointer transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    {(b.status === 'Confirmed' || b.status === 'Checked-In') && (
                      <button
                        onClick={() => setConfirmCancelId(b.id)}
                        title="Cancel Reservation"
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors"
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

      {/* Booking Details Breakdown Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-amber-50 text-[#C5A059]">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                    Booking Details Breakdown
                  </h3>
                  <p className="text-[11px] font-mono text-[#C5A059] font-bold">{selectedBooking.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-xs">
              {/* Status Header Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Current Status</span>
                  <span className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37]">
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">RFID Keycard</span>
                  <span className="font-mono font-bold text-[#C5A059] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex items-center space-x-1">
                    <Key className="w-3 h-3 text-[#C5A059]" />
                    <span>{selectedBooking.keyCard}</span>
                  </span>
                </div>
              </div>

              {/* Guest Profile Card */}
              <div className="p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Guest Information
                </span>
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedBooking.avatar}
                    alt={selectedBooking.guest}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-['Poppins'] font-bold text-sm text-[#1E2B37]">{selectedBooking.guest}</h4>
                    <p className="text-slate-500">{selectedBooking.email} | {selectedBooking.phone}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ID Proof: {selectedBooking.idProof} ({selectedBooking.nationality})
                    </p>
                  </div>
                </div>
              </div>

              {/* Room & Stay Timeline */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Assigned Room</span>
                  <p className="font-mono font-black text-[#1E2B37] text-base mt-0.5">{selectedBooking.room}</p>
                  <p className="text-slate-500 text-[11px]">{selectedBooking.roomType}</p>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Stay Duration</span>
                  <p className="font-bold text-[#1E2B37] text-xs mt-0.5">
                    {selectedBooking.nights} {selectedBooking.nights === 1 ? 'Night' : 'Nights'} ({selectedBooking.guestsCount})
                  </p>
                  <p className="text-slate-500 text-[11px] font-mono">
                    {selectedBooking.checkIn} → {selectedBooking.checkOut}
                  </p>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-4 rounded-2xl bg-[#1E2B37] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Total Folio Payment
                  </span>
                  <p className="font-mono font-black text-xl text-[#C5A059] mt-0.5">
                    ${selectedBooking.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Payment Method / Status
                  </span>
                  <span className="font-bold text-emerald-400 block text-xs">{selectedBooking.paymentStatus}</span>
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  navigate(`/reservations/${selectedBooking.id}`);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Open Dedicated Reservation Page</span>
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Cancellation Dialog */}
      {confirmCancelId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37]">Cancel Reservation?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel reservation <span className="font-mono font-bold text-[#C5A059]">{confirmCancelId}</span>?
                This will free the room to Available and process a payment refund.
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleConfirmCancel(confirmCancelId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
