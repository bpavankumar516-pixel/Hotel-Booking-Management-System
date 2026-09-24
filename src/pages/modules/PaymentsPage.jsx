import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Download,
  Search,
  Filter,
  Printer,
  FileText,
  CheckCircle2,
  X,
  Plus,
  Clock,
  RefreshCw,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Building2,
  Calendar,
  User,
  ShieldCheck,
  Check,
  Edit,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';

export const PaymentsPage = () => {
  const navigate = useNavigate();
  const {
    reservations = [],
    guests = [],
    rooms = [],
    updatePaymentStatus,
    addReservation,
    updateReservation,
    deleteReservation,
  } = useHotel();

  const availableRooms = rooms.filter((r) => r.status === 'Available');

  // Map Reservations into rich Payment Records
  const payments = reservations.map((r, idx) => {
    const matchedGuest = guests.find(
      (g) => g.fullName?.toLowerCase()?.trim() === r.guestName?.toLowerCase()?.trim()
    );

    const methods = ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash'];
    const selectedMethod = methods[idx % methods.length];

    return {
      id: `INV-902${idx + 1}`,
      bookingId: r.id,
      guest: r.guestName,
      email: r.guestEmail || matchedGuest?.email || 'guest@resort.com',
      phone: r.guestPhone || matchedGuest?.mobile || '+1 555-0199',
      avatar: matchedGuest?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      room: r.roomNumber,
      roomType: r.roomType || 'Deluxe Suite',
      nights: r.nights || 3,
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      amount: Number(r.totalAmount) || 500,
      status: r.paymentStatus || 'Paid',
      bookingStatus: r.status,
      method: selectedMethod,
      date: r.checkIn || '2026-09-24',
    };
  });

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMethod, setFilterMethod] = useState('All');
  const [filterDateRange, setFilterDateRange] = useState('All Time');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [confirmDeletePayment, setConfirmDeletePayment] = useState(null);

  // Searchable Guest Selection Modal State
  const [modalGuestSearch, setModalGuestSearch] = useState('');
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isGuestSelected, setIsGuestSelected] = useState(false);

  // Filtered guests for modal search dropdown
  const modalFilteredGuests = guests.filter((g) => {
    const q = modalGuestSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      g.fullName.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.mobile.includes(q) ||
      (g.idProof && g.idProof.toLowerCase().includes(q))
    );
  });

  // New Payment Form State
  const [newPayment, setNewPayment] = useState({
    guestName: '',
    guestEmail: '',
    roomNumber: '# No.101',
    amount: '',
    method: 'Credit Card',
    status: 'Paid',
  });

  // Filter Logic
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.room.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesMethod = filterMethod === 'All' || p.method === filterMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Calculated Financial Metrics
  const totalRevenue = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const paidCount = payments.filter((p) => p.status === 'Paid').length;
  const pendingPayments = payments.filter((p) => p.status === 'Pending');
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = pendingPayments.length;

  const refundedPayments = payments.filter((p) => p.status === 'Refunded');
  const refundedAmount = refundedPayments.reduce((sum, p) => sum + p.amount, 0);
  const refundedCount = refundedPayments.length;

  // Handle Payment Status Toggle/Change
  const handleStatusChange = (bookingId, newStatus) => {
    updatePaymentStatus(bookingId, newStatus);
  };

  // Export to CSV Functionality
  const handleExportCSV = () => {
    if (filteredPayments.length === 0) {
      toast.info('No payment records to export.');
      return;
    }

    const headers = ['Invoice ID', 'Booking ID', 'Guest Name', 'Email', 'Room', 'Payment Method', 'Date', 'Amount ($)', 'Status'];
    const rows = filteredPayments.map((p) => [
      p.id,
      p.bookingId,
      `"${p.guest}"`,
      p.email,
      `"${p.room}"`,
      p.method,
      p.date,
      p.amount.toFixed(2),
      p.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `grand_horizon_payments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Exported payments directory to CSV file!');
  };

  // Trigger Print / PDF Invoice Download
  const handlePrintInvoice = () => {
    window.print();
    toast.success('Sent invoice to printer / PDF viewer.');
  };

  // Submit Manual Payment Creation
  const handleCreatePaymentSubmit = (e) => {
    e.preventDefault();
    if (!newPayment.guestName || !newPayment.amount) {
      toast.error('Please enter guest name and payment amount.');
      return;
    }

    const createdRes = {
      guestName: newPayment.guestName,
      guestEmail: newPayment.guestEmail || `${newPayment.guestName.toLowerCase().replace(/\s+/g, '.')}@x.dummyjson.com`,
      guestPhone: '+1 555-0188',
      roomNumber: newPayment.roomNumber,
      roomType: 'Deluxe Suite',
      checkIn: new Date().toISOString().slice(0, 10),
      checkOut: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      nights: 3,
      guests: '2 Adults',
      totalAmount: Number(newPayment.amount),
      paymentStatus: newPayment.status,
      status: 'Confirmed',
    };

    addReservation(createdRes);
    setShowAddPaymentModal(false);
    setNewPayment({
      guestName: '',
      guestEmail: '',
      roomNumber: '# No.101',
      amount: '',
      method: 'Credit Card',
      status: 'Paid',
    });
    toast.success(`Payment transaction recorded for ${createdRes.guestName}!`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059]">
              <CreditCard className="w-5 h-5" />
            </span>
            <h2 className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">Payments & Billing</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time financial summary, guest invoices, payment status management, transaction filters, and printable receipts.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#1E2B37] font-bold text-xs inline-flex items-center space-x-2 cursor-pointer transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => {
              const firstAvail = availableRooms[0];
              setModalGuestSearch('');
              setIsGuestSelected(false);
              setIsGuestDropdownOpen(false);
              setNewPayment({
                guestName: '',
                guestEmail: '',
                roomNumber: firstAvail?.number || '# No.101',
                amount: '',
                method: 'Credit Card',
                status: 'Paid',
              });
              setShowAddPaymentModal(true);
            }}
            className="py-2.5 px-4 rounded-xl bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold text-xs inline-flex items-center space-x-2 cursor-pointer transition-colors shadow-md shadow-amber-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Summary Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-[#1E2B37] text-white p-5 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue Paid</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-[#C5A059] mt-1">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-[#2B3A4A] text-[#C5A059]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-300 mt-3 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{paidCount} Successful paid transactions</span>
          </p>
        </div>

        {/* Paid Transactions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Paid Invoices</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-emerald-600 mt-1">
                {paidCount} <span className="text-xs font-semibold text-slate-400">Invoices</span>
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-medium">100% Verified guest collections</p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Amount</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-amber-600 mt-1">
                ${pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-medium">
            {pendingCount} {pendingCount === 1 ? 'Folio awaiting check-out payment' : 'Folios awaiting check-out payment'}
          </p>
        </div>

        {/* Refunded / Cancelled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Refunded / Cancelled</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-rose-600 mt-1">
                ${refundedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
              <RefreshCw className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-medium">{refundedCount} Processed refunds</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice ID, guest name, booking..."
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
            <option value="All">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* Payment Method Filter */}
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank Transfer">Bank Transfer / UPI</option>
            <option value="Cash">Cash</option>
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
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
      </div>

      {/* Payments History Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-['Poppins'] font-bold text-sm text-[#1E2B37]">
            Payment Transactions Directory ({filteredPayments.length})
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click status badge to update payment status</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Invoice ID</th>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Guest Profile</th>
                <th className="py-3.5 px-4">Room #</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4 text-center">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Invoice Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-[#C5A059]">
                    <button
                      onClick={() => navigate(`/payments/invoice/${p.id}`)}
                      className="hover:underline cursor-pointer"
                    >
                      {p.id}
                    </button>
                  </td>
                  <td className="py-4 px-4 font-mono font-semibold text-slate-600">
                    <button
                      onClick={() => navigate(`/reservations/${p.bookingId}`)}
                      className="hover:underline text-blue-600 cursor-pointer font-bold"
                    >
                      {p.bookingId}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.avatar}
                        alt={p.guest}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-['Poppins'] font-bold text-[#1E2B37] leading-tight">{p.guest}</p>
                        <p className="text-[10px] text-slate-400 leading-tight">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-700">{p.room}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-medium text-slate-700 text-[11px]">
                      <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                      <span>{p.method}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">{p.date}</td>
                  <td className="py-4 px-4 font-mono font-extrabold text-[#1E2B37] text-sm">
                    ${p.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.bookingId, e.target.value)}
                      className={`px-3 py-1 rounded-lg font-extrabold text-[11px] tracking-wide uppercase border focus:outline-none cursor-pointer ${
                        p.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : p.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="Paid">PAID</option>
                      <option value="Pending">PENDING</option>
                      <option value="Refunded">REFUNDED</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => navigate(`/payments/invoice/${p.id}`)}
                        className="py-1.5 px-2.5 rounded-lg bg-[#1E2B37] hover:bg-slate-800 text-white font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                        title="View Invoice Sheet"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Invoice</span>
                      </button>
                      <button
                        onClick={() => setEditingPayment({ ...p })}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Payment Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setConfirmDeletePayment(p)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Payment Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Generator & Print Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">
                  Official Guest Invoice Breakdown
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Print Container Sheet */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6 text-xs font-sans relative">
              {/* PAID Watermark Stamp */}
              {selectedInvoice.status === 'Paid' && (
                <div className="absolute right-8 top-12 rotate-[-12deg] border-4 border-emerald-500/40 text-emerald-600 font-black text-3xl px-4 py-1.5 rounded-xl uppercase tracking-widest pointer-events-none select-none">
                  PAID IN FULL
                </div>
              )}

              {/* Resort Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-4 gap-4">
                <div>
                  <h4 className="font-['Poppins'] font-black text-xl text-[#1E2B37] tracking-tight">
                    Grand Horizon Resort & Spa
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">100 Oceanfront Drive, Paradise Beach, CA 90210</p>
                  <p className="text-[11px] text-slate-500">Contact: +1 (800) 555-HORIZON | Tax ID: US-9941820</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Invoice No.
                  </span>
                  <p className="font-mono font-black text-lg text-[#C5A059]">{selectedInvoice.id}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Date: {selectedInvoice.date}</p>
                </div>
              </div>

              {/* Guest & Stay Details */}
              <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Billed Guest Profile
                  </span>
                  <p className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37]">{selectedInvoice.guest}</p>
                  <p className="text-slate-500">{selectedInvoice.email}</p>
                  <p className="text-slate-500">{selectedInvoice.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Stay & Booking Summary
                  </span>
                  <p className="font-bold text-[#1E2B37]">
                    Room {selectedInvoice.room} ({selectedInvoice.roomType})
                  </p>
                  <p className="text-slate-500">
                    Booking ID: <span className="font-mono text-[#C5A059] font-bold">{selectedInvoice.bookingId}</span>
                  </p>
                  <p className="text-slate-500">
                    Duration: {selectedInvoice.checkIn} to {selectedInvoice.checkOut} ({selectedInvoice.nights} Nights)
                  </p>
                </div>
              </div>

              {/* Itemized Invoice Table */}
              <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-100 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3 text-center">Rate / Night</th>
                      <th className="py-2.5 px-3 text-center">Nights</th>
                      <th className="py-2.5 px-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-3 font-semibold">
                        {selectedInvoice.roomType} Accommodation ({selectedInvoice.room})
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        ${(selectedInvoice.amount / selectedInvoice.nights).toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">{selectedInvoice.nights}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#1E2B37]">
                        ${selectedInvoice.amount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-500">Resort Amenities & Fiber High-Speed WiFi</td>
                      <td className="py-2.5 px-3 text-center font-mono text-emerald-600 font-bold">COMPLIMENTARY</td>
                      <td className="py-2.5 px-3 text-center font-mono">{selectedInvoice.nights}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-500">$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Total */}
              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-2 text-right">
                  <div className="flex justify-between text-slate-500 text-xs">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-slate-700">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-xs">
                    <span>Occupancy Taxes & Fees (0% Included):</span>
                    <span className="font-mono font-bold text-slate-700">$0.00</span>
                  </div>
                  <div className="border-t border-slate-300 pt-2 flex justify-between font-extrabold text-base text-[#1E2B37]">
                    <span>Total Folio Amount:</span>
                    <span className="font-mono text-[#C5A059]">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-500 font-bold">Payment Status:</span>
                    <span
                      className={`font-black uppercase tracking-wider ${
                        selectedInvoice.status === 'Paid'
                          ? 'text-emerald-600'
                          : selectedInvoice.status === 'Pending'
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {selectedInvoice.status} ({selectedInvoice.method})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handlePrintInvoice}
                className="flex-1 py-3 rounded-xl bg-[#C5A059] text-white font-bold text-xs hover:bg-[#b08d48] flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF Invoice</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record New Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">Record New Payment</h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePaymentSubmit} className="space-y-3.5 text-xs">
              {/* User-Friendly Searchable Guest Selection */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                  Select Registered Guest Profile *
                </label>

                {isGuestSelected && newPayment.guestName ? (
                  /* Selected Guest Card Display */
                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          guests.find((g) => g.fullName.toLowerCase() === newPayment.guestName.toLowerCase())?.avatar ||
                          'https://dummyjson.com/icon/emilyj/128'
                        }
                        alt={newPayment.guestName}
                        className="w-9 h-9 rounded-full object-cover border border-[#C5A059] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-['Poppins'] font-extrabold text-xs text-[#1E2B37] block leading-tight truncate">
                          {newPayment.guestName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block leading-tight truncate">
                          {newPayment.guestEmail || 'Registered Guest'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsGuestSelected(false);
                        setModalGuestSearch('');
                        setIsGuestDropdownOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-[10px] border border-slate-200 transition-colors cursor-pointer shrink-0"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  /* Interactive Search Input & Dropdown Menu */
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={modalGuestSearch}
                        onFocus={() => setIsGuestDropdownOpen(true)}
                        onChange={(e) => {
                          setModalGuestSearch(e.target.value);
                          setIsGuestDropdownOpen(true);
                        }}
                        placeholder="Type guest name, email, or mobile number..."
                        className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border-2 border-[#C5A059]/60 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059] font-semibold shadow-xs"
                      />
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C5A059]" />
                      {modalGuestSearch && (
                        <button
                          type="button"
                          onClick={() => setModalGuestSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {isGuestDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs">
                        <div className="p-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 backdrop-blur-xs">
                          <span>Matching Registered Guest Directory</span>
                          <span>{modalFilteredGuests.length} Results</span>
                        </div>

                        {modalFilteredGuests.length === 0 ? (
                          <div className="p-4 text-center space-y-2">
                            <p className="text-slate-500 font-medium text-xs">
                              No registered guest matching "{modalGuestSearch}"
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                const newName = modalGuestSearch || 'New Guest';
                                setNewPayment({
                                  ...newPayment,
                                  guestName: newName,
                                  guestEmail: `${newName.toLowerCase().replace(/\s+/g, '')}@x.dummyjson.com`,
                                });
                                setIsGuestSelected(true);
                                setIsGuestDropdownOpen(false);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#C5A059] text-white text-xs font-bold shadow-xs hover:bg-[#b08d48] cursor-pointer inline-flex items-center space-x-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Use "{modalGuestSearch}" as Guest</span>
                            </button>
                          </div>
                        ) : (
                          modalFilteredGuests.map((g) => (
                            <div
                              key={g.id}
                              onClick={() => {
                                setNewPayment({
                                  ...newPayment,
                                  guestName: g.fullName,
                                  guestEmail: g.email || `${g.fullName.toLowerCase().replace(/\s+/g, '')}@x.dummyjson.com`,
                                });
                                setIsGuestSelected(true);
                                setIsGuestDropdownOpen(false);
                              }}
                              className="p-2.5 hover:bg-[#F7F2E7] cursor-pointer flex items-center justify-between transition-colors group"
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <img
                                  src={g.avatar || 'https://dummyjson.com/icon/emilyj/128'}
                                  alt={g.fullName}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 group-hover:border-[#C5A059]"
                                />
                                <div className="min-w-0">
                                  <span className="font-['Poppins'] font-bold text-[#1E2B37] group-hover:text-[#C5A059] block leading-snug truncate">
                                    {g.fullName}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-mono block truncate">
                                    {g.email} • {g.mobile}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right shrink-0 ml-2">
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    g.status === 'Checked-In'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : g.status === 'Active'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {g.status}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Guest Email</label>
                <input
                  type="email"
                  value={newPayment.guestEmail}
                  onChange={(e) => setNewPayment({ ...newPayment, guestEmail: e.target.value })}
                  placeholder="robert.vance@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Room Assigned</label>
                  <select
                    value={newPayment.roomNumber}
                    onChange={(e) => setNewPayment({ ...newPayment, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                  >
                    {availableRooms.length === 0 ? (
                      <option value="">No Rooms Available</option>
                    ) : (
                      availableRooms.map((r) => (
                        <option key={r.id} value={r.number}>
                          {r.number} - {r.type} (${r.price}/night)
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Amount ($) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    placeholder="450"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:outline-none focus:border-[#C5A059] font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Method</label>
                  <select
                    value={newPayment.method}
                    onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer / UPI</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Status</label>
                  <select
                    value={newPayment.status}
                    onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:outline-none focus:border-[#C5A059] font-bold text-emerald-600"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E2B37] text-white font-bold hover:bg-slate-800"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Payment Modal */}
      {editingPayment && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-blue-600" />
                <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">
                  Edit Payment Record ({editingPayment.id})
                </h3>
              </div>
              <button
                onClick={() => setEditingPayment(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateReservation({
                  id: editingPayment.bookingId,
                  guestName: editingPayment.guest,
                  totalAmount: Number(editingPayment.amount),
                  paymentStatus: editingPayment.status,
                  roomNumber: editingPayment.room,
                });
                setEditingPayment(null);
                toast.success(`Updated payment record ${editingPayment.id} for ${editingPayment.guest}!`);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Guest Full Name</label>
                <input
                  type="text"
                  required
                  value={editingPayment.guest}
                  onChange={(e) => setEditingPayment({ ...editingPayment, guest: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Room #</label>
                  <input
                    type="text"
                    readOnly
                    value={editingPayment.room}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Amount ($)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingPayment.amount}
                    onChange={(e) => setEditingPayment({ ...editingPayment, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Method</label>
                  <select
                    value={editingPayment.method}
                    onChange={(e) => setEditingPayment({ ...editingPayment, method: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Status</label>
                  <select
                    value={editingPayment.status}
                    onChange={(e) => setEditingPayment({ ...editingPayment, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold focus:outline-none focus:border-[#C5A059] text-emerald-600"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPayment(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 cursor-pointer shadow-xs"
                >
                  Update Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Payment Confirmation Modal */}
      {confirmDeletePayment && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">Delete Payment Record?</h3>
                <p className="text-xs text-slate-400 font-mono">Invoice Ref: {confirmDeletePayment.id}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Are you sure you want to delete payment record for <strong className="text-[#1E2B37]">{confirmDeletePayment.guest}</strong> (${confirmDeletePayment.amount})? This will also release Room <strong className="text-[#1E2B37]">{confirmDeletePayment.room}</strong> to Available status and purge the reservation record.
            </p>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeletePayment(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteReservation(confirmDeletePayment.bookingId);
                  setConfirmDeletePayment(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
