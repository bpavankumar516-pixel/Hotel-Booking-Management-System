import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Eye } from 'lucide-react';

export const BookingDetailsTable = () => {
  const { reservations, guests, rooms } = useHotel();
  const navigate = useNavigate();
  const recentList = (reservations || []).slice(0, 6);

  // Resolver for guest profile
  const getGuestInfo = (guestName, guestEmail) => {
    if (!guests) return null;
    return guests.find(
      (g) =>
        g.fullName?.toLowerCase()?.trim() === guestName?.toLowerCase()?.trim() ||
        (guestEmail && g.email?.toLowerCase()?.trim() === guestEmail?.toLowerCase()?.trim())
    );
  };

  // Resolver for room profile
  const getRoomInfo = (roomNumber) => {
    if (!rooms) return null;
    return rooms.find((r) => r.number?.toLowerCase()?.trim() === roomNumber?.toLowerCase()?.trim());
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Recent Reservations</h3>
          <p className="text-[10px] text-slate-400 font-medium">Live guest booking activity</p>
        </div>
        <Link
          to="/reservations"
          className="text-[10px] font-bold text-[#C5A059] hover:underline flex items-center space-x-0.5"
        >
          <span>View All Reservations</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase">
              <th className="py-2.5 px-3">Booking ID</th>
              <th className="py-2.5 px-3">Guest Name & Email</th>
              <th className="py-2.5 px-3">Reserved Room</th>
              <th className="py-2.5 px-3">Check-In / Out</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
            {recentList.map((item) => {
              const guestProfile = getGuestInfo(item.guestName, item.guestEmail);
              const roomProfile = getRoomInfo(item.roomNumber);
              const avatar =
                guestProfile?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => navigate(`/reservations/${item.id}`)}
                      className="font-mono text-[11px] text-[#C5A059] font-bold hover:underline text-left cursor-pointer"
                    >
                      {item.id}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 font-semibold">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={avatar}
                        alt={item.guestName}
                        onClick={() => guestProfile && navigate(`/guests/${guestProfile.id}`)}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs cursor-pointer hover:border-[#C5A059]"
                      />
                      <div>
                        <button
                          onClick={() => guestProfile ? navigate(`/guests/${guestProfile.id}`) : navigate(`/reservations/${item.id}`)}
                          className="font-['Poppins'] font-bold text-xs text-[#1E2B37] hover:text-[#C5A059] hover:underline block text-left cursor-pointer"
                        >
                          {item.guestName}
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {item.guestEmail || item.guestPhone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">
                    <button
                      onClick={() => roomProfile ? navigate(`/rooms/${roomProfile.id}`) : navigate(`/reservations/${item.id}`)}
                      className="hover:underline text-left cursor-pointer"
                    >
                      <span className="font-bold text-[#1E2B37]">{item.roomNumber}</span> ({item.roomType})
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium text-[11px] font-mono">
                    {item.checkIn} → {item.checkOut}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-extrabold text-emerald-600">
                    ${item.totalAmount}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                        item.status === 'Confirmed'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'Checked-In'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => navigate(`/reservations/${item.id}`)}
                      title="View Reservation Folio Details"
                      className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

