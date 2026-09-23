import React, { useState } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import { PlusCircle, UserPlus, BedDouble, LogIn, LogOut, CreditCard, X, Check } from 'lucide-react';

export const QuickActions = () => {
  const { openModal, closeModal, activeModal, addBooking, addGuest, addRoom } = useHotel();

  const [bookingForm, setBookingForm] = useState({ guest: '', room: 'Deluxe 101', checkIn: 'June 19, 2024', amount: '$535.50' });
  const [guestForm, setGuestForm] = useState({ name: '', email: '', phone: '' });
  const [roomForm, setRoomForm] = useState({ roomNumber: '', type: 'Deluxe', price: '$150' });

  const actions = [
    {
      id: 'booking',
      label: 'New Booking',
      icon: PlusCircle,
      badgeColor: 'bg-[#C5A059] text-white',
      hoverBorder: 'hover:border-[#C5A059] hover:bg-[#F7F2E7]',
    },
    {
      id: 'guest',
      label: 'Add Guest',
      icon: UserPlus,
      badgeColor: 'bg-[#1E2B37] text-white',
      hoverBorder: 'hover:border-[#1E2B37] hover:bg-slate-50',
    },
    {
      id: 'room',
      label: 'Add Room',
      icon: BedDouble,
      badgeColor: 'bg-[#2563EB] text-white',
      hoverBorder: 'hover:border-[#2563EB] hover:bg-blue-50',
    },
    {
      id: 'checkin',
      label: 'Check-In',
      icon: LogIn,
      badgeColor: 'bg-emerald-600 text-white',
      hoverBorder: 'hover:border-emerald-600 hover:bg-emerald-50',
    },
    {
      id: 'checkout',
      label: 'Check-Out',
      icon: LogOut,
      badgeColor: 'bg-rose-500 text-white',
      hoverBorder: 'hover:border-rose-500 hover:bg-rose-50',
    },
    {
      id: 'payment',
      label: 'Add Payment',
      icon: CreditCard,
      badgeColor: 'bg-slate-800 text-white',
      hoverBorder: 'hover:border-slate-800 hover:bg-slate-100',
    },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.guest) return;
    addBooking({
      id: `GH-B${Math.floor(10000 + Math.random() * 90000)}`,
      guest: bookingForm.guest,
      room: bookingForm.room,
      checkIn: bookingForm.checkIn,
      status: 'Confirmed',
      amount: bookingForm.amount,
    });
    toast.success(`New reservation created for ${bookingForm.guest}!`);
    closeModal();
    setBookingForm({ guest: '', room: 'Deluxe 101', checkIn: 'June 19, 2024', amount: '$535.50' });
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    addGuest();
    toast.success(`Guest profile added successfully!`);
    closeModal();
    setGuestForm({ name: '', email: '', phone: '' });
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    addRoom();
    toast.success(`New room inventory added!`);
    closeModal();
    setRoomForm({ roomNumber: '', type: 'Deluxe', price: '$150' });
  };

  return (
    <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs space-y-4 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Quick Actions</h3>
          <p className="text-[10px] text-slate-400 font-medium">Instant operational triggers</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F7F2E7] text-[#C5A059] border border-amber-200 font-mono">
          6 Actions
        </span>
      </div>

      {/* Grid of Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 my-auto">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => openModal(act.id)}
              className={`py-2.5 px-3 rounded-lg border border-slate-200/80 bg-slate-50/70 flex items-center space-x-2.5 text-left cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-2xs active:scale-[0.98] ${act.hoverBorder}`}
            >
              <div className={`p-1.5 rounded-md shrink-0 shadow-2xs ${act.badgeColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] truncate">{act.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                {activeModal === 'booking' && 'Create New Reservation'}
                {activeModal === 'guest' && 'Add New Guest Profile'}
                {activeModal === 'room' && 'Add New Room'}
                {activeModal === 'checkin' && 'Guest Check-In Workflow'}
                {activeModal === 'checkout' && 'Guest Check-Out Workflow'}
                {activeModal === 'payment' && 'Record Guest Payment'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 text-slate-400 hover:text-[#1E2B37] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Forms */}
            {activeModal === 'booking' && (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-semibold">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.guest}
                    onChange={(e) => setBookingForm({ ...bookingForm, guest: e.target.value })}
                    placeholder="Angus Copper"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Room</label>
                    <input
                      type="text"
                      value={bookingForm.room}
                      onChange={(e) => setBookingForm({ ...bookingForm, room: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Total Price</label>
                    <input
                      type="text"
                      value={bookingForm.amount}
                      onChange={(e) => setBookingForm({ ...bookingForm, amount: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-mono focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] font-bold text-xs text-white shadow-xs cursor-pointer active:scale-[0.99] transition-all"
                >
                  Save Reservation
                </button>
              </form>
            )}

            {activeModal === 'guest' && (
              <form onSubmit={handleGuestSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-semibold">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={guestForm.name}
                    onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                    placeholder="Angus Copper"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-semibold">Email</label>
                  <input
                    type="email"
                    required
                    value={guestForm.email}
                    onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                    placeholder="angus@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1E2B37] hover:bg-slate-800 font-bold text-xs text-white shadow-xs cursor-pointer active:scale-[0.99] transition-all"
                >
                  Save Guest
                </button>
              </form>
            )}

            {activeModal === 'room' && (
              <form onSubmit={handleRoomSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Room Number</label>
                    <input
                      type="text"
                      required
                      value={roomForm.roomNumber}
                      onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                      placeholder="e.g. Deluxe 204"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-mono focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold">Price / Night</label>
                    <input
                      type="text"
                      value={roomForm.price}
                      onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-mono focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 font-bold text-xs text-white shadow-xs cursor-pointer active:scale-[0.99] transition-all"
                >
                  Save Room
                </button>
              </form>
            )}

            {(activeModal === 'checkin' || activeModal === 'checkout' || activeModal === 'payment') && (
              <div className="space-y-4 text-center py-4">
                <div className="p-3 bg-[#C5A059] text-white rounded-full w-12 h-12 mx-auto flex items-center justify-center shadow-xs">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-600">
                  Grand Horizon PMS operation completed successfully!
                </p>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 rounded-lg bg-[#1E2B37] hover:bg-slate-800 font-bold text-xs text-white cursor-pointer active:scale-[0.99] transition-all"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
