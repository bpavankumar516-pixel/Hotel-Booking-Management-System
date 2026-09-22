import React, { useState } from 'react';
import { CalendarCheck, Plus, Check, AlertCircle, X } from 'lucide-react';
import { useHotel } from '../../contexts/HotelContext';

export const RoomBookingPage = () => {
  const { availableRoomsList, addBooking } = useHotel();

  const [bookingForm, setBookingForm] = useState({
    guestName: 'Mitchel Johnson',
    roomNumber: '# No.301',
    roomPrice: 29,
    checkInDate: '2026-09-25',
    checkOutDate: '2026-09-28',
  });

  const [existingBookings] = useState([
    { roomNumber: '# No.105', checkInDate: '2026-09-25', checkOutDate: '2026-09-28' },
  ]);

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [doubleBookingError, setDoubleBookingError] = useState('');

  // Auto Calculate Nights & Total Amount
  const calcNights = () => {
    const inDate = new Date(bookingForm.checkInDate);
    const outDate = new Date(bookingForm.checkOutDate);
    const diffTime = Math.abs(outDate - inDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return diffDays;
  };

  const nights = calcNights();
  const totalAmount = nights * bookingForm.roomPrice;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setDoubleBookingError('');

    // Double Booking Prevention Check
    const isConflict = existingBookings.some(
      (b) =>
        b.roomNumber === bookingForm.roomNumber &&
        b.checkInDate === bookingForm.checkInDate
    );

    if (isConflict) {
      setDoubleBookingError(
        `Room ${bookingForm.roomNumber} is already booked for ${bookingForm.checkInDate}. Please choose another room or date!`
      );
      return;
    }

    setShowSummaryModal(true);
  };

  const confirmBooking = () => {
    addBooking({
      id: `LG-B${Math.floor(10000 + Math.random() * 90000)}`,
      guest: bookingForm.guestName,
      room: bookingForm.roomNumber,
      checkIn: bookingForm.checkInDate,
      checkOut: bookingForm.checkOutDate,
      status: 'Confirmed',
      amount: `$${totalAmount}`,
    });
    setShowSummaryModal(false);
    alert('Booking Confirmed Successfully!');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
            Module 05
          </span>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Room Booking</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Reserve rooms, auto-calculate stay duration, prevent double bookings, and issue instant confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Booking Form Card (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37] pb-2 border-b border-slate-100">
            Create Reservation Form
          </h3>

          {doubleBookingError && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{doubleBookingError}</span>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
            {/* Guest Selection */}
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-semibold block">Select Guest</label>
              <select
                value={bookingForm.guestName}
                onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold"
              >
                <option value="Mitchel Johnson">Mitchel Johnson (+99 256 896 8855)</option>
                <option value="Robert Affleck">Robert Affleck (+81 569 854 8866)</option>
                <option value="Chris Hemsworth">Chris Hemsworth (+92 745 856 1144)</option>
                <option value="Sarah Wilson">Sarah Wilson (+1 408 923 1188)</option>
              </select>
            </div>

            {/* Room Selection */}
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-semibold block">Select Room</label>
              <select
                value={bookingForm.roomNumber}
                onChange={(e) => {
                  const selRoom = availableRoomsList.find((r) => r.number === e.target.value);
                  const priceNum = selRoom ? parseInt(selRoom.price.replace(/[^0-9]/g, '')) : 29;
                  setBookingForm({
                    ...bookingForm,
                    roomNumber: e.target.value,
                    roomPrice: priceNum,
                  });
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold"
              >
                {availableRoomsList.map((r) => (
                  <option key={r.id} value={r.number}>
                    {r.number} - {r.type} ({r.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In & Check-Out Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-semibold block">Check-In Date</label>
                <input
                  type="date"
                  required
                  value={bookingForm.checkInDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, checkInDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-semibold block">Check-Out Date</label>
                <input
                  type="date"
                  required
                  value={bookingForm.checkOutDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, checkOutDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] font-bold text-xs text-white shadow-xs transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Review Booking Summary</span>
            </button>
          </form>
        </div>

        {/* Live Calculation Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37] pb-2 border-b border-slate-100">
            Live Booking Calculation
          </h3>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Selected Guest:</span>
              <span className="font-bold text-[#1E2B37]">{bookingForm.guestName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Selected Room:</span>
              <span className="font-bold text-[#1E2B37]">{bookingForm.roomNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Price per Night:</span>
              <span className="font-bold text-[#1E2B37] font-mono">${bookingForm.roomPrice}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Stay Duration:</span>
              <span className="font-bold text-[#2563EB] font-mono">{nights} Nights</span>
            </div>
            <div className="flex justify-between py-2 text-sm font-extrabold text-[#1E2B37] bg-amber-50 p-3 rounded-lg border border-amber-200">
              <span>Total Estimated Amount:</span>
              <span className="text-[#C5A059] font-mono">${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Confirm Booking Summary
              </h3>
              <button onClick={() => setShowSummaryModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p><span className="font-bold text-[#1E2B37]">Guest:</span> {bookingForm.guestName}</p>
              <p><span className="font-bold text-[#1E2B37]">Room:</span> {bookingForm.roomNumber}</p>
              <p><span className="font-bold text-[#1E2B37]">Check-In:</span> {bookingForm.checkInDate}</p>
              <p><span className="font-bold text-[#1E2B37]">Check-Out:</span> {bookingForm.checkOutDate}</p>
              <p><span className="font-bold text-[#1E2B37]">Stay Duration:</span> {nights} Nights</p>
              <p><span className="font-bold text-[#1E2B37]">Total Amount:</span> ${totalAmount}</p>
            </div>

            <button
              onClick={confirmBooking}
              className="w-full py-3 rounded-lg bg-[#2ECC71] hover:bg-emerald-600 font-extrabold text-xs text-white shadow-md flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Lock Booking</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
