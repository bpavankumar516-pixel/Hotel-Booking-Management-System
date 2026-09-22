import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { BedDouble, ShoppingBag, DoorClosed, HelpCircle, CreditCard } from 'lucide-react';

export const StatCards = () => {
  const { metrics } = useHotel();

  const cards = [
    {
      id: 1,
      title: 'Available Rooms',
      value: String(metrics.availableRooms || 35).padStart(2, '0'),
      icon: BedDouble,
    },
    {
      id: 2,
      title: 'Today Checkout',
      value: String(metrics.todayCheckout || 8).padStart(2, '0'),
      icon: ShoppingBag,
    },
    {
      id: 3,
      title: 'Cancellations',
      value: String(metrics.cancellations || 12).padStart(2, '0'),
      icon: DoorClosed,
    },
    {
      id: 4,
      title: 'Enquiries',
      value: String(metrics.enquiries || 82).padStart(2, '0'),
      icon: HelpCircle,
    },
    {
      id: 5,
      title: 'Pending Payments',
      value: String(metrics.pendingPayments || 7).padStart(2, '0'),
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between overflow-hidden relative group hover:shadow-md transition-shadow"
          >
            {/* Upper Content */}
            <div className="p-4 flex items-start justify-between">
              <div className="p-2.5 rounded-lg bg-[#EFE6D5] text-[#9A7836]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-500 block leading-tight">{c.title}</span>
                <span className="font-['Poppins'] text-3xl font-extrabold text-[#1E2B37] block mt-1 tracking-tight">
                  {c.value}
                </span>
              </div>
            </div>

            {/* Bottom VIEW DETAILS Banner matching reference image */}
            <div className="bg-gradient-to-t from-[#F7F2E7] to-white border-t border-amber-100/60 px-4 py-2 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#8C6D2D] uppercase tracking-wider group-hover:underline cursor-pointer">
                VIEW DETAILS
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
