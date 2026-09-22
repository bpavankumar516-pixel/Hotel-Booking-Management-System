import React from 'react';
import { useHotel } from '../../contexts/HotelContext';

export const BookingDetailsTable = () => {
  const { bookingDetailsList } = useHotel();

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
      <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Booking Details</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-[11px] font-bold text-slate-500">
              <th className="py-2.5 px-3">Booking Date</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Persons</th>
              <th className="py-2.5 px-3">Phone</th>
              <th className="py-2.5 px-3">Check-in</th>
              <th className="py-2.5 px-3">Check-out</th>
              <th className="py-2.5 px-3 text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
            {bookingDetailsList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-slate-600 font-mono text-[11px]">
                  {item.bookingDate}
                </td>
                <td className="py-3.5 px-3 font-semibold">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={item.avatar}
                      alt={item.customer}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <span className="font-['Poppins'] font-bold text-xs">{item.customer}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-slate-600 font-medium">{item.persons}</td>
                <td className="py-3.5 px-3 font-medium text-[#2563EB] font-mono text-[11px]">
                  {item.phone}
                </td>
                <td className="py-3.5 px-3 text-slate-600 font-medium text-[11px] leading-tight">
                  {item.checkIn}
                </td>
                <td className="py-3.5 px-3 text-slate-600 font-medium text-[11px] leading-tight">
                  {item.checkOut}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded text-[10px] font-extrabold text-white tracking-wider uppercase shadow-2xs ${
                      item.status === 'Received' ? 'bg-[#2ECC71]' : 'bg-[#E74C3C]'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
