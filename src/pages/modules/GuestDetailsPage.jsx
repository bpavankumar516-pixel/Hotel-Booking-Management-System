import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Globe,
  UserCheck,
  CalendarCheck,
  Edit,
  Trash2,
  Clock,
  Award,
  ShieldCheck,
  Building,
  Plus,
  Eye,
  CheckCircle2,
  DollarSign,
  Star,
} from 'lucide-react';

export const GuestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { guests, reservations, deleteGuest } = useHotel();

  // Find target guest by ID or Full Name
  const guest = guests.find(
    (g) => String(g.id) === String(id) || g.fullName.toLowerCase().trim() === String(id).toLowerCase().trim()
  );

  if (!guest) {
    return (
      <div className="max-w-[1200px] mx-auto p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1E2B37]">Guest Profile Not Found</h2>
        <p className="text-slate-500 text-sm">The guest record you requested does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/guests')}
          className="px-4 py-2 bg-[#C5A059] text-white font-bold rounded-lg text-xs hover:bg-[#b08d48] cursor-pointer"
        >
          Back to Guest Directory
        </button>
      </div>
    );
  }

  // Linked Stay History
  const guestReservations = reservations.filter(
    (r) =>
      r.guestName.toLowerCase().trim() === guest.fullName.toLowerCase().trim() ||
      (r.guestEmail && r.guestEmail.toLowerCase().trim() === guest.email.toLowerCase().trim())
  );

  const totalSpent = guestReservations
    .filter((r) => r.paymentStatus === 'Paid' || r.status === 'Completed' || r.status === 'Checked-In')
    .reduce((sum, r) => sum + Number(r.totalAmount || 0), 0);

  const handleDeleteGuest = () => {
    if (window.confirm(`Are you sure you want to delete ${guest.fullName}'s profile?`)) {
      deleteGuest(guest.id, guest.fullName);
      navigate('/guests');
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Navigation & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/guests')}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Back to Guest Directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
                Guest Profile Dossier
              </span>
              <span className="text-xs font-mono text-slate-400 font-bold">ID #{guest.id}</span>
            </div>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37] mt-0.5">
              {guest.fullName}'s Executive Dossier
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/reservations"
            className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Reservation for Guest</span>
          </Link>
          <button
            onClick={handleDeleteGuest}
            className="py-2.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Hero Guest Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5 text-center md:text-left">
          <img
            src={guest.avatar || 'https://dummyjson.com/icon/emilyj/128'}
            alt={guest.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#C5A059] shadow-md shrink-0"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{guest.fullName}</h3>
              <span
                className={`text-xs font-extrabold px-3 py-0.5 rounded-full uppercase ${
                  guest.status === 'Checked-In'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : guest.status === 'Active'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                {guest.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono flex items-center justify-center md:justify-start space-x-2">
              <span>{guest.email}</span>
              <span>•</span>
              <span>{guest.mobile}</span>
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-1 text-[#C5A059] text-xs pt-1">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-slate-600 font-bold ml-1 text-xs">VIP Gold Elite Member</span>
            </div>
          </div>
        </div>

        {/* Guest Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Total Stays</span>
            <span className="font-mono text-xl font-extrabold text-[#1E2B37]">{guestReservations.length}</span>
            <span className="text-[10px] text-slate-500 block">Booked Reservations</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Total Folio Spend</span>
            <span className="font-mono text-xl font-extrabold text-emerald-600">${totalSpent}</span>
            <span className="text-[10px] text-emerald-700 block">Verified Payments</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center col-span-2 sm:col-span-1">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Verification</span>
            <span className="font-bold text-blue-600 text-xs block mt-1">Verified Passport</span>
            <span className="text-[10px] text-slate-500 font-mono block">{guest.idProof}</span>
          </div>
        </div>
      </div>

      {/* Main Grid Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Identity & Contact Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37] pb-2 border-b border-slate-100">
              Identity & Contact Particulars
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Official Email</span>
                  <span className="font-mono font-bold text-[#1E2B37]">{guest.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Mobile Phone</span>
                  <span className="font-mono font-bold text-[#1E2B37]">{guest.mobile}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CreditCard className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">ID Proof Document</span>
                  <span className="font-mono font-bold text-[#1E2B37]">{guest.idProof}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Nationality & Country</span>
                  <span className="font-bold text-[#1E2B37]">{guest.nationality || 'United States'}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Residential Address</span>
                  <span className="font-medium text-slate-700 leading-relaxed">{guest.address || '626 Main Street, Phoenix, AZ'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Perks Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37] pb-2 border-b border-slate-100">
              Guest Preferences & Privileges
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-semibold text-slate-800">Priority Express Check-In Enabled</span>
              </div>
              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-semibold text-slate-800">Complimentary Executive Lounge Access</span>
              </div>
              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-semibold text-slate-800">Late Check-Out Privilege (Up to 2 PM)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Linked Reservations Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Guest Stay History & Folio Billing
              </h3>
              <p className="text-xs text-slate-400">Linked reservations for {guest.fullName}</p>
            </div>
            <span className="font-mono text-xs font-bold text-[#C5A059]">{guestReservations.length} Reservations</span>
          </div>

          {guestReservations.length === 0 ? (
            <div className="p-8 text-center space-y-2 bg-slate-50 rounded-xl border border-slate-200/80">
              <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">No reservation history recorded for this guest yet.</p>
              <Link
                to="/reservations"
                className="inline-block mt-2 px-3 py-1.5 bg-[#C5A059] text-white text-xs font-bold rounded-lg hover:bg-[#b08d48]"
              >
                Create First Reservation
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-2.5 px-3">Booking ID</th>
                    <th className="py-2.5 px-3">Reserved Room</th>
                    <th className="py-2.5 px-3">Stay Dates</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">View Folio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                  {guestReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#C5A059] text-[11px]">{res.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#1E2B37] block">{res.roomNumber}</span>
                        <span className="text-[10px] text-slate-400 block">{res.roomType}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                        {res.checkIn} → {res.checkOut}
                      </td>
                      <td className="py-3 px-3 font-mono font-extrabold text-emerald-600">${res.totalAmount}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
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
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => navigate(`/reservations/${res.id}`)}
                          className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                          title="View Full Reservation Folio"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
