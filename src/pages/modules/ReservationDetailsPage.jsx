import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  CalendarCheck,
  User,
  BedDouble,
  Clock,
  DollarSign,
  Printer,
  CheckCircle2,
  XCircle,
  UserCheck,
  Sparkles,
  ShieldCheck,
  Eye,
  FileText,
  Trash2,
  Mail,
  Phone,
  CreditCard,
  Globe,
  Key,
  History,
} from 'lucide-react';

export const ReservationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    reservations,
    rooms,
    guests,
    checkInReservation,
    checkOutReservation,
    cancelReservation,
    updateBookingStatus,
    calculateStayProgress,
    checkInLogs,
    checkOutLogs,
  } = useHotel();

  // Find target reservation by ID
  const res = reservations.find(
    (r) => String(r.id).toLowerCase().trim() === String(id).toLowerCase().trim()
  );

  if (!res) {
    return (
      <div className="max-w-[1200px] mx-auto p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1E2B37]">Reservation Folio Not Found</h2>
        <p className="text-slate-500 text-sm">The reservation record you requested does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/reservations')}
          className="px-4 py-2 bg-[#C5A059] text-white font-bold rounded-lg text-xs hover:bg-[#b08d48] cursor-pointer"
        >
          Back to Reservations Engine
        </button>
      </div>
    );
  }

  // Linked Guest & Room
  const linkedGuest = guests.find(
    (g) =>
      g.fullName?.toLowerCase()?.trim() === res.guestName?.toLowerCase()?.trim() ||
      (res.guestEmail && g.email?.toLowerCase()?.trim() === res.guestEmail?.toLowerCase()?.trim())
  );

  const linkedRoom = rooms.find(
    (r) => r.number.toLowerCase().trim() === res.roomNumber?.toLowerCase()?.trim()
  );

  // Filter linked logs for this reservation
  const linkedCheckInLogs = checkInLogs.filter((log) => log.resId === res.id);
  const linkedCheckOutLogs = checkOutLogs.filter((log) => log.resId === res.id);

  // Dynamic Stay Progress Calculation
  const stayProgress = calculateStayProgress(res.checkIn, res.checkOut, res.status);

  const handleCheckIn = () => {
    checkInReservation(res.id);
  };

  const handleCheckOut = () => {
    checkOutReservation(res.id);
  };

  const handleCancel = () => {
    cancelReservation(res.id);
  };

  const handleStatusChange = (newStatus) => {
    updateBookingStatus(res.id, newStatus);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/reservations')}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Back to Reservations Engine"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
                Official Folio Dossier
              </span>
              <span className="text-xs font-mono text-[#C5A059] font-bold">{res.id}</span>
            </div>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37] mt-0.5">
              Reservation Folio — {res.guestName}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {res.status === 'Confirmed' && (
            <button
              onClick={handleCheckIn}
              className="py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Express Check-In</span>
            </button>
          )}

          {res.status === 'Checked-In' && (
            <button
              onClick={handleCheckOut}
              className="py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Express Check-Out</span>
            </button>
          )}

          <button
            onClick={handlePrintReceipt}
            className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1E2B37] text-xs font-bold border border-slate-200 transition-all flex items-center space-x-1 cursor-pointer"
            title="Print Folio Receipt"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Folio</span>
          </button>
        </div>
      </div>

      {/* Dynamic Status Badges & Quick Status Update Selector */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${stayProgress.badgeColor}`}
            >
              {res.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
                res.paymentStatus === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : res.paymentStatus === 'Pending'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {res.paymentStatus}
            </span>
          </div>
        </div>

        {/* Dynamic Booking Status Update Controls */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-600 shrink-0">Update Status:</label>
          <select
            value={res.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#1E2B37] cursor-pointer focus:outline-none focus:border-[#C5A059]"
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Checked-In">Checked-In</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Dynamic Stay Duration & Live Progress Indicator */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
              Dynamic Stay Duration & Live Progress Tracker
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live stay breakdown from Check-In ({res.checkIn}) to Check-Out ({res.checkOut}).
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#C5A059] bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 shrink-0 self-start sm:self-auto">
            {stayProgress.statusLabel}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>Check-In ({res.checkIn})</span>
            <span>{stayProgress.progressPercent}% Stay Elapsed</span>
            <span>Check-Out ({res.checkOut})</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-[#C5A059] h-full transition-all duration-500 rounded-full"
              style={{ width: `${stayProgress.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Total Nights</span>
            <span className="font-mono font-extrabold text-[#1E2B37] text-sm mt-0.5 block">{res.nights} Nights Stay</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Assigned Room</span>
            <span className="font-bold text-[#1E2B37] text-sm mt-0.5 block">{res.roomNumber} ({res.roomType})</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-slate-400 font-bold block uppercase text-[10px]">RFID Key Code</span>
            <span className="font-mono font-extrabold text-emerald-600 text-sm mt-0.5 block">
              {linkedCheckInLogs[0]?.keyCard || `KC-${res.roomNumber.replace(/[^0-9]/g, '') || '101'}-A`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Folio Content (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Guest & Room Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Linked Guest Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Guest Identity Dossier
              </h3>
              {linkedGuest && (
                <button
                  onClick={() => navigate(`/guests/${linkedGuest.id}`)}
                  className="text-xs font-bold text-[#C5A059] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Guest Dossier</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <img
                src={linkedGuest?.avatar || 'https://dummyjson.com/icon/emilyj/128'}
                alt={res.guestName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A059] shrink-0 shadow-md"
              />
              <div className="space-y-0.5">
                <h4 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">{res.guestName}</h4>
                <p className="text-xs text-slate-500 font-mono">{res.guestEmail} • {res.guestPhone}</p>
                {linkedGuest && (
                  <p className="text-xs text-slate-600 font-medium pt-1">
                    ID Proof: <strong className="text-[#1E2B37]">{linkedGuest.idProof}</strong> | Country: <strong className="text-[#1E2B37]">{linkedGuest.nationality}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Reserved Suite Details Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Assigned Accommodations
              </h3>
              {linkedRoom && (
                <button
                  onClick={() => navigate(`/rooms/${linkedRoom.id}`)}
                  className="text-xs font-bold text-[#C5A059] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Room Specs</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <img
                src={linkedRoom?.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'}
                alt={res.roomNumber}
                className="w-full sm:w-32 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1 w-full">
                <div className="flex justify-between items-center">
                  <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{res.roomNumber}</h4>
                  <span className="font-mono text-sm font-bold text-emerald-600">${linkedRoom?.price || 250}/night</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold">{res.roomType}</p>
                <p className="text-[11px] text-slate-600 font-medium">
                  {linkedRoom?.amenities || 'Private Plunge Pool, Panoramic Ocean View, King Bed, Jacuzzi, Butler Service'}
                </p>
              </div>
            </div>
          </div>

          {/* Linked Check-In & Check-Out History Logs */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Check-In & Check-Out Audit Logs
              </h3>
              <span className="text-xs font-mono text-[#C5A059] font-bold">
                {linkedCheckInLogs.length + linkedCheckOutLogs.length} History Events
              </span>
            </div>

            {linkedCheckInLogs.length === 0 && linkedCheckOutLogs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center p-4 bg-slate-50 rounded-xl">
                No formal check-in or check-out activity logged for this reservation yet.
              </p>
            ) : (
              <div className="space-y-2 text-xs">
                {linkedCheckInLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-emerald-700 block">Check-In Event ({log.id})</span>
                      <strong className="text-[#1E2B37]">{log.notes}</strong>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 shrink-0 ml-2">{log.checkInTime}</span>
                  </div>
                ))}
                {linkedCheckOutLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-blue-700 block">Check-Out Event ({log.id})</span>
                      <strong className="text-[#1E2B37]">{log.notes}</strong>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 shrink-0 ml-2">{log.checkOutTime}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Folio Financial Invoice (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37] pb-2 border-b border-slate-100">
            Folio Financial Statement & Invoice
          </h3>

          {/* Stay Timeline */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Check-In Schedule:</span>
              <span className="font-mono font-bold text-[#1E2B37]">{res.checkIn} (3:00 PM Onwards)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Check-Out Schedule:</span>
              <span className="font-mono font-bold text-[#1E2B37]">{res.checkOut} (Before 11:00 AM)</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Stay Duration:</span>
              <span className="font-mono font-bold text-[#C5A059]">{res.nights} Nights ({res.guests})</span>
            </div>
          </div>

          {/* Itemized Folio Billing */}
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Suite Daily Rate x {res.nights} Nights:</span>
              <span className="font-mono font-semibold">${res.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Resort Facilities Fee (Included):</span>
              <span className="font-mono font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Local Occupancy Taxes (Included):</span>
              <span className="font-mono font-semibold">$0.00</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-[#1E2B37]">
              <span>Total Folio Amount:</span>
              <span className="font-mono text-emerald-600 text-lg">${res.totalAmount} USD</span>
            </div>
          </div>

          {/* Actions */}
          {res.status !== 'Cancelled' && (
            <button
              onClick={handleCancel}
              className="w-full py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-all cursor-pointer flex items-center justify-center space-x-1"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Reservation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
