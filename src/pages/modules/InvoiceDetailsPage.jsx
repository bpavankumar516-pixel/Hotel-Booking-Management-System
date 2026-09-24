import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Mail,
  Building2,
  Calendar,
  User,
  CreditCard,
  CheckCircle2,
  FileText,
  Key,
  ShieldCheck,
  QrCode,
  Sparkles,
  DollarSign,
  Share2,
  Clock,
  BedDouble,
  Award,
  Check,
} from 'lucide-react';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';

export const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reservations = [], guests = [], updatePaymentStatus } = useHotel();

  // Find targeted reservation or invoice
  const matchingIndex = reservations.findIndex(
    (r, idx) => r.id === id || `INV-902${idx + 1}` === id
  );

  const reservation = matchingIndex !== -1 ? reservations[matchingIndex] : reservations[0];
  const invoiceId = id || `INV-902${matchingIndex !== -1 ? matchingIndex + 1 : 1}`;

  const matchedGuest = guests.find(
    (g) => g.fullName?.toLowerCase()?.trim() === reservation?.guestName?.toLowerCase()?.trim()
  );

  const methods = ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash'];
  const paymentMethod = methods[matchingIndex % methods.length] || 'Credit Card';

  const [currentStatus, setCurrentStatus] = useState(reservation?.paymentStatus || 'Paid');

  if (!reservation) {
    return (
      <div className="max-w-[1200px] mx-auto p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1E2B37]">Invoice Record Not Found</h2>
        <p className="text-slate-500 text-sm">The invoice folio record you requested does not exist.</p>
        <button
          onClick={() => navigate('/payments')}
          className="px-5 py-2.5 bg-[#C5A059] text-white font-bold rounded-xl text-xs hover:bg-[#b08d48] cursor-pointer shadow-sm"
        >
          Return to Payments Directory
        </button>
      </div>
    );
  }

  const totalAmount = Number(reservation.totalAmount) || 500;
  const nightsCount = reservation.nights || 3;
  const roomRate = totalAmount / nightsCount;
  const keyCardCode = `KC-${(reservation.roomNumber || '101').replace(/[^0-9]/g, '') || '101'}-A`;

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    updatePaymentStatus(reservation.id, newStatus);
    toast.success(`Invoice ${invoiceId} status updated to "${newStatus}".`);
  };

  const handlePrint = () => {
    window.print();
    toast.success('Triggered system print dialog.');
  };

  const handleSendEmail = () => {
    toast.success(`Invoice emailed to ${reservation.guestEmail || matchedGuest?.email || 'guest@horizon.com'}!`);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info('Invoice URL copied to clipboard.');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Printable CSS Rules (Ensures clean paper output on window.print()) */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden, aside, header, nav, button {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .invoice-sheet {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Top Header & Navigation Bar (Hidden on print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/payments')}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer shadow-2xs"
            title="Back to Payments"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase border ${
                  currentStatus === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : currentStatus === 'Pending'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                {currentStatus}
              </span>
              <span className="text-xs font-mono text-[#C5A059] font-bold">{invoiceId}</span>
            </div>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37] mt-0.5">
              Guest Invoice Folio Details & Print Management
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShareLink}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E2B37] text-xs font-bold border border-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handleSendEmail}
            className="py-2.5 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#1E2B37] font-bold text-xs inline-flex items-center space-x-1.5 cursor-pointer shadow-2xs"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Email</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* 12-COLUMN ALIGNED GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Main Printable Invoice Sheet & Itemized Charges (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Invoice Card Sheet */}
          <div className="invoice-sheet bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
            {/* Watermark Stamp */}
            <div
              className={`absolute right-8 top-12 rotate-[-12deg] border-4 font-black text-3xl px-5 py-1.5 rounded-xl uppercase tracking-widest pointer-events-none select-none ${
                currentStatus === 'Paid'
                  ? 'border-emerald-500/30 text-emerald-600/40'
                  : currentStatus === 'Pending'
                  ? 'border-amber-500/30 text-amber-600/40'
                  : 'border-rose-500/30 text-rose-600/40'
              }`}
            >
              {currentStatus === 'Paid' ? 'PAID IN FULL' : currentStatus === 'Pending' ? 'PAYMENT PENDING' : 'REFUNDED'}
            </div>

            {/* Letterhead Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-5 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-2 rounded-xl bg-[#1E2B37] text-[#C5A059]">
                    <Building2 className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-['Poppins'] font-black text-xl text-[#1E2B37]">
                      Grand Horizon Resort & Spa
                    </h3>
                    <p className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase">
                      Luxury Hospitality & Oceanfront Suites
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">100 Oceanfront Drive, Paradise Beach, CA 90210</p>
                <p className="text-[11px] text-slate-500">Tel: +1 (800) 555-HORIZON | Tax ID: US-9941820-HORIZON</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-right min-w-[180px]">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Invoice Folio</span>
                <p className="font-mono font-black text-lg text-[#C5A059]">{invoiceId}</p>
                <p className="text-[11px] text-slate-600 mt-1">Date: {reservation.checkIn}</p>
              </div>
            </div>

            {/* Billed Guest & Suite Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                  Billed Guest Profile
                </span>
                <p className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37]">{reservation.guestName}</p>
                <p className="text-slate-500">{reservation.guestEmail || matchedGuest?.email}</p>
                <p className="text-slate-500">{reservation.guestPhone || matchedGuest?.mobile}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                  Resort Stay Details
                </span>
                <p className="font-bold text-[#1E2B37]">Room {reservation.roomNumber}</p>
                <p className="text-slate-500">{reservation.roomType}</p>
                <p className="text-slate-500 font-mono text-[11px]">
                  {reservation.checkIn} → {reservation.checkOut} ({nightsCount} Nights)
                </p>
              </div>
            </div>

            {/* Itemized Billing Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1E2B37] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-3 text-center">Nightly Rate</th>
                    <th className="py-2.5 px-3 text-center">Nights</th>
                    <th className="py-2.5 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 px-3">
                      <p className="font-bold text-[#1E2B37]">{reservation.roomType} Accommodation ({reservation.roomNumber})</p>
                      <p className="text-[10px] text-slate-500">Balcony view, Jacuzzi bath & 24/7 Butler Service</p>
                    </td>
                    <td className="py-3 px-3 text-center font-mono">${roomRate.toFixed(2)}</td>
                    <td className="py-3 px-3 text-center font-mono">{nightsCount}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#1E2B37]">${totalAmount.toFixed(2)}</td>
                  </tr>

                  <tr className="bg-slate-50/60">
                    <td className="py-2.5 px-3 text-slate-600">High-Speed Fiber WiFi & Resort Amenities</td>
                    <td className="py-2.5 px-3 text-center font-mono text-emerald-600 font-bold">COMPLIMENTARY</td>
                    <td className="py-2.5 px-3 text-center font-mono">{nightsCount}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-400">$0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Calculation Row */}
            <div className="flex justify-end pt-1">
              <div className="w-64 space-y-1.5 text-right text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-slate-700">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Taxes & Fees (0% Included):</span>
                  <span className="font-mono font-bold text-slate-700">$0.00</span>
                </div>
                <div className="border-t border-slate-300 pt-2 flex justify-between font-extrabold text-base text-[#1E2B37]">
                  <span>Total Amount Paid:</span>
                  <span className="font-mono text-[#C5A059]">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* QR Code & Digital Verification */}
            <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-[#1E2B37]">
                  <QrCode className="w-7 h-7" />
                </div>
                <div className="text-[11px]">
                  <p className="font-bold text-[#1E2B37]">Digital Authentication Code</p>
                  <p className="text-slate-500 font-mono text-[10px]">SCAN-AUTH-{invoiceId}-{reservation.id}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ✓ Verified PMS Receipt
              </span>
            </div>

            {/* Signatures */}
            <div className="border-t border-slate-200 pt-6 grid grid-cols-2 gap-6 text-center text-xs">
              <div>
                <div className="border-b border-slate-300 pb-6 font-serif italic text-slate-400">
                  {reservation.guestName}
                </div>
                <p className="font-bold text-slate-700 mt-1">Guest Signature</p>
              </div>

              <div>
                <div className="border-b border-slate-300 pb-6 font-serif italic text-slate-600 font-bold">
                  Madison Alley (Manager)
                </div>
                <p className="font-bold text-slate-700 mt-1">Authorized Duty Officer Signature</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Metric Cards & Quick Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          {/* Quick Financial Folio Card */}
          <div className="bg-[#1E2B37] text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Total Folio Amount
                </span>
                <h3 className="font-['Poppins'] text-3xl font-black text-[#C5A059] mt-0.5">
                  ${totalAmount.toFixed(2)}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-[#2B3A4A] text-[#C5A059]">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Payment Method:</span>
                <span className="font-bold text-white">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Issued Keycard Code:</span>
                <span className="font-mono font-bold text-[#C5A059]">{keyCardCode}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Nightly Average:</span>
                <span className="font-mono text-emerald-400 font-bold">${roomRate.toFixed(2)} / night</span>
              </div>
            </div>

            {/* Quick Status Setter Buttons */}
            <div className="pt-2 border-t border-slate-700/60 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                Update Payment Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange('Paid')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    currentStatus === 'Paid'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-[#2B3A4A] text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  PAID
                </button>
                <button
                  onClick={() => handleStatusChange('Pending')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    currentStatus === 'Pending'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-[#2B3A4A] text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  PENDING
                </button>
                <button
                  onClick={() => handleStatusChange('Refunded')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    currentStatus === 'Refunded'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-[#2B3A4A] text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  REFUNDED
                </button>
              </div>
            </div>
          </div>

          {/* Billed Guest Profile Specs Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">Guest Information</h3>
                <p className="text-xs text-slate-400">Primary guest profile associated with invoice</p>
              </div>
              <User className="w-5 h-5 text-[#C5A059]" />
            </div>

            <div className="flex items-center space-x-3.5">
              <img
                src={matchedGuest?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={reservation.guestName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div>
                <h4 className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37]">{reservation.guestName}</h4>
                <p className="text-xs text-slate-500">{reservation.guestEmail || matchedGuest?.email}</p>
                <p className="text-xs text-slate-500">{reservation.guestPhone || matchedGuest?.mobile}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Identification</span>
                <span className="font-mono font-bold text-[#1E2B37] text-[11px]">
                  {matchedGuest?.idProof || 'PASSPORT-902188'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Nationality</span>
                <span className="font-bold text-[#1E2B37] text-[11px]">
                  {matchedGuest?.nationality || 'United States'}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Room Specs Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">Assigned Room Specs</h3>
                <p className="text-xs text-slate-400">Inventory specification and layout</p>
              </div>
              <BedDouble className="w-5 h-5 text-[#C5A059]" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Room Number</span>
                <span className="font-mono font-black text-[#1E2B37] text-base mt-0.5 block">
                  {reservation.roomNumber}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Category</span>
                <span className="font-bold text-[#1E2B37] text-xs mt-0.5 block">{reservation.roomType}</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Digital Key Issued:</span>
              <span className="font-mono font-bold text-[#C5A059] bg-white px-2 py-0.5 rounded border border-amber-200">
                {keyCardCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
