import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  CalendarCheck,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  UserCheck,
  Calendar,
  User,
  BedDouble,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  FileText,
  LogOut,
  LayoutGrid,
  List,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const RoomBookingPage = () => {
  const [reservations, setReservations] = useState([
    {
      id: 'RES-9012',
      guestName: 'Mitchel Johnson',
      guestEmail: 'mitchel@example.com',
      guestPhone: '+99 256 896 8855',
      roomNumber: '# No.101',
      roomType: 'Presidential Suite',
      checkIn: '2026-09-24',
      checkOut: '2026-09-28',
      nights: 4,
      guests: '2 Adults, 1 Child',
      totalAmount: 1000,
      paymentStatus: 'Paid',
      status: 'Confirmed',
    },
    {
      id: 'RES-9013',
      guestName: 'Robert Affleck',
      guestEmail: 'robert@example.com',
      guestPhone: '+81 569 854 8866',
      roomNumber: '# No.102',
      roomType: 'Deluxe Suite',
      checkIn: '2026-09-23',
      checkOut: '2026-09-26',
      nights: 3,
      guests: '2 Adults',
      totalAmount: 420,
      paymentStatus: 'Paid',
      status: 'Checked-In',
    },
    {
      id: 'RES-9014',
      guestName: 'Sarah Wilson',
      guestEmail: 'sarah@example.com',
      guestPhone: '+1 408 923 1188',
      roomNumber: '# No.201',
      roomType: 'Executive Room',
      checkIn: '2026-09-25',
      checkOut: '2026-09-30',
      nights: 5,
      guests: '3 Adults',
      totalAmount: 825,
      paymentStatus: 'Pending',
      status: 'Confirmed',
    },
    {
      id: 'RES-9015',
      guestName: 'Alexander Wright',
      guestEmail: 'alexander@example.com',
      guestPhone: '+1 555 019 2831',
      roomNumber: '# No.202',
      roomType: 'Standard Room',
      checkIn: '2026-09-20',
      checkOut: '2026-09-23',
      nights: 3,
      guests: '1 Adult',
      totalAmount: 285,
      paymentStatus: 'Paid',
      status: 'Completed',
    },
    {
      id: 'RES-9016',
      guestName: 'Elena Rostova',
      guestEmail: 'elena@example.com',
      guestPhone: '+44 791 112 3456',
      roomNumber: '# No.301',
      roomType: 'Presidential Suite',
      checkIn: '2026-09-26',
      checkOut: '2026-09-27',
      nights: 1,
      guests: '2 Adults',
      totalAmount: 280,
      paymentStatus: 'Refunded',
      status: 'Cancelled',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPayment, setFilterPayment] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [activeModal, setActiveModal] = useState(null); // 'add' | 'details'
  const [selectedRes, setSelectedRes] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomNumber: '# No.101',
    roomType: 'Presidential Suite',
    checkIn: '2026-09-25',
    checkOut: '2026-09-28',
    guests: '2 Adults',
    pricePerNight: 250,
    paymentStatus: 'Paid',
  });

  // Calculate nights & total automatically
  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Filtering
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesPayment = filterPayment === 'All' || r.paymentStatus === filterPayment;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage) || 1;
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Create Reservation Handler
  const handleCreateReservation = (e) => {
    e.preventDefault();
    const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);
    const totalAmount = nights * Number(bookingForm.pricePerNight);

    const newRes = {
      id: `RES-${Math.floor(9017 + Math.random() * 100)}`,
      guestName: bookingForm.guestName,
      guestEmail: bookingForm.guestEmail || `${bookingForm.guestName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      guestPhone: bookingForm.guestPhone || '+1 555 019 9999',
      roomNumber: bookingForm.roomNumber,
      roomType: bookingForm.roomType,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      nights: nights,
      guests: bookingForm.guests,
      totalAmount: totalAmount,
      paymentStatus: bookingForm.paymentStatus,
      status: 'Confirmed',
    };

    setReservations([newRes, ...reservations]);
    setActiveModal(null);
    toast.success(`Reservation ${newRes.id} created successfully for ${newRes.guestName}!`);
  };

  // Status Change Handlers
  const handleCheckIn = (res) => {
    setReservations(reservations.map((r) => (r.id === res.id ? { ...r, status: 'Checked-In' } : r)));
    toast.success(`Guest ${res.guestName} checked in to Room ${res.roomNumber}!`);
  };

  const handleCheckOut = (res) => {
    setReservations(reservations.map((r) => (r.id === res.id ? { ...r, status: 'Completed' } : r)));
    toast.info(`Guest ${res.guestName} checked out. Room ${res.roomNumber} marked for cleaning.`);
  };

  const handleCancelReservation = (res) => {
    setReservations(
      reservations.map((r) => (r.id === res.id ? { ...r, status: 'Cancelled', paymentStatus: 'Refunded' } : r))
    );
    toast.error(`Reservation ${res.id} for ${res.guestName} has been cancelled.`);
  };

  // KPIs
  const totalCount = reservations.length;
  const checkedInCount = reservations.filter((r) => r.status === 'Checked-In').length;
  const confirmedCount = reservations.filter((r) => r.status === 'Confirmed').length;
  const completedCount = reservations.filter((r) => r.status === 'Completed').length;
  const cancelledCount = reservations.filter((r) => r.status === 'Cancelled').length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Module Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Module 05
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">
              Reservations & Booking Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage advance room bookings, express check-in/out workflows, stay durations, and folio balances.
          </p>
        </div>

        <button
          onClick={() => {
            setBookingForm({
              guestName: '',
              guestEmail: '',
              guestPhone: '',
              roomNumber: '# No.101',
              roomType: 'Presidential Suite',
              checkIn: '2026-09-25',
              checkOut: '2026-09-28',
              guests: '2 Adults',
              pricePerNight: 250,
              paymentStatus: 'Paid',
            });
            setActiveModal('add');
          }}
          className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-[#1E2B37] flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Bookings</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{totalCount}</span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">Active Cycle</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Checked-In</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{checkedInCount}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Currently In-House</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-[#C5A059] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Confirmed</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{confirmedCount}</span>
            <span className="text-[11px] text-amber-600 font-semibold block mt-0.5">Awaiting Arrival</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Completed</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{completedCount}</span>
            <span className="text-[11px] text-blue-600 font-semibold block mt-0.5">Stays Finished</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Cancelled</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{cancelledCount}</span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">Refunded</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, guest name, email, or room number..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Reservation Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Checked-In">Checked-In</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={filterPayment}
            onChange={(e) => {
              setFilterPayment(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#1E2B37] shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#1E2B37] shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Reservation Directory */}
      {filteredReservations.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200/80 space-y-3">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-['Poppins'] text-base font-bold text-[#1E2B37]">No reservations match your filters</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or reservation status options.</p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Booking ID & Guest</th>
                  <th className="py-3.5 px-4">Room & Type</th>
                  <th className="py-3.5 px-4">Check-In / Out</th>
                  <th className="py-3.5 px-4">Total Bill</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {paginatedReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono text-[11px] text-[#C5A059] font-bold block">{res.id}</span>
                        <span className="font-['Poppins'] font-bold text-slate-800 text-sm block">{res.guestName}</span>
                        <span className="text-[11px] text-slate-400 block">{res.guestPhone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-[#1E2B37] block">{res.roomNumber}</span>
                        <span className="text-[11px] text-slate-500 font-semibold block">{res.roomType}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-mono text-slate-700 font-semibold block">{res.checkIn} → {res.checkOut}</span>
                        <span className="text-[10px] text-slate-400 font-medium block">{res.nights} Nights ({res.guests})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono font-extrabold text-emerald-600 block text-sm">${res.totalAmount}</span>
                        <span
                          className={`text-[10px] font-bold uppercase ${
                            res.paymentStatus === 'Paid'
                              ? 'text-emerald-600'
                              : res.paymentStatus === 'Pending'
                              ? 'text-amber-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {res.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          res.status === 'Confirmed'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : res.status === 'Checked-In'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : res.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      {res.status === 'Confirmed' && (
                        <button
                          onClick={() => handleCheckIn(res)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer shadow-xs transition-colors"
                        >
                          Check-In
                        </button>
                      )}
                      {res.status === 'Checked-In' && (
                        <button
                          onClick={() => handleCheckOut(res)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] cursor-pointer shadow-xs transition-colors"
                        >
                          Check-Out
                        </button>
                      )}
                      {res.status !== 'Cancelled' && res.status !== 'Completed' && (
                        <button
                          onClick={() => handleCancelReservation(res)}
                          title="Cancel Reservation"
                          className="px-2 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-[10px] cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedRes(res);
                          setActiveModal('details');
                        }}
                        className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                        title="View Reservation Folio"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedReservations.map((res) => (
            <div key={res.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4 hover:shadow-md transition-shadow relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-[#C5A059] font-bold block">{res.id}</span>
                  <h4 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37] leading-snug">{res.guestName}</h4>
                  <span className="text-xs text-slate-400 font-mono block">{res.guestPhone}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    res.status === 'Confirmed'
                      ? 'bg-amber-100 text-amber-800'
                      : res.status === 'Checked-In'
                      ? 'bg-emerald-100 text-emerald-800'
                      : res.status === 'Completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {res.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 text-slate-600 border border-slate-100">
                <p className="flex justify-between">
                  <span className="text-slate-400">Reserved Room:</span>
                  <strong className="text-[#1E2B37] font-bold">{res.roomNumber} ({res.roomType})</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Stay Duration:</span>
                  <strong className="text-slate-700 font-mono">{res.checkIn} → {res.checkOut} ({res.nights} Nights)</strong>
                </p>
                <p className="flex justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400">Total Folio Bill:</span>
                  <strong className="text-emerald-600 font-mono text-sm">${res.totalAmount} ({res.paymentStatus})</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedRes(res);
                    setActiveModal('details');
                  }}
                  className="text-xs text-[#C5A059] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Folio</span>
                </button>

                <div className="flex items-center space-x-1">
                  {res.status === 'Confirmed' && (
                    <button
                      onClick={() => handleCheckIn(res)}
                      className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] cursor-pointer"
                    >
                      Check-In
                    </button>
                  )}
                  {res.status === 'Checked-In' && (
                    <button
                      onClick={() => handleCheckOut(res)}
                      className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[10px] cursor-pointer"
                    >
                      Check-Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-500 font-medium">
          <span>
            Showing page <strong className="text-[#1E2B37] font-bold">{currentPage}</strong> of <strong className="text-[#1E2B37] font-bold">{totalPages}</strong> ({filteredReservations.length} reservations)
          </span>
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                {activeModal === 'add' ? 'Create New Reservation' : `Reservation Folio — ${selectedRes?.id}`}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === 'details' ? (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-start pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{selectedRes?.guestName}</h4>
                      <p className="text-slate-500 font-mono">{selectedRes?.guestEmail} • {selectedRes?.guestPhone}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#C5A059]">{selectedRes?.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-slate-700">
                    <p><strong>Reserved Room:</strong> {selectedRes?.roomNumber}</p>
                    <p><strong>Room Category:</strong> {selectedRes?.roomType}</p>
                    <p><strong>Check-In Date:</strong> {selectedRes?.checkIn}</p>
                    <p><strong>Check-Out Date:</strong> {selectedRes?.checkOut}</p>
                    <p><strong>Stay Nights:</strong> {selectedRes?.nights} Nights</p>
                    <p><strong>Occupancy:</strong> {selectedRes?.guests}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold">
                    <span>Total Folio Bill:</span>
                    <span className="font-mono text-emerald-600 text-base">${selectedRes?.totalAmount} ({selectedRes?.paymentStatus})</span>
                  </div>
                </div>

                <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-lg bg-[#1E2B37] text-white font-bold cursor-pointer">
                  Close Folio Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateReservation} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.guestName}
                    onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    placeholder="e.g. Mitchel Johnson"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Guest Email</label>
                    <input
                      type="email"
                      value={bookingForm.guestEmail}
                      onChange={(e) => setBookingForm({ ...bookingForm, guestEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                      placeholder="guest@example.com"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Guest Mobile</label>
                    <input
                      type="text"
                      value={bookingForm.guestPhone}
                      onChange={(e) => setBookingForm({ ...bookingForm, guestPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                      placeholder="+1 555 019 9999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Select Suite / Room</label>
                    <select
                      value={bookingForm.roomNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        let type = 'Presidential Suite';
                        let price = 250;
                        if (val === '# No.102') { type = 'Deluxe Suite'; price = 140; }
                        if (val === '# No.201') { type = 'Executive Room'; price = 165; }
                        if (val === '# No.202') { type = 'Standard Room'; price = 95; }
                        setBookingForm({ ...bookingForm, roomNumber: val, roomType: type, pricePerNight: price });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-[#1E2B37]"
                    >
                      <option value="# No.101"># No.101 - Presidential Suite ($250/night)</option>
                      <option value="# No.102"># No.102 - Deluxe Suite ($140/night)</option>
                      <option value="# No.201"># No.201 - Executive Room ($165/night)</option>
                      <option value="# No.202"># No.202 - Standard Room ($95/night)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Occupants / Guests</label>
                    <input
                      type="text"
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                      placeholder="e.g. 2 Adults, 1 Child"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Check-In Date</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.checkIn}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Check-Out Date</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.checkOut}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Payment Status</label>
                  <select
                    value={bookingForm.paymentStatus}
                    onChange={(e) => setBookingForm({ ...bookingForm, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-[#1E2B37]"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold mt-2 cursor-pointer shadow-md">
                  Confirm & Create Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
